'use client'

import React, { useEffect, useRef } from 'react'
import { initFluid } from '@/lib/fluid'

interface FluidBackgroundProps {
  colors?: string[]
  className?: string
}

const DEFAULT_SMOKE_COLORS = ['#c9a24d', '#b38b37', '#8f6a22', '#634714']

/**
 * Fixed-positioned canvas running WebGL2 Navier-Stokes fluid simulation.
 * Sits globally behind all page content (fixed inset-0, z-0, pointer-events-none),
 * smoothly following the cursor across the entire page body.
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
      className={`fixed inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  )
}

export { FluidBackground }
