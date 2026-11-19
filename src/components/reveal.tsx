'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
  staggerIndex?: number
  className?: string
  as?: React.ElementType
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  staggerIndex = 0,
  className = '',
  as: Component = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '-60px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  const totalDelay = delay + staggerIndex * 60

  const directionClass =
    direction === 'left'
      ? 'reveal-left'
      : direction === 'right'
      ? 'reveal-right'
      : 'reveal-up'

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: totalDelay > 0 ? `${totalDelay}ms` : undefined,
      }}
      className={`reveal-init ${directionClass} ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
