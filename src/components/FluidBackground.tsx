'use client'

import React, { useEffect, useRef } from 'react'
import { initFluid } from '@/lib/fluid'

interface FluidBackgroundProps {
  colors?: string[]
  className?: string
}

/**
 * Absolute-positioned canvas running WebGL2 Navier-Stokes fluid simulation.
 * Must sit behind hero content (z-0 / pointer-events-none), with content above it on z-10.
 */
export default function FluidBackground({
  colors = ['#c7a34d', '#e6c77a', '#8f6b2a'],
  className = '',
}: FluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const cleanup = initFluid(canvasRef.current, { colors })
    return () => {
      if (cleanup) cleanup()
    }
  }, [colors])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none select-none ${className}`}
    />
  )
}

export { FluidBackground }
