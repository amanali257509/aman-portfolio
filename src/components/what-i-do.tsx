'use client'

import React from 'react'
import {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { services } from '@/data/content'

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
}

export function WhatIDo() {
  return (
    <section id="services" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Core Disciplines
          </span>
          <h2 className="text-[#f1f5f9]">What I Do</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Specialized in bridging advanced AI automation with robust e-commerce architecture and full-stack web platforms.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2
            const isHeroCard = service.highlight
            const isFullStack = service.id === 'full-stack'
            const colSpan = isHeroCard
              ? 'lg:col-span-7'
              : isFullStack
              ? 'lg:col-span-5'
              : 'lg:col-span-4'

            return (
              <div
                key={service.id}
                className={`bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 flex flex-col justify-between ${colSpan}`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-10 w-10 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] flex items-center justify-center">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-semibold text-[#94a3b8]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[#f1f5f9] mb-1">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#f59e0b] mb-3">
                    {service.shortDescription}
                  </div>
                  <p className="text-[15px] leading-[1.6] text-[#94a3b8] mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-[#1e293b] mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-[6px] text-xs font-normal bg-[#0b0f17] text-[#94a3b8] border border-[#1e293b]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
