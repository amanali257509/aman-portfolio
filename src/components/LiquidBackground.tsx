'use client'

import React, { useEffect, useRef } from 'react'

// =========================================================================
// TUNABLE CONSTANTS (Adjust to customize feel, speed, and responsiveness)
// =========================================================================
export const INFLUENCE_RADIUS = 0.18 // Radius of cursor influence (~18% of screen height)
export const POINTER_EASING = 0.10 // Cursor lerp smoothing factor (0.08 to 0.12)
export const DECAY_SPEED = 2.4 // Exponential decay rate (~1.0 to 1.5s fade out)
export const FLOW_SPEED = 0.045 // Speed of slow idle liquid drift
export const GOLD_INTENSITY = 0.40 // Vein brightness and prominence (subtle, keeps text readable)

interface LiquidBackgroundProps {
  className?: string
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_radius;
uniform float u_intensity;
uniform float u_gold_intensity;

// 2D Hash & Noise
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 4-octave FBM matrix rotation for organic fluid folds
const mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float fbm(vec2 p) {
  float f = 0.0;
  f += 0.5000 * noise(p); p = m * p * 2.02;
  f += 0.2500 * noise(p); p = m * p * 2.03;
  f += 0.1250 * noise(p); p = m * p * 2.01;
  f += 0.0625 * noise(p);
  return f;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 p = uv;
  p.x *= aspect;
  p *= 2.3; // scale of fluid pattern

  // Cursor distortion: localized push and gentle swirl within u_radius
  if (u_intensity > 0.001) {
    vec2 ptr = u_pointer;
    ptr.x *= aspect;
    ptr *= 2.3;

    vec2 dVec = p - ptr;
    float dist = length(dVec);
    float rad = u_radius * 2.3;

    if (dist < rad) {
      float falloff = smoothstep(rad, 0.0, dist);
      // Fluid vorticity (swirl) + displacement (push)
      vec2 swirl = vec2(-dVec.y, dVec.x) * (falloff * falloff * u_intensity * 0.44);
      vec2 push = normalize(dVec + 0.0001) * (falloff * u_intensity * 0.22);
      p += swirl + push;
    }
  }

  // Domain warping (Inigo Quilez marbled fluid formulation)
  float t = u_time;
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + 0.12 * t),
    fbm(p + vec2(5.2, 1.3) + 0.14 * t)
  );

  vec2 r = vec2(
    fbm(p + 3.2 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p + 3.2 * q + vec2(8.3, 2.8) + 0.11 * t)
  );

  float f = fbm(p + 3.2 * r + 0.06 * t);

  // Normalize fluid height to 0..1
  float val = clamp((f + 0.45) * 0.85, 0.0, 1.0);

  // Veins: delicate curling filament ridges
  float vein1 = 1.0 - smoothstep(0.0, 0.14, abs(val - 0.46));
  float vein2 = 1.0 - smoothstep(0.0, 0.10, abs(val - 0.73));
  float broadVein = smoothstep(0.48, 0.85, val) * 0.35;

  float marbleVein = (vein1 * 0.70 + vein2 * 0.90 + broadVein) * u_gold_intensity;

  // Existing site palette colors:
  // Dark near-black canvas base (#0f1410)
  vec3 col_base = vec3(0.059, 0.078, 0.063);
  // Darker gold tone (#7a5a1c)
  vec3 col_dark_gold = vec3(0.478, 0.353, 0.11);
  // Rich brass/gold highlights (#c9a24d)
  vec3 col_gold = vec3(0.788, 0.635, 0.302);
  // Pale gold wisp highlights (#f0d58a)
  vec3 col_highlight = vec3(0.941, 0.835, 0.541);

  // Blend into deep fluid
  vec3 col = col_base;
  // Subtle ambient gold warmth in crevices
  col = mix(col, col_dark_gold, smoothstep(0.35, 0.75, val) * 0.28 * u_gold_intensity);
  // Delicate gold veins
  col = mix(col, col_gold, clamp(marbleVein, 0.0, 1.0));
  // Filigree bright highlights on crests
  col = mix(col, col_highlight, clamp(vein2 * marbleVein * 0.65, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[LiquidBackground] Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function LiquidBackground({ className = '' }: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Accessibility check: fallback to static gradient on reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    // Initialize WebGL context
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })

    if (!gl) {
      console.warn('[LiquidBackground] WebGL not supported, using CSS fallback.')
      return
    }

    const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC)
    const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[LiquidBackground] Program link error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return
    }

    gl.useProgram(program)

    // Full-screen quad buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations (cached once at init)
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uPointer = gl.getUniformLocation(program, 'u_pointer')
    const uRadius = gl.getUniformLocation(program, 'u_radius')
    const uIntensity = gl.getUniformLocation(program, 'u_intensity')
    const uGoldIntensity = gl.getUniformLocation(program, 'u_gold_intensity')

    // Touch device detection (lighter mode without pointer interaction)
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    // Reduced resolution rendering for silky 60fps performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resolutionScale = isTouch ? 0.45 : 0.55

    const resize = () => {
      if (!canvas) return
      const w = Math.floor(window.innerWidth * dpr * resolutionScale)
      const h = Math.floor(window.innerHeight * dpr * resolutionScale)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    resize()

    // Animation & Pointer State (Refs to avoid per-frame React updates)
    let animationFrameId: number
    let lastTime = performance.now()
    let simTime = 0
    let isVisible = true

    let targetX = 0.5
    let targetY = 0.5
    let currX = 0.5
    let currY = 0.5
    let intensity = 0.0
    let hasMoved = false

    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch) return
      targetX = e.clientX / window.innerWidth
      targetY = 1.0 - e.clientY / window.innerHeight // Invert Y for WebGL
      hasMoved = true
    }

    if (!isTouch) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
    }

    const handleResize = () => {
      resize()
    }
    window.addEventListener('resize', handleResize)

    // Pause when browser tab is inactive to preserve battery and GPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false
        cancelAnimationFrame(animationFrameId)
      } else {
        isVisible = true
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = (now: number) => {
      if (!isVisible) return

      // Delta time calculation (keeps speed identical across 60Hz, 120Hz, 144Hz)
      const dt = Math.min((now - lastTime) / 1000, 0.08)
      lastTime = now

      // Idle fluid drift
      simTime += dt * FLOW_SPEED

      // Smooth pointer tracking with easing & velocity
      if (hasMoved && !isTouch) {
        const dx = targetX - currX
        const dy = targetY - currY
        currX += dx * POINTER_EASING
        currY += dy * POINTER_EASING

        const moveDist = Math.hypot(dx, dy)
        // Fast movement creates stronger swirls, still cursor generates 0
        const addedIntensity = Math.min(moveDist * 14.0, 1.2)
        intensity = Math.min(intensity + addedIntensity, 1.5)
      }

      // Fast decay over 1.0 - 1.5 seconds so no lingering clouds remain
      intensity *= Math.exp(-dt * DECAY_SPEED)
      if (intensity < 0.001) {
        intensity = 0.0
      }

      // Update uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, simTime)
      gl.uniform2f(uPointer, currX, currY)
      gl.uniform1f(uRadius, INFLUENCE_RADIUS)
      gl.uniform1f(uIntensity, intensity)
      gl.uniform1f(uGoldIntensity, GOLD_INTENSITY)

      // Render quad
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Teardown on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (gl) {
        gl.deleteBuffer(positionBuffer)
        gl.deleteProgram(program)
        gl.deleteShader(vertShader)
        gl.deleteShader(fragShader)
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
      style={{
        backgroundColor: '#0f1410',
        backgroundImage:
          'radial-gradient(circle at 65% 25%, rgba(201,162,77,0.06) 0%, transparent 55%), radial-gradient(circle at 25% 75%, rgba(122,90,28,0.05) 0%, transparent 60%)',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  )
}

export { LiquidBackground }
