'use client'

import React, { useEffect, useRef } from 'react'
import { initFluid } from '@/lib/fluid'

interface LiquidBackgroundProps {
  className?: string
}

export default function LiquidBackground({ className = '' }: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize high-performance fluid simulation
    const cleanup = initFluid(canvas)

    return () => {
      if (cleanup) cleanup()
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
