'use client'

import React, { useEffect, useRef, useState } from 'react'
import { automationItems } from '@/data/automation'
import { LoopVideo } from './loop-video'
import { Reveal } from './reveal'

export function AiShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

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

  const leftItem = automationItems[0] // Order sync
  const centerItem = automationItems[1] // Support replies
  const rightItem = automationItems[2] // Operations alerts

  return (
    <section id="automation" className="py-20 lg:py-30 border-t border-line" aria-labelledby="automation-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            AI automation
          </span>
          <h2 id="automation-title">AI automation work</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            I build n8n, Zapier and OpenAI workflows that handle orders, customer support and daily operations. Here are three of them running.
          </p>
        </Reveal>

        {/* 3D Showcase Grid */}
        <div
          ref={containerRef}
          className="ai-perspective grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center pt-4 pb-8"
        >
          {/* Center Card (Rendered first on mobile using order-1) */}
          {centerItem && (
            <div
              className={`order-1 lg:order-2 ai-showcase-center bg-surface rounded-[8px] overflow-hidden p-3 md:p-4 ${
                isRevealed ? 'is-revealed' : ''
              }`}
            >
              <LoopVideo
                src={centerItem.video}
                poster={centerItem.poster}
                title={centerItem.title}
                aspectRatio="aspect-[16/10]"
              />
              <div className="pt-4 pb-2 px-1">
                <span className="text-[12px] font-semibold text-brass uppercase tracking-wider block mb-1">
                  Active Workflow
                </span>
                <h3 className="text-ink text-[1.25rem]">
                  {centerItem.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                  {centerItem.description}
                </p>
              </div>
            </div>
          )}

          {/* Left Card */}
          {leftItem && (
            <div
              className={`order-2 lg:order-1 ai-showcase-left bg-surface rounded-[8px] overflow-hidden p-3 md:p-4 ${
                isRevealed ? 'is-revealed' : ''
              }`}
            >
              <LoopVideo
                src={leftItem.video}
                poster={leftItem.poster}
                title={leftItem.title}
                aspectRatio="aspect-[16/10]"
              />
              <div className="pt-4 pb-2 px-1">
                <h3 className="text-ink text-[1.25rem]">
                  {leftItem.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                  {leftItem.description}
                </p>
              </div>
            </div>
          )}

          {/* Right Card */}
          {rightItem && (
            <div
              className={`order-3 lg:order-3 ai-showcase-right bg-surface rounded-[8px] overflow-hidden p-3 md:p-4 ${
                isRevealed ? 'is-revealed' : ''
              }`}
            >
              <LoopVideo
                src={rightItem.video}
                poster={rightItem.poster}
                title={rightItem.title}
                aspectRatio="aspect-[16/10]"
              />
              <div className="pt-4 pb-2 px-1">
                <h3 className="text-ink text-[1.25rem]">
                  {rightItem.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                  {rightItem.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
