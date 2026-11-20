'use client'

import React from 'react'
import {
  Layers,
  ShoppingBag,
  Bot,
  Code2,
  Layout,
  TrendingUp,
} from 'lucide-react'
import { services } from '@/data/services'
import { Reveal } from './reveal'

const serviceIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'wordpress-woocommerce': Layers,
  'shopify-liquid': ShoppingBag,
  'ai-automation': Bot,
  'full-stack': Code2,
  'webflow-wix-cms': Layout,
  'ecommerce-operations-seo': TrendingUp,
}

export function Services() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }

  return (
    <section id="services" className="py-20 lg:py-30 border-t border-line" aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2 font-mono">
            Services
          </span>
          <h2 id="services-title">What I offer</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Specialized engineering across custom e-commerce stores, modern full-stack development and practical AI workflows.
          </p>
        </Reveal>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((item, index) => {
            const Icon = serviceIcons[item.id] || Layers
            const isEven = index % 2 === 0

            return (
              <Reveal
                key={item.id}
                direction={isEven ? 'left' : 'right'}
                staggerIndex={index}
              >
                <div
                  onMouseMove={handleMouseMove}
                  className="service-card group relative bg-surface border border-line rounded-[8px] p-6 md:p-8 overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Subtle mouse-follow radial spotlight */}
                  <div
                    aria-hidden="true"
                    className="service-card-glow pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-350"
                  />

                  {/* Top Bar: Icon Tile + Mono Index Number */}
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div
                      className="service-icon-tile flex items-center justify-center w-11 h-11 rounded-[11px] border border-line"
                      aria-hidden="true"
                    >
                      <Icon size={21} strokeWidth={1.5} className="service-icon" />
                    </div>
                    <span className="service-card-index font-mono text-[13px] font-medium tracking-widest select-none">
                      {item.number}
                    </span>
                  </div>

                  {/* Content: Title & Description */}
                  <div className="service-card-content relative z-10 flex-1">
                    <h3 className="service-card-title text-[1.25rem] md:text-[1.3rem] text-ink font-semibold tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-muted mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Stack Chips at Bottom */}
                  <div className="relative z-10 pt-5 border-t border-line/60">
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="service-chip text-[12px] md:text-[13px] font-normal px-2.5 py-1 rounded-[8px] border border-line bg-transparent cursor-default select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
