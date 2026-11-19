'use client'

import React from 'react'
import { experiences } from '@/data/experience'
import { Reveal } from './reveal'

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-30 border-t border-line" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            Experience
          </span>
          <h2 id="experience-title">Work history</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Over 5 years delivering client stores, custom themes and production automation pipelines.
          </p>
        </Reveal>

        {/* Vertical Timeline */}
        <div className="border-l border-line pl-6 md:pl-8 space-y-12 relative ml-2 md:ml-3">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <Reveal
                key={index}
                direction={isEven ? 'left' : 'right'}
                staggerIndex={index}
                className="relative"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-canvas border border-brass" />

                <div className="bg-surface border border-line rounded-[8px] p-6 md:p-8">
                  {/* Role Header */}
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                    <h3 className="text-ink text-[1.25rem]">
                      {exp.role}
                    </h3>
                    <span className="text-[13px] text-muted font-normal shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company & Location */}
                  <div className="text-[14px] text-brass font-medium mb-4">
                    {exp.company} · {exp.location}
                  </div>

                  {/* CV Bullets */}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[14px] md:text-[15px] leading-relaxed text-muted flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-line mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
