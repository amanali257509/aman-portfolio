'use client'

import React, { useRef } from 'react'
import Image from 'next/image'

interface TiltPhotoProps {
  src?: string
  alt?: string
  chips?: string[]
  className?: string
}

/**
 * 3D hover photo: card tilts toward the cursor (up to 12 deg),
 * glare follows the pointer, chips float in front with 3D depth,
 * smooth return on leave, disabled on touch devices and reduced-motion.
 */
export default function TiltPhoto({
  src = '/aman-banner.webp',
  alt = 'Aman Ali - WordPress & Shopify Expert | AI Automation Specialist',
  chips = ['Shopify', 'WordPress', 'n8n'],
  className = '',
}: TiltPhotoProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const MAX = 12 // max tilt in degrees

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !sceneRef.current || !cardRef.current) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const rect = sceneRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height

    cardRef.current.style.transition = 'transform 80ms ease-out'
    cardRef.current.style.transform = `rotateY(${(px - 0.5) * 2 * MAX}deg) rotateX(${-(py - 0.5) * 2 * MAX}deg) scale3d(1.02, 1.02, 1.02)`

    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255, 255, 255, 0.22), transparent 55%)`
    }
  }

  const handlePointerLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)'
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1000 }}
      className={`relative mx-auto w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] select-none ${className}`}
    >
      {/* Ambient gold glow safely behind the 3D card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-brass/25 via-brass/10 to-transparent blur-xl pointer-events-none -z-10"
      />

      <div
        ref={cardRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="relative"
      >
        {/* Photo Container */}
        <div className="relative aspect-square overflow-hidden rounded-[24px] border border-brass/30 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.85)] bg-surface">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
            className="object-cover"
          />
          <div
            ref={glareRef}
            style={{ opacity: 0, transition: 'opacity 300ms' }}
            className="pointer-events-none absolute inset-0 z-10"
          />
        </div>

        {/* Floating chips (3D depth) */}
        {chips.map((chip, index) => {
          const isOdd = index % 2 === 1
          return (
            <span
              key={chip}
              style={
                {
                  transform: `translateZ(${50 + index * 10}px)`,
                  top: `${14 + index * 26}%`,
                  [isOdd ? 'right' : 'left']: '-4%',
                } as React.CSSProperties
              }
              className="absolute z-20 rounded-full border border-brass/35 bg-canvas/90 px-3.5 py-1.5 text-[13px] sm:text-[14px] font-medium text-ink backdrop-blur-md shadow-lg pointer-events-none"
            >
              {chip}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export { TiltPhoto }
