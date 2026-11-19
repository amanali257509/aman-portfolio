'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MediaPlaceholder } from './media-placeholder'

interface LoopVideoProps {
  src: string
  poster?: string
  title: string
  className?: string
  aspectRatio?: string
}

export function LoopVideo({
  src,
  poster,
  title,
  className = '',
  aspectRatio = 'aspect-[16/10]',
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(isReduced)

    const videoEl = videoRef.current
    if (!videoEl || isReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              // Autoplay policy or video not ready
            })
          } else {
            videoEl.pause()
          }
        })
      },
      {
        threshold: 0.35,
      }
    )

    observer.observe(videoEl)

    return () => {
      observer.disconnect()
    }
  }, [])

  if (hasError) {
    return <MediaPlaceholder label={`${title} (Video placeholder)`} aspectRatio={aspectRatio} className={className} />
  }

  return (
    <div className={`relative w-full ${aspectRatio} rounded-[8px] overflow-hidden bg-surface border border-line ${className}`}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        autoPlay={!reducedMotion}
        onError={() => setHasError(true)}
        aria-label={title}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
