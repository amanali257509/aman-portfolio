'use client'

import React from 'react'
import { Workflow, Code2, Layers, Briefcase } from 'lucide-react'
import { experiences } from '@/data/experience'
import { Reveal } from './reveal'

const expIcons = [Workflow, Code2, Layers]

export function Experience() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }

  return (
    <section id="experience" className="py-20 lg:py-30 border-t border-line" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2 font-mono">
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
            const Icon = expIcons[index] || Briefcase
            const isEven = index % 2 === 0

            return (
              <Reveal
                key={index}
                direction={isEven ? 'left' : 'right'}
                staggerIndex={index}
                className="relative group"
              >
                {/* Timeline node marker that glows gold on hover */}
                <div className="absolute -left-[31px] md:-left-[39px] top-6 w-3 h-3 rounded-full bg-canvas border border-brass transition-all duration-300 group-hover:bg-brass group-hover:shadow-[0_0_12px_rgba(201,162,77,0.7)] group-hover:scale-125 z-10" />

                <div
                  onMouseMove={handleMouseMove}
                  className="experience-card relative bg-surface border border-line rounded-[8px] p-6 md:p-8 overflow-hidden transition-all duration-350"
                >
                  {/* Subtle mouse-follow spotlight */}
                  <div
                    aria-hidden="true"
                    className="experience-card-glow pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-350"
                  />

                  {/* Header Row: Icon Tile + Role & Period */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className="experience-icon-tile flex items-center justify-center w-11 h-11 rounded-[11px] border border-line shrink-0"
                        aria-hidden="true"
                      >
                        <Icon size={20} strokeWidth={1.5} className="experience-icon" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="experience-card-title text-ink text-[1.25rem] font-semibold tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="text-[14px] text-brass font-medium mt-1">
                          {exp.company} · {exp.location}
                        </div>
                      </div>
                    </div>

                    <span className="text-[13px] text-muted font-mono font-medium shrink-0 md:pt-1">
                      {exp.period}
                    </span>
                  </div>

                  {/* CV Bullets */}
                  <ul className="relative z-10 space-y-2.5 pt-2 border-t border-line/60">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[14px] md:text-[15px] leading-relaxed text-muted flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass/60 mt-2 shrink-0" />
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
