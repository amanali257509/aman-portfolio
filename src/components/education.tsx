'use client'

import React from 'react'
import { GraduationCap, Calendar, Check } from 'lucide-react'
import { education } from '@/data/content'

export function Education() {
  return (
    <section id="education" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Academic Foundation
          </span>
          <h2 className="text-[#f1f5f9]">Education</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Foundational computer science theory coupled with continuous applied engineering.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[#f1f5f9]">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#f59e0b] mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[6px] text-xs font-normal border border-[#1e293b] bg-[#0b0f17] text-[#94a3b8] shrink-0">
                  <Calendar className="w-3 h-3 text-[#f59e0b]" strokeWidth={1.75} />
                  {item.period}
                </span>
              </div>

              {item.details && (
                <ul className="space-y-2 pt-2 border-t border-[#1e293b]">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#94a3b8]">
                      <Check className="w-4 h-4 text-[#f59e0b] shrink-0 mt-1" strokeWidth={2} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
