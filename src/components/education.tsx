'use client'

import React from 'react'
import { profile } from '@/data/profile'
import { Reveal } from './reveal'

export function Education() {
  return (
    <section id="education" className="py-16 md:py-20 border-t border-line" aria-labelledby="education-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        <Reveal direction="up">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            Education
          </span>
          <h2 id="education-title" className="sr-only">Education</h2>

          <div className="bg-surface border border-line rounded-[8px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-ink text-[1.25rem]">
                {profile.education.degree}
              </h3>
              <p className="text-[14px] text-muted mt-1">
                {profile.education.institution}
              </p>
            </div>
            <span className="text-[13px] text-brass font-medium px-3 py-1 rounded-[8px] border border-line bg-canvas self-start md:self-center">
              {profile.education.status}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
