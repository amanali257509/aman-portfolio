'use client'

import React from 'react'
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react'
import { education } from '@/data/content'

export function Education() {
  return (
    <section id="education" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-400 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Foundational computer science theory coupled with continuous applied engineering.
          </p>
        </div>

        {/* Education Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-navy-900/60 backdrop-blur-md p-6 sm:p-7 hover:border-amber-400/80 dark:hover:border-gold-500/30 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 dark:bg-gold-500/10 dark:text-gold-400 dark:border-gold-500/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-amber-700 dark:text-gold-400">
                      {item.institution}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-xs bg-amber-50 text-amber-800 border border-amber-200 dark:bg-gold-500/10 dark:text-gold-400 dark:border-gold-500/20 font-semibold shrink-0">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              </div>

              {item.details && (
                <ul className="space-y-2 mt-4 text-sm text-slate-700 dark:text-slate-300">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
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
