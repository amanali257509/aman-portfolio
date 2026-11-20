'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface TiltPhotoProps {
  src?: string
  alt?: string
  chips?: string[]
  className?: string
}

const DEFAULT_CHIPS = ['Shopify', 'WordPress', 'n8n', 'Zapier', 'OpenAI']

export default function TiltPhoto({
  src = '/aman-cutout.png',
  alt = 'Aman Ali - WordPress & Shopify Expert | AI Automation Specialist',
  chips = DEFAULT_CHIPS,
  className = '',
}: TiltPhotoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    let isVisible = true

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      r: number
    }

    let particles: Particle[] = []

    const initParticles = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      if (!width || !height) return

      const isMobile = width < 480
      const count = isMobile ? 18 : 34

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.8,
      }))
    }

    const draw = () => {
      if (!isVisible || !width || !height) return
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.fillStyle = 'rgba(240, 213, 138, 0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw faint gold connecting lines
      const maxDist = width < 480 ? 95 : 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDist) {
            const alpha = 0.22 * (1 - dist / maxDist)
            ctx.strokeStyle = `rgba(201, 162, 77, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    // Pause when tab is hidden, resume when visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false
        cancelAnimationFrame(animId)
      } else {
        isVisible = true
        animId = requestAnimationFrame(draw)
      }
    }

    // Pause when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true
            animId = requestAnimationFrame(draw)
          }
        } else {
          isVisible = false
          cancelAnimationFrame(animId)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const handleResize = () => {
      initParticles()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('resize', handleResize)

    initParticles()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  // 5 floating chips: distributed naturally around Aman, staying safely inside viewport
  const chipLayout: Record<string, { pos: string; delay: string }> = {
    Zapier: {
      pos: 'top-[6%] sm:top-[8%] left-[2%] sm:-left-[1%]',
      delay: '-3.6s',
    },
    Shopify: {
      pos: 'top-[28%] sm:top-[30%] left-[0%] sm:-left-[3%]',
      delay: '0s',
    },
    n8n: {
      pos: 'bottom-[20%] sm:bottom-[22%] left-[2%] sm:-left-[1%]',
      delay: '-2.4s',
    },
    WordPress: {
      pos: 'top-[32%] sm:top-[34%] right-[0%] sm:-right-[3%]',
      delay: '-1.2s',
    },
    OpenAI: {
      pos: 'bottom-[16%] sm:bottom-[18%] right-[2%] sm:-right-[1%]',
      delay: '-4.8s',
    },
  }

  return (
    <div
      ref={containerRef}
      className={`hero-portrait-stage relative mx-auto w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] h-[390px] xs:h-[430px] sm:h-[480px] md:h-[520px] lg:h-[540px] select-none ${className}`}
      aria-label={alt}
    >
      {/* 1. Canvas particle net (behind everything) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* 2. Soft pulsing gold glow */}
      <div
        aria-hidden="true"
        className="hero-pulse-glow w-[74%] max-w-[380px] z-0"
      />

      {/* 3. Two thin rotating gold rings */}
      <div
        aria-hidden="true"
        className="hero-gold-ring hero-gold-ring-1 z-0"
      />
      <div
        aria-hidden="true"
        className="hero-gold-ring hero-gold-ring-2 z-0"
      />

      {/* 4. Aman cutout with gentle floating motion & bottom fade */}
      <div className="hero-cutout-float relative z-10 w-full h-full flex items-end justify-center pointer-events-none">
        <div className="hero-cutout-mask relative w-full h-[95%] max-w-[440px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 480px"
            className="object-contain object-bottom drop-shadow-[0_10px_28px_rgba(201,162,77,0.25)]"
          />
        </div>
      </div>

      {/* 5. Floating bobbing chips */}
      {chips.map((chip, idx) => {
        const layout = chipLayout[chip] || {
          pos: idx % 2 === 0 ? 'left-[2%]' : 'right-[2%]',
          delay: `${-idx * 1.2}s`,
        }
        return (
          <div
            key={chip}
            style={{ animationDelay: layout.delay }}
            className={`hero-chip-bob pointer-events-none absolute z-20 flex items-center gap-1.5 rounded-full border border-brass/45 bg-[#0f1410]/85 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-[12px] sm:text-[13px] font-medium tracking-wide text-ink backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.65)] ${layout.pos}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0 shadow-[0_0_6px_rgba(201,162,77,0.8)]" />
            <span className="font-mono">{chip}</span>
          </div>
        )
      })}
    </div>
  )
}

export { TiltPhoto, TiltPhoto as HeroPortrait }
