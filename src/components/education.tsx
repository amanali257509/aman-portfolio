'use client'

import React from 'react'
import { GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'
import { Reveal } from './reveal'

export function Education() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }

  return (
    <section id="education" className="py-16 md:py-20 border-t border-line" aria-labelledby="education-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        <Reveal direction="up">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2 font-mono">
            Education
          </span>
          <h2 id="education-title" className="sr-only">Education</h2>

          <div
            onMouseMove={handleMouseMove}
            className="education-card group relative bg-surface border border-line rounded-[8px] p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden transition-all duration-350"
          >
            {/* Subtle mouse-follow spotlight */}
            <div
              aria-hidden="true"
              className="education-card-glow pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-350"
            />

            <div className="relative z-10 flex items-center gap-4">
              <div
                className="education-icon-tile flex items-center justify-center w-11 h-11 rounded-[11px] border border-line shrink-0"
                aria-hidden="true"
              >
                <GraduationCap size={22} strokeWidth={1.5} className="education-icon" />
              </div>
              <div>
                <h3 className="education-card-title text-ink text-[1.25rem] font-semibold tracking-tight">
                  {profile.education.degree}
                </h3>
                <p className="text-[14px] text-muted mt-0.5">
                  {profile.education.institution}
                </p>
              </div>
            </div>

            <span className="relative z-10 text-[13px] text-brass font-medium px-3.5 py-1.5 rounded-[8px] border border-brass/40 bg-canvas/80 self-start md:self-center">
              {profile.education.status}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
