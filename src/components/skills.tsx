'use client'

import React from 'react'
import {
  Workflow,
  Code2,
  ShoppingBag,
  TrendingUp,
  Server,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react'
import { skillGroups } from '@/data/skills'
import { Reveal } from './reveal'

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'AI Automation': Workflow,
  'Full Stack Development': Code2,
  'CMS and E-commerce': ShoppingBag,
  'E-commerce Operations and Marketing': TrendingUp,
  'Deployment and Backend': Server,
  'Design': Palette,
  'AI Tools': Sparkles,
  'Management': Users,
}

export function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }

  return (
    <section id="skills" className="py-20 lg:py-30 border-t border-line" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2 font-mono">
            Skills
          </span>
          <h2 id="skills-title">Tools &amp; technologies</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Platforms, languages and automation tools I use in production.
          </p>
        </Reveal>

        {/* 2-Column Grid of Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.name] || Sparkles
            const indexStr = String(index + 1).padStart(2, '0')

            return (
              <Reveal
                key={group.name}
                direction="up"
                staggerIndex={index}
              >
                <div
                  onMouseMove={handleMouseMove}
                  className="skill-card group relative bg-surface border border-line rounded-[8px] p-6 overflow-hidden"
                >
                  {/* Subtle mouse-follow radial glow */}
                  <div
                    aria-hidden="true"
                    className="skill-card-glow pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-350"
                  />

                  {/* Top Header: 40x40 Icon Tile + Muted Index Number */}
                  <div className="relative z-10 flex items-center justify-between mb-5">
                    <div
                      className="skill-icon-tile flex items-center justify-center w-10 h-10 rounded-[11px] border border-line"
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.5} className="skill-icon" />
                    </div>
                    <span className="skill-card-index font-mono text-[12px] font-medium tracking-widest select-none">
                      {indexStr}
                    </span>
                  </div>

                  {/* Card Content (Title + Chips) shifting up on hover */}
                  <div className="skill-card-content relative z-10">
                    <h3 className="skill-card-title text-[1.25rem] text-ink mb-4 font-semibold tracking-tight">
                      {group.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-chip text-[13px] font-normal px-2.5 py-1 rounded-[8px] border border-line bg-transparent cursor-default select-none"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
