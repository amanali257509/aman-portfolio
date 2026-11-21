'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { automationItems } from '@/data/automation'
import { Reveal } from './reveal'
import { ChevronLeft, ChevronRight, Maximize2, X, Play } from 'lucide-react'

const AUTO_INTERVAL_MS = 5000

export function AiShowcase() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const total = automationItems.length

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx)
  }

  // Auto-play interval with loop
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      nextSlide()
    }, AUTO_INTERVAL_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, lightboxIndex, nextSlide])

  // Keyboard navigation for Lightbox and Carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null)
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + total) % total))
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % total))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, total])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [lightboxIndex])

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setTouchStartX(null)
  }

  const activeItem = automationItems[currentIndex]
  const lightboxItem = lightboxIndex !== null ? automationItems[lightboxIndex] : null

  return (
    <section id="automation" className="py-20 lg:py-30 border-t border-line" aria-labelledby="automation-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header with Navigation Arrows */}
        <Reveal direction="up" className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
                AI automation
              </span>
              <h2 id="automation-title">AI automation work</h2>
              <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
                I build n8n, Zapier and OpenAI workflows that handle orders, customer support and daily operations. Here are three of them running.
              </p>
            </div>

            {/* Navigation Arrows & Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[14px] text-muted font-medium mr-1">
                0{currentIndex + 1} <span className="text-line">/</span> 0{total}
              </span>

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous workflow"
                className="w-11 h-11 rounded-[8px] border border-line bg-surface text-ink hover:text-brass hover:border-brass flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next workflow"
                className="w-11 h-11 rounded-[8px] border border-line bg-surface text-ink hover:text-brass hover:border-brass flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          {/* Main Featured Slide */}
          <div className="overflow-hidden rounded-[8px] border border-line bg-surface">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {automationItems.map((item, idx) => (
                <div key={item.id} className="w-full shrink-0 p-4 md:p-6 lg:p-8">
                  {/* Video Box with Click-to-Lightbox */}
                  <div
                    onClick={() => setLightboxIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setLightboxIndex(idx)
                      }
                    }}
                    aria-label={`Open ${item.title} video in full screen lightbox`}
                    className="group relative w-full aspect-[16/10] rounded-[8px] overflow-hidden bg-canvas border border-line hover:border-brass transition-colors cursor-pointer video-crisp"
                  >
                    <video
                      src={item.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      aria-label={item.title}
                      className="w-full h-full object-cover video-crisp pointer-events-none"
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>

                    {/* Hover Hint Overlay */}
                    <div className="absolute inset-0 bg-canvas/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-canvas/90 border border-brass text-ink text-[14px] font-medium shadow-lg">
                        <Maximize2 className="w-4 h-4 text-brass" aria-hidden="true" />
                        <span>Click to open lightbox</span>
                      </div>
                    </div>

                    {/* Corner badge indicating full screen click */}
                    <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-canvas/80 border border-line text-muted text-[12px] font-mono">
                        <Play className="w-3 h-3 text-brass fill-brass" aria-hidden="true" />
                        <span>Watch video</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Slide Information */}
                  <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-line">
                    <div>
                      <span className="text-[12px] font-semibold text-brass uppercase tracking-wider block mb-1">
                        Active Workflow
                      </span>
                      <h3 className="text-ink text-[1.25rem] lg:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[15px] lg:text-[16px] text-muted max-w-[65ch]">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="btn-secondary self-start md:self-center shrink-0 text-[14px] py-2.5 px-4"
                      aria-label={`Open ${item.title} video in full screen lightbox`}
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                      <span>Watch Fullscreen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-Select Workflow Cards (3 items below carousel) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {automationItems.map((item, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative text-left p-4 rounded-[8px] border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-surface-hover border-brass text-ink'
                      : 'bg-surface border-line text-muted hover:border-line hover:text-ink'
                  }`}
                  aria-label={`Switch to ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-mono text-brass">
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-semibold text-brass uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-[15px] font-semibold text-ink">
                    {item.title}
                  </div>
                  <div className="text-[13px] text-muted line-clamp-1 mt-0.5">
                    {item.description}
                  </div>

                  {/* Auto-progress line indicator */}
                  {isActive && !isPaused && lightboxIndex === null && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-line overflow-hidden rounded-b-[8px]">
                      <div
                        key={currentIndex}
                        className="h-full bg-brass"
                        style={{
                          animation: `progressTimer ${AUTO_INTERVAL_MS}ms linear forwards`,
                        }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {mounted && lightboxIndex !== null && lightboxItem && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxItem.title} video player`}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center pt-16 pb-4 px-3 sm:pt-20 sm:pb-6 sm:px-6 md:p-8 lightbox-animate-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxIndex(null)
            }
          }}
        >
          <div className="relative w-full max-w-5xl bg-surface border border-line rounded-[20px] overflow-hidden shadow-2xl flex flex-col max-h-[84vh] sm:max-h-[86vh] my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:px-6 border-b border-line bg-surface shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-semibold text-brass uppercase tracking-wider">
                  Active Workflow
                </span>
                <span className="text-line">|</span>
                <span className="text-ink text-[15px] font-semibold">
                  {lightboxItem.title}
                </span>
                <span className="text-muted text-[13px] hidden sm:inline">
                  (0{lightboxIndex + 1} of 0{total})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close video lightbox"
                className="w-10 h-10 rounded-[8px] border border-line bg-canvas text-ink hover:text-brass hover:border-brass flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Video Player with Left/Right Arrows */}
            <div className="relative flex-1 min-h-0 bg-canvas flex items-center justify-center p-2 sm:p-4">
              <video
                key={lightboxItem.video}
                src={lightboxItem.video}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[64vh] object-contain rounded-[6px] bg-canvas"
              >
                <source src={lightboxItem.video} type="video/mp4" />
              </video>

              {/* Lightbox Previous Video Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + total) % total))
                }}
                aria-label="Previous video"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-[8px] border border-line bg-surface/90 text-ink hover:text-brass hover:border-brass flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Lightbox Next Video Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % total))
                }}
                aria-label="Next video"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-[8px] border border-line bg-surface/90 text-ink hover:text-brass hover:border-brass flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:px-6 border-t border-line bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div>
                <p className="text-[14px] md:text-[15px] text-ink">
                  {lightboxItem.description}
                </p>
                <span className="text-[12px] text-muted block mt-0.5">
                  Automated with n8n, OpenAI API and webhooks.
                </span>
              </div>

              <div className="text-[12px] text-muted self-end sm:self-auto shrink-0 font-mono">
                Press Esc to close
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
