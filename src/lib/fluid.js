/*
 * Cursor-driven fluid smoke background (WebGL2).
 * Based on the classic Navier-Stokes WebGL fluid technique (MIT licensed, Pavel Dobryakov).
 * Usage: const stop = initFluid(canvas, { colors: ["#c7a34d", "#e6c77a"] });  stop() to clean up.
 */
export function initFluid(canvas, options = {}) {
  const cfg = {
    SIM_RES: 128,
    DYE_RES: 960,
    DENSITY_DISSIPATION: 1.4,   // higher = smoke fades faster
    VELOCITY_DISSIPATION: 0.9,
    PRESSURE: 0.8,
    PRESSURE_ITER: 18,
    CURL: 28,                   // swirliness
    SPLAT_RADIUS: 0.24,
    SPLAT_FORCE: 5500,
    INTENSITY: 0.32,            // dye strength per movement
    colors: ["#c7a34d", "#e6c77a", "#8f6b2a"],
    ...options,
  };

  if (typeof window === "undefined") return () => {};
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) return () => {};

  const hex = (h) => {
    const n = parseInt(h.replace("#", ""), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };
  const palette = cfg.colors.map(hex);

  // ---------- shaders ----------
  const VERT = `#version 300 es
  precision highp float;
  in vec2 aPosition;
  out vec2 vUv, vL, vR, vT, vB;
  uniform vec2 texelSize;
  void main(){
    vUv = aPosition*0.5+0.5;
    vL = vUv - vec2(texelSize.x,0.); vR = vUv + vec2(texelSize.x,0.);
    vT = vUv + vec2(0.,texelSize.y); vB = vUv - vec2(0.,texelSize.y);
    gl_Position = vec4(aPosition,0.,1.);
  }`;
  const HEAD = `#version 300 es
  precision highp float; precision highp sampler2D;
  in vec2 vUv, vL, vR, vT, vB;
  out vec4 o;`;

  const FRAG = {
    clear: `${HEAD} uniform sampler2D uTexture; uniform float value;
      void main(){ o = value*texture(uTexture,vUv); }`,
    splat: `${HEAD} uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
      void main(){ vec2 p=vUv-point; p.x*=aspectRatio;
        vec3 s=exp(-dot(p,p)/radius)*color; o=vec4(texture(uTarget,vUv).xyz+s,1.); }`,
    advection: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
      void main(){ vec2 c=vUv-dt*texture(uVelocity,vUv).xy*texelSize; o=texture(uSource,c)/(1.+dissipation*dt); }`,
    divergence: `${HEAD} uniform sampler2D uVelocity;
      void main(){ float L=texture(uVelocity,vL).x,R=texture(uVelocity,vR).x,T=texture(uVelocity,vT).y,B=texture(uVelocity,vB).y;
        vec2 C=texture(uVelocity,vUv).xy;
        if(vL.x<0.)L=-C.x; if(vR.x>1.)R=-C.x; if(vT.y>1.)T=-C.y; if(vB.y<0.)B=-C.y;
        o=vec4(0.5*(R-L+T-B),0.,0.,1.); }`,
    curl: `${HEAD} uniform sampler2D uVelocity;
      void main(){ float L=texture(uVelocity,vL).y,R=texture(uVelocity,vR).y,T=texture(uVelocity,vT).x,B=texture(uVelocity,vB).x;
        o=vec4(0.5*(R-L-T+B),0.,0.,1.); }`,
    vorticity: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main(){ float L=texture(uCurl,vL).x,R=texture(uCurl,vR).x,T=texture(uCurl,vT).x,B=texture(uCurl,vB).x,C=texture(uCurl,vUv).x;
        vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); f/=length(f)+0.0001; f*=curl*C; f.y*=-1.;
        vec2 v=texture(uVelocity,vUv).xy+f*dt; o=vec4(clamp(v,-1000.,1000.),0.,1.); }`,
    pressure: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main(){ float L=texture(uPressure,vL).x,R=texture(uPressure,vR).x,T=texture(uPressure,vT).x,B=texture(uPressure,vB).x;
        float d=texture(uDivergence,vUv).x; o=vec4((L+R+B+T-d)*0.25,0.,0.,1.); }`,
    gradient: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main(){ float L=texture(uPressure,vL).x,R=texture(uPressure,vR).x,T=texture(uPressure,vT).x,B=texture(uPressure,vB).x;
        vec2 v=texture(uVelocity,vUv).xy-vec2(R-L,T-B); o=vec4(v,0.,1.); }`,
    display: `${HEAD} uniform sampler2D uTexture;
      void main(){ vec3 c=texture(uTexture,vUv).rgb; c=1.-exp(-c*1.6); c=pow(c,vec3(0.92));
        float a=clamp(max(c.r,max(c.g,c.b)),0.,1.); o=vec4(c,a); }`,
  };

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const makeProgram = (frag) => {
    const p = gl.createProgram();
    gl.attachShader(p, vs); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag));
    gl.bindAttribLocation(p, 0, "aPosition");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p));
    const u = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
    return { p, u };
  };
  const P = {};
  Object.keys(FRAG).forEach((k) => (P[k] = makeProgram(FRAG[k])));

  // full-screen quad
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const blit = (target) => {
    if (target) { gl.viewport(0, 0, target.w, target.h); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
    else { gl.viewport(0, 0, canvas.width, canvas.height); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  // ---------- framebuffers ----------
  const FMT = {
    rgba: [gl.RGBA16F, gl.RGBA],
    rg: [gl.RG16F, gl.RG],
    r: [gl.R16F, gl.RED],
  };
  const createFBO = (w, h, fmt) => {
    const [internal, format] = FMT[fmt];
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    return { tex, fbo, w, h, tx: 1 / w, ty: 1 / h, bind(unit) { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); return unit; } };
  };
  const createDouble = (w, h, fmt) => {
    let a = createFBO(w, h, fmt), b = createFBO(w, h, fmt);
    return { w, h, tx: a.tx, ty: a.ty, get read() { return a; }, get write() { return b; }, swap() { [a, b] = [b, a]; } };
  };
  const getRes = (res) => {
    let ar = canvas.width / canvas.height; if (ar < 1) ar = 1 / ar;
    const min = Math.round(res), max = Math.round(res * ar);
    return canvas.width > canvas.height ? { w: max, h: min } : { w: min, h: max };
  };

  let velocity, dye, divergence, curl, pressure;
  const initBuffers = () => {
    const s = getRes(cfg.SIM_RES), d = getRes(cfg.DYE_RES);
    velocity = createDouble(s.w, s.h, "rg");
    dye = createDouble(d.w, d.h, "rgba");
    divergence = createFBO(s.w, s.h, "r");
    curl = createFBO(s.w, s.h, "r");
    pressure = createDouble(s.w, s.h, "r");
  };
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; initBuffers(); }
  };
  resize();

  const bindProgram = (prog) => { gl.useProgram(prog.p); return prog.u; };

  // ---------- splat ----------
  const splat = (x, y, dx, dy, color) => {
    const ar = canvas.width / canvas.height;
    let r = cfg.SPLAT_RADIUS / 100; if (ar > 1) r *= ar;
    let u = bindProgram(P.splat);
    gl.uniform1i(u.uTarget, velocity.read.bind(0));
    gl.uniform1f(u.aspectRatio, ar); gl.uniform2f(u.point, x, y); gl.uniform3f(u.color, dx, dy, 0); gl.uniform1f(u.radius, r);
    blit(velocity.write); velocity.swap();
    gl.uniform1i(u.uTarget, dye.read.bind(0)); gl.uniform3f(u.color, color[0], color[1], color[2]);
    blit(dye.write); dye.swap();
  };

  const pick = () => {
    const a = palette[(Math.random() * palette.length) | 0];
    const k = cfg.INTENSITY * (0.7 + Math.random() * 0.6);
    return [a[0] * k, a[1] * k, a[2] * k];
  };

  // ---------- simulation step ----------
  const step = (dt) => {
    gl.disable(gl.BLEND);
    let u = bindProgram(P.curl);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uVelocity, velocity.read.bind(0)); blit(curl);

    u = bindProgram(P.vorticity);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uVelocity, velocity.read.bind(0)); gl.uniform1i(u.uCurl, curl.bind(1));
    gl.uniform1f(u.curl, cfg.CURL); gl.uniform1f(u.dt, dt); blit(velocity.write); velocity.swap();

    u = bindProgram(P.divergence);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uVelocity, velocity.read.bind(0)); blit(divergence);

    u = bindProgram(P.clear);
    gl.uniform1i(u.uTexture, pressure.read.bind(0)); gl.uniform1f(u.value, cfg.PRESSURE); blit(pressure.write); pressure.swap();

    u = bindProgram(P.pressure);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uDivergence, divergence.bind(0));
    for (let i = 0; i < cfg.PRESSURE_ITER; i++) { gl.uniform1i(u.uPressure, pressure.read.bind(1)); blit(pressure.write); pressure.swap(); }

    u = bindProgram(P.gradient);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uPressure, pressure.read.bind(0)); gl.uniform1i(u.uVelocity, velocity.read.bind(1));
    blit(velocity.write); velocity.swap();

    u = bindProgram(P.advection);
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty); gl.uniform1i(u.uVelocity, velocity.read.bind(0)); gl.uniform1i(u.uSource, velocity.read.bind(0));
    gl.uniform1f(u.dt, dt); gl.uniform1f(u.dissipation, cfg.VELOCITY_DISSIPATION); blit(velocity.write); velocity.swap();

    gl.uniform2f(u.texelSize, dye.tx, dye.ty); gl.uniform1i(u.uVelocity, velocity.read.bind(0)); gl.uniform1i(u.uSource, dye.read.bind(1));
    gl.uniform1f(u.dissipation, cfg.DENSITY_DISSIPATION); blit(dye.write); dye.swap();
  };

  const render = () => {
    gl.clearColor(0, 0, 0, 0);
    const u = bindProgram(P.display);
    gl.uniform2f(u.texelSize, 1 / canvas.width, 1 / canvas.height);
    gl.uniform1i(u.uTexture, dye.read.bind(0));
    blit(null);
  };

  // ---------- input ----------
  const ptr = { x: 0, y: 0, px: 0, py: 0, moved: false, has: false };
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { ptr.has = false; return; }
    const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
    if (!ptr.has) { ptr.px = x; ptr.py = y; ptr.has = true; }
    else { ptr.px = ptr.x; ptr.py = ptr.y; }
    ptr.x = x; ptr.y = y; ptr.moved = true;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // a few soft splats on load so the effect is visible right away
  for (let i = 0; i < 4; i++) {
    splat(0.2 + Math.random() * 0.6, 0.25 + Math.random() * 0.5, (Math.random() - 0.5) * 900, (Math.random() - 0.5) * 900, pick());
  }

  // ---------- loop ----------
  let raf = 0, last = performance.now(), visible = true;
  const io = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 }) : null;
  io && io.observe(canvas);

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.0167); last = now;
    resize();
    if (ptr.moved) {
      ptr.moved = false;
      const ar = canvas.width / canvas.height;
      let dx = (ptr.x - ptr.px), dy = (ptr.y - ptr.py);
      if (ar < 1) dx *= ar; else dy /= ar;
      if (Math.abs(dx) + Math.abs(dy) > 0) splat(ptr.x, ptr.y, dx * cfg.SPLAT_FORCE, dy * cfg.SPLAT_FORCE, pick());
    }
    step(dt);
    render();
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    io && io.disconnect();
    const ext = gl.getExtension("WEBGL_lose_context");
    ext && ext.loseContext();
  };
}
