'use client'

import React from 'react'
import { services } from '@/data/services'
import { Reveal } from './reveal'

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-30 border-t border-line" aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            Services
          </span>
          <h2 id="services-title">What I offer</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Specialized engineering across custom e-commerce stores, modern full-stack development and practical AI workflows.
          </p>
        </Reveal>

        {/* 6-Row List */}
        <div className="border-t border-line divide-y divide-line">
          {services.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <Reveal
                key={item.id}
                direction={isEven ? 'left' : 'right'}
                staggerIndex={index}
              >
                <div className="group py-6 md:py-8 px-4 -mx-4 rounded-[8px] transition-colors duration-200 hover:bg-surface flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-8">
                  {/* Left: Number and Title/Description */}
                  <div className="flex items-start gap-5 md:gap-8 min-w-0 flex-1">
                    <span className="text-[14px] text-muted font-normal mt-1 shrink-0 font-mono">
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-ink transition-colors duration-200 group-hover:text-brass">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-muted max-w-[55ch]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Stack Names */}
                  <div className="md:text-right shrink-0 pt-1 pl-10 md:pl-0">
                    <span className="text-[13px] text-muted font-normal block leading-relaxed">
                      {item.stack.join(' · ')}
                    </span>
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
