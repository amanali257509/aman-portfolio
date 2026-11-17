'use client'

import React, { useState } from 'react'
import {
  Cpu,
  Code2,
  Store,
  BarChart3,
  Terminal,
  Palette,
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
    <section id="skills" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Capabilities
          </span>
          <h2 className="text-[#f1f5f9]">Tech Stack &amp; Skills</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Battle-tested technologies across autonomous AI workflows, full-stack web engineering, custom e-commerce platforms, and marketing operations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 pb-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`h-[36px] px-4 rounded-[6px] text-xs font-semibold transition-colors duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#f59e0b] text-[#0b0f17]'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:border-[#f59e0b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group) => {
            const Icon = iconMap[group.icon] || Cpu
            return (
              <div
                key={group.category}
                className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] flex items-center justify-center">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[#f1f5f9] text-[18px]">
                        {group.category}
                      </h3>
                      <span className="text-xs text-[#94a3b8]">
                        {group.skills.length} verified technologies
                      </span>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-normal bg-[#0b0f17] text-[#f1f5f9] border border-[#1e293b]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
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
