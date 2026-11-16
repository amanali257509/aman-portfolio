'use client'

import React, { useState } from 'react'
import {
  Cpu,
  Code2,
  Store,
  BarChart3,
  Terminal,
  Palette,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { skillCategories } from '@/data/content'

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Code2,
  Store,
  BarChart3,
  Terminal,
  Palette,
}

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...skillCategories.map((c) => c.category)]

  const displayedCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === selectedCategory)

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tools &amp; Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tech Stack &amp; Skills
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Battle-tested technologies across autonomous AI workflows, full-stack web engineering, custom e-commerce platforms, and marketing operations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-navy-950 font-bold shadow-md shadow-gold-500/20'
                  : 'bg-white dark:bg-navy-900/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group) => {
            const Icon = iconMap[group.icon] || Cpu
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-6 shadow-sm hover:border-gold-500/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 dark:text-gold-400 border border-gold-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                        {group.category}
                      </h3>
                      <span className="font-mono text-[11px] text-slate-400">
                        {group.skills.length} verified technologies
                      </span>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-navy-950/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:border-gold-500/40 transition-colors"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
