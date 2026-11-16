'use client'

import React from 'react'
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react'
import { education } from '@/data/content'

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Foundational computer science theory coupled with continuous applied engineering.
          </p>
        </div>

        {/* Education Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-7 sm:p-8 hover:border-gold-500/30 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 dark:text-gold-400 border border-gold-500/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-medium text-gold-500 dark:text-gold-400">
                      {item.institution}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-xs bg-gold-500/10 text-gold-500 dark:text-gold-400 border border-gold-500/20 shrink-0">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              </div>

              {item.details && (
                <ul className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-300">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
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
