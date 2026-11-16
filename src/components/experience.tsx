'use client'

import React from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react'
import { experiences } from '@/data/content'

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            5+ years building and scaling e-commerce platforms, AI automations, and full-stack systems across high-growth companies.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-navy-950 border-2 border-gold-500 text-gold-500 shadow-md shadow-gold-500/20 group-hover:scale-110 transition-transform">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-6 sm:p-8 hover:border-gold-500/30 transition-all duration-200 shadow-sm">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-xs bg-gold-500/10 text-gold-500 dark:text-gold-400 border border-gold-500/20">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {exp.company}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <ul className="space-y-2.5 mb-6 text-sm text-slate-600 dark:text-slate-300">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
