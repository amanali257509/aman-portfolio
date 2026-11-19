/*
 * Cursor-driven fluid smoke background (WebGL2).
 * Based on Navier-Stokes WebGL fluid simulation technique.
 * Usage: const stop = initFluid(canvas, { colors: ["#c7a34d", "#e6c77a", "#8f6b2a"] }); stop() to clean up.
 */
export function initFluid(canvas, options = {}) {
  const cfg = {
    SIM_RES: 128,
    DYE_RES: 960,
    DENSITY_DISSIPATION: 0.92, // smoke lingers gracefully before fading
    VELOCITY_DISSIPATION: 0.95,
    PRESSURE: 0.8,
    PRESSURE_ITER: 20,
    CURL: 30, // swirliness
    SPLAT_RADIUS: 0.4, // soft, billowing smoke size
    SPLAT_FORCE: 6000,
    INTENSITY: 0.85, // vivid gold dye visibility on dark background
    colors: ['#c7a34d', '#e6c77a', '#d4af37', '#8f6b2a'],
    ...options,
  }

  if (typeof window === 'undefined') return () => { }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => { }
  }

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
  })
  if (!gl) return () => { }

  // Ensure color buffer float extension is available
  gl.getExtension('EXT_color_buffer_float')
  gl.getExtension('OES_texture_float_linear')

  const hex = (h) => {
    const n = parseInt(h.replace('#', ''), 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }
  const palette = cfg.colors.map(hex)

  // ---------- Shaders ----------
  const VERT = `#version 300 es
  precision highp float;
  in vec2 aPosition;
  out vec2 vUv, vL, vR, vT, vB;
  uniform vec2 texelSize;
  void main(){
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }`

  const HEAD = `#version 300 es
  precision highp float;
  precision highp sampler2D;
  in vec2 vUv, vL, vR, vT, vB;
  out vec4 o;`

  const FRAG = {
    clear: `${HEAD} uniform sampler2D uTexture; uniform float value;
      void main(){ o = value * texture(uTexture, vUv); }`,
    splat: `${HEAD} uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
      void main(){
        vec2 p = vUv - point;
        p.x *= aspectRatio;
        vec3 s = exp(-dot(p, p) / radius) * color;
        o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
      }`,
    advection: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
      void main(){
        vec2 c = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
        o = texture(uSource, c) / (1.0 + dissipation * dt);
      }`,
    divergence: `${HEAD} uniform sampler2D uVelocity;
      void main(){
        float L = texture(uVelocity, vL).x;
        float R = texture(uVelocity, vR).x;
        float T = texture(uVelocity, vT).y;
        float B = texture(uVelocity, vB).y;
        vec2 C = texture(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x;
        if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y;
        if (vB.y < 0.0) B = -C.y;
        o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
      }`,
    curl: `${HEAD} uniform sampler2D uVelocity;
      void main(){
        float L = texture(uVelocity, vL).y;
        float R = texture(uVelocity, vR).y;
        float T = texture(uVelocity, vT).x;
        float B = texture(uVelocity, vB).x;
        o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
      }`,
    vorticity: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main(){
        float L = texture(uCurl, vL).x;
        float R = texture(uCurl, vR).x;
        float T = texture(uCurl, vT).x;
        float B = texture(uCurl, vB).x;
        float C = texture(uCurl, vUv).x;
        vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        f /= length(f) + 0.0001;
        f *= curl * C;
        f.y *= -1.0;
        vec2 v = texture(uVelocity, vUv).xy + f * dt;
        o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
      }`,
    pressure: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main(){
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        float d = texture(uDivergence, vUv).x;
        o = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
      }`,
    gradient: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main(){
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
        o = vec4(v, 0.0, 1.0);
      }`,
    display: `${HEAD} uniform sampler2D uTexture;
      void main(){
        vec3 c = texture(uTexture, vUv).rgb;
        c = 1.0 - exp(-c * 2.2);
        c = pow(c, vec3(0.92));
        float a = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);
        // Correct premultiplied alpha output for WebGL compositor
        o = vec4(c * a, a);
      }`,
  }

  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s))
    }
    return s
  }

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const makeProgram = (frag) => {
    const p = gl.createProgram()
    gl.attachShader(p, vs)
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, frag))
    gl.bindAttribLocation(p, 0, 'aPosition')
    gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(p))
    }
    const u = {}
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(p, i).name
      u[name] = gl.getUniformLocation(p, name)
    }
    return { p, u }
  }

  const P = {}
  Object.keys(FRAG).forEach((k) => (P[k] = makeProgram(FRAG[k])))

  // Fullscreen quad
  const vbo = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
  const ibo = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(0)

  const blit = (target) => {
    if (target) {
      gl.viewport(0, 0, target.w, target.h)
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
    } else {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  }

  // ---------- Framebuffers ----------
  const FMT = {
    rgba: [gl.RGBA16F, gl.RGBA],
    rg: [gl.RG16F, gl.RG],
    r: [gl.R16F, gl.RED],
  }

  const createFBO = (w, h, fmt) => {
    const [internal, format] = FMT[fmt]
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, gl.HALF_FLOAT, null)
    const fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    return {
      tex,
      fbo,
      w,
      h,
      tx: 1 / w,
      ty: 1 / h,
      bind(unit) {
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        return unit
      },
    }
  }

  const createDouble = (w, h, fmt) => {
    let a = createFBO(w, h, fmt),
      b = createFBO(w, h, fmt)
    return {
      w,
      h,
      tx: a.tx,
      ty: a.ty,
      get read() {
        return a
      },
      get write() {
        return b
      },
      swap() {
        ;[a, b] = [b, a]
      },
    }
  }

  const getRes = (res) => {
    let ar = canvas.width / canvas.height
    if (ar < 1) ar = 1 / ar
    const min = Math.round(res),
      max = Math.round(res * ar)
    return canvas.width > canvas.height ? { w: max, h: min } : { w: min, h: max }
  }

  let velocity, dye, divergence, curl, pressure
  const initBuffers = () => {
    const s = getRes(cfg.SIM_RES),
      d = getRes(cfg.DYE_RES)
    velocity = createDouble(s.w, s.h, 'rg')
    dye = createDouble(d.w, d.h, 'rgba')
    divergence = createFBO(s.w, s.h, 'r')
    curl = createFBO(s.w, s.h, 'r')
    pressure = createDouble(s.w, s.h, 'r')
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = Math.max(2, Math.floor(canvas.clientWidth * dpr))
    const h = Math.max(2, Math.floor(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      initBuffers()
    }
  }
  resize()

  const bindProgram = (prog) => {
    gl.useProgram(prog.p)
    return prog.u
  }

  // ---------- Splat ----------
  const splat = (x, y, dx, dy, color) => {
    const ar = canvas.width / canvas.height
    let r = cfg.SPLAT_RADIUS / 100
    if (ar > 1) r *= ar
    let u = bindProgram(P.splat)
    gl.uniform1i(u.uTarget, velocity.read.bind(0))
    gl.uniform1f(u.aspectRatio, ar)
    gl.uniform2f(u.point, x, y)
    gl.uniform3f(u.color, dx, dy, 0)
    gl.uniform1f(u.radius, r)
    blit(velocity.write)
    velocity.swap()

    gl.uniform1i(u.uTarget, dye.read.bind(0))
    gl.uniform3f(u.color, color[0], color[1], color[2])
    blit(dye.write)
    dye.swap()
  }

  const pick = () => {
    const a = palette[(Math.random() * palette.length) | 0]
    const k = cfg.INTENSITY * (0.8 + Math.random() * 0.4)
    return [a[0] * k, a[1] * k, a[2] * k]
  }

  // ---------- Simulation Step ----------
  const step = (dt) => {
    gl.disable(gl.BLEND)
    let u = bindProgram(P.curl)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    blit(curl)

    u = bindProgram(P.vorticity)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uCurl, curl.bind(1))
    gl.uniform1f(u.curl, cfg.CURL)
    gl.uniform1f(u.dt, dt)
    blit(velocity.write)
    velocity.swap()

    u = bindProgram(P.divergence)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    blit(divergence)

    u = bindProgram(P.clear)
    gl.uniform1i(u.uTexture, pressure.read.bind(0))
    gl.uniform1f(u.value, cfg.PRESSURE)
    blit(pressure.write)
    pressure.swap()

    u = bindProgram(P.pressure)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uDivergence, divergence.bind(0))
    for (let i = 0; i < cfg.PRESSURE_ITER; i++) {
      gl.uniform1i(u.uPressure, pressure.read.bind(1))
      blit(pressure.write)
      pressure.swap()
    }

    u = bindProgram(P.gradient)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uPressure, pressure.read.bind(0))
    gl.uniform1i(u.uVelocity, velocity.read.bind(1))
    blit(velocity.write)
    velocity.swap()

    u = bindProgram(P.advection)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uSource, velocity.read.bind(0))
    gl.uniform1f(u.dt, dt)
    gl.uniform1f(u.dissipation, cfg.VELOCITY_DISSIPATION)
    blit(velocity.write)
    velocity.swap()

    gl.uniform2f(u.texelSize, dye.tx, dye.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uSource, dye.read.bind(1))
    gl.uniform1f(u.dissipation, cfg.DENSITY_DISSIPATION)
    blit(dye.write)
    dye.swap()
  }

  // ---------- Render to Screen Canvas ----------
  const render = () => {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const u = bindProgram(P.display)
    gl.uniform2f(u.texelSize, 1 / canvas.width, 1 / canvas.height)
    gl.uniform1i(u.uTexture, dye.read.bind(0))
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  }

  // ---------- Pointer & Movement Input ----------
  const ptr = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    moved: false,
    has: false,
    lastX: 0,
    lastY: 0,
  }

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect()
    // Check if pointer is anywhere within the canvas/hero bounds
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      ptr.has = false
      return
    }
    const x = (e.clientX - r.left) / r.width
    const y = 1 - (e.clientY - r.top) / r.height

    if (!ptr.has) {
      ptr.lastX = x
      ptr.lastY = y
      ptr.has = true
      // Trigger a soft swirl immediately upon entering
      splat(x, y, (Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600, pick())
    } else {
      ptr.dx += x - ptr.lastX
      ptr.dy += y - ptr.lastY
      ptr.lastX = x
      ptr.lastY = y
    }
    ptr.x = x
    ptr.y = y
    ptr.moved = true
  }

  window.addEventListener('pointermove', onMove, { passive: true })

  // Splat a few soft smoke bursts on load so the effect is immediately visible
  for (let i = 0; i < 5; i++) {
    splat(
      0.2 + Math.random() * 0.6,
      0.3 + Math.random() * 0.4,
      (Math.random() - 0.5) * 1200,
      (Math.random() - 0.5) * 1200,
      pick()
    )
  }

  // ---------- Animation Loop ----------
  let raf = 0,
    last = performance.now(),
    visible = true
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
        ([en]) => {
          visible = en.isIntersecting
        },
        { threshold: 0 }
      )
      : null
  io && io.observe(canvas)

  const frame = (now) => {
    raf = requestAnimationFrame(frame)
    if (!visible || document.hidden) {
      last = now
      return
    }
    const dt = Math.min((now - last) / 1000, 0.0167)
    last = now
    resize()

    if (ptr.moved) {
      ptr.moved = false
      const ar = canvas.width / canvas.height
      let dx = ptr.dx,
        dy = ptr.dy
      ptr.dx = 0
      ptr.dy = 0
      if (ar < 1) dx *= ar
      else dy /= ar

      const dist = Math.hypot(dx, dy)
      if (dist > 0.00005) {
        // Guarantee enough impulse so even slow pointer drifts produce elegant smoke
        const force = Math.max(dist * cfg.SPLAT_FORCE, 1200)
        const fx = (dx / (dist || 1)) * force
        const fy = (dy / (dist || 1)) * force
        splat(ptr.x, ptr.y, fx, fy, pick())
      }
    }

    step(dt)
    render()
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    io && io.disconnect()
  }
}
