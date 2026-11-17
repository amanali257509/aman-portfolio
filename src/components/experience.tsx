'use client'

import React from 'react'
import { Calendar, MapPin, Check } from 'lucide-react'
import { experiences } from '@/data/content'

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Career Path
          </span>
          <h2 className="text-[#f1f5f9]">Work Experience</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            5+ years building and scaling e-commerce platforms, AI automations, and full-stack systems across high-growth companies.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-[#f1f5f9]">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a3b8] mt-1">
                    <span className="font-semibold text-[#f59e0b]">
                      {exp.company}
                    </span>
                    {exp.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#94a3b8]" strokeWidth={1.75} />
                          {exp.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[6px] text-xs font-normal border border-[#1e293b] bg-[#0b0f17] text-[#94a3b8]">
                  <Calendar className="w-3 h-3 text-[#f59e0b]" strokeWidth={1.75} />
                  {exp.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-[15px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
                {exp.description}
              </p>

              {/* Achievements */}
              <ul className="space-y-2">
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
                    <Check className="w-4 h-4 text-[#f59e0b] shrink-0 mt-1" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Chips */}
              <div className="pt-4 border-t border-[#1e293b] flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-[6px] text-xs bg-[#0b0f17] text-[#94a3b8] border border-[#1e293b]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
