/*
 * Cursor-driven fluid smoke background (WebGL2 Navier-Stokes).
 * Exports initFluid(canvas, options) -> stop() cleanup function.
 */
export function initFluid(canvas, options = {}) {
  const cfg = {
    SIM_RES: 128,
    DYE_RES: 960,
    DENSITY_DISSIPATION: 0.94, // gentle, lingering smoke fade
    VELOCITY_DISSIPATION: 0.96, // fluid velocity persistence
    PRESSURE: 0.8,
    PRESSURE_ITER: 20,
    CURL: 30, // swirliness
    SPLAT_RADIUS: 0.38, // smoke cloud spread
    SPLAT_FORCE: 6000,
    INTENSITY: 0.85, // dye brightness
    colors: ['#c7a34d', '#e6c77a', '#d4af37', '#8f6b2a'],
    ...options,
  }

  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
  })
  if (!gl) return () => {}

  // Enable float color buffers
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
  void main() {
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
      void main() {
        o = value * texture(uTexture, vUv);
      }`,
    splat: `${HEAD} uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
      void main() {
        vec2 p = vUv - point;
        p.x *= aspectRatio;
        float d2 = dot(p, p);
        float r = max(radius, 0.0001);
        vec3 s = exp(-d2 / r) * color;
        vec4 base = texture(uTarget, vUv);
        o = vec4(max(vec3(0.0), base.xyz + s), 1.0);
      }`,
    advection: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
      void main() {
        vec2 c = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
        o = texture(uSource, c) / (1.0 + dissipation * dt);
      }`,
    divergence: `${HEAD} uniform sampler2D uVelocity;
      void main() {
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
      void main() {
        float L = texture(uVelocity, vL).y;
        float R = texture(uVelocity, vR).y;
        float T = texture(uVelocity, vT).x;
        float B = texture(uVelocity, vB).x;
        o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
      }`,
    vorticity: `${HEAD} uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main() {
        float L = texture(uCurl, vL).x;
        float R = texture(uCurl, vR).x;
        float T = texture(uCurl, vT).x;
        float B = texture(uCurl, vB).x;
        float C = texture(uCurl, vUv).x;
        vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        float len = length(f);
        if (len > 0.00001) {
          f = (f / len) * curl * C;
        } else {
          f = vec2(0.0);
        }
        f.y *= -1.0;
        vec2 v = texture(uVelocity, vUv).xy + f * dt;
        o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
      }`,
    pressure: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main() {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        float d = texture(uDivergence, vUv).x;
        o = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
      }`,
    gradient: `${HEAD} uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main() {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
        o = vec4(v, 0.0, 1.0);
      }`,
    display: `${HEAD} uniform sampler2D uTexture;
      void main() {
        vec4 tex = texture(uTexture, vUv);
        vec3 c = max(vec3(0.0), tex.rgb);
        c = vec3(1.0) - exp(-c * 1.8);
        c = pow(c, vec3(0.92));
        float a = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0);
        // Clean premultiplied alpha: transparent when zero, vibrant gold when smoke passes
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
    const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < count; i++) {
      const name = gl.getActiveUniform(p, i).name
      u[name] = gl.getUniformLocation(p, name)
    }
    return { p, u }
  }

  const P = {
    clear: makeProgram(FRAG.clear),
    splat: makeProgram(FRAG.splat),
    advection: makeProgram(FRAG.advection),
    divergence: makeProgram(FRAG.divergence),
    curl: makeProgram(FRAG.curl),
    vorticity: makeProgram(FRAG.vorticity),
    pressure: makeProgram(FRAG.pressure),
    gradient: makeProgram(FRAG.gradient),
    display: makeProgram(FRAG.display),
  }

  // Fullscreen quad geometry
  const quadBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  )

  const elemBuf = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuf)
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW
  )

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(0)

  const blit = (dest) => {
    if (dest) {
      gl.viewport(0, 0, dest.w, dest.h)
      gl.bindFramebuffer(gl.FRAMEBUFFER, dest.fbo)
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
    let a = createFBO(w, h, fmt)
    let b = createFBO(w, h, fmt)
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
        const t = a
        a = b
        b = t
      },
    }
  }

  const getRes = (res) => {
    let ar = canvas.width / (canvas.height || 1)
    if (ar < 1) ar = 1 / ar
    const min = Math.max(2, Math.round(res))
    const max = Math.max(2, Math.round(res * ar))
    return canvas.width > canvas.height ? { w: max, h: min } : { w: min, h: max }
  }

  let velocity, dye, divergence, curl, pressure

  const initBuffers = () => {
    if (canvas.width < 2 || canvas.height < 2) return
    const s = getRes(cfg.SIM_RES)
    const d = getRes(cfg.DYE_RES)
    velocity = createDouble(s.w, s.h, 'rg')
    dye = createDouble(d.w, d.h, 'rgba')
    divergence = createFBO(s.w, s.h, 'r')
    curl = createFBO(s.w, s.h, 'r')
    pressure = createDouble(s.w, s.h, 'r')
  }

  const resize = () => {
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5)
    const w = Math.max(2, Math.floor((canvas.clientWidth || 800) * dpr))
    const h = Math.max(2, Math.floor((canvas.clientHeight || 600) * dpr))
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

  // ---------- Splat Dye & Velocity ----------
  const splat = (x, y, dx, dy, color) => {
    if (!velocity || !dye || canvas.width < 2 || canvas.height < 2) return
    const ar = canvas.width / canvas.height
    let r = cfg.SPLAT_RADIUS / 100
    if (ar > 1) r *= ar

    // Splat into velocity
    let u = bindProgram(P.splat)
    gl.uniform1i(u.uTarget, velocity.read.bind(0))
    gl.uniform1f(u.aspectRatio, ar)
    gl.uniform2f(u.point, x, y)
    gl.uniform3f(u.color, dx, dy, 0)
    gl.uniform1f(u.radius, r)
    blit(velocity.write)
    velocity.swap()

    // Splat into dye
    gl.uniform1i(u.uTarget, dye.read.bind(0))
    gl.uniform3f(u.color, color[0], color[1], color[2])
    blit(dye.write)
    dye.swap()
  }

  const pick = () => {
    const a = palette[(Math.random() * palette.length) | 0]
    const k = cfg.INTENSITY * (0.8 + Math.random() * 0.5)
    return [a[0] * k, a[1] * k, a[2] * k]
  }

  // ---------- Simulation Step ----------
  const step = (dt) => {
    if (!velocity || !dye || !divergence || !curl || !pressure) return
    gl.disable(gl.BLEND)

    // Curl
    let u = bindProgram(P.curl)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    blit(curl)

    // Vorticity confinement
    u = bindProgram(P.vorticity)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uCurl, curl.bind(1))
    gl.uniform1f(u.curl, cfg.CURL)
    gl.uniform1f(u.dt, dt)
    blit(velocity.write)
    velocity.swap()

    // Divergence
    u = bindProgram(P.divergence)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    blit(divergence)

    // Clear pressure
    u = bindProgram(P.clear)
    gl.uniform1i(u.uTexture, pressure.read.bind(0))
    gl.uniform1f(u.value, cfg.PRESSURE)
    blit(pressure.write)
    pressure.swap()

    // Pressure Poisson solver
    u = bindProgram(P.pressure)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uDivergence, divergence.bind(0))
    for (let i = 0; i < cfg.PRESSURE_ITER; i++) {
      gl.uniform1i(u.uPressure, pressure.read.bind(1))
      blit(pressure.write)
      pressure.swap()
    }

    // Subtract pressure gradient
    u = bindProgram(P.gradient)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uPressure, pressure.read.bind(0))
    gl.uniform1i(u.uVelocity, velocity.read.bind(1))
    blit(velocity.write)
    velocity.swap()

    // Velocity advection
    u = bindProgram(P.advection)
    gl.uniform2f(u.texelSize, velocity.tx, velocity.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uSource, velocity.read.bind(0))
    gl.uniform1f(u.dt, dt)
    gl.uniform1f(u.dissipation, cfg.VELOCITY_DISSIPATION)
    blit(velocity.write)
    velocity.swap()

    // Dye advection
    gl.uniform2f(u.texelSize, dye.tx, dye.ty)
    gl.uniform1i(u.uVelocity, velocity.read.bind(0))
    gl.uniform1i(u.uSource, dye.read.bind(1))
    gl.uniform1f(u.dissipation, cfg.DENSITY_DISSIPATION)
    blit(dye.write)
    dye.swap()
  }

  // ---------- Final Screen Render ----------
  const render = () => {
    if (!dye || canvas.width < 2 || canvas.height < 2) return
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
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      ptr.has = false
      return
    }
    const x = (e.clientX - r.left) / r.width
    const y = 1.0 - (e.clientY - r.top) / r.height

    if (!ptr.has) {
      ptr.lastX = x
      ptr.lastY = y
      ptr.has = true
      // Trigger a gentle swirl immediately on hover entry
      splat(x, y, (Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800, pick())
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
  for (let i = 0; i < 4; i++) {
    splat(
      0.25 + Math.random() * 0.5,
      0.3 + Math.random() * 0.4,
      (Math.random() - 0.5) * 1400,
      (Math.random() - 0.5) * 1400,
      pick()
    )
  }

  // ---------- Animation Loop ----------
  let raf = 0
  let last = performance.now()
  let visible = true

  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([en]) => {
            visible = en.isIntersecting
          },
          { threshold: 0 }
        )
      : null
  if (io) io.observe(canvas)

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
      let dx = ptr.dx
      let dy = ptr.dy
      ptr.dx = 0
      ptr.dy = 0
      if (ar < 1) dx *= ar
      else dy /= ar

      const dist = Math.hypot(dx, dy)
      if (dist > 0.0001) {
        const force = Math.max(dist * cfg.SPLAT_FORCE, 1400)
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
    if (io) io.disconnect()
  }
}
