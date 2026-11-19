'use client'

import React, { useEffect, useRef } from 'react'
import { initFluid } from '@/lib/fluid'

interface FluidBackgroundProps {
  colors?: string[]
  className?: string
}

const DEFAULT_SMOKE_COLORS = ['#c7a34d', '#e6c77a', '#d4af37', '#8f6b2a']

/**
 * Absolute-positioned canvas running WebGL2 Navier-Stokes fluid simulation.
 * Sits behind hero content (z-0 / pointer-events-none), with content above it on z-10.
 */
export default function FluidBackground({
  colors = DEFAULT_SMOKE_COLORS,
  className = '',
}: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cleanup = initFluid(canvas, { colors })
    return () => {
      if (cleanup) cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty deps so it runs once on mount and doesn't re-trigger WebGL teardown

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ backgroundColor: 'transparent' }}
      className={`absolute inset-0 h-full w-full pointer-events-none select-none z-0 ${className}`}
    />
  )
}

export { FluidBackground }
