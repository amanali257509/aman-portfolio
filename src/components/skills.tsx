'use client'

import React from 'react'
import { skillGroups } from '@/data/skills'
import { Reveal } from './reveal'

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-30 border-t border-line" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-12">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            Skills
          </span>
          <h2 id="skills-title">Tools &amp; technologies</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Platforms, languages and automation tools I use in production.
          </p>
        </Reveal>

        {/* 2-Column Grid of Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.name}
              direction="up"
              staggerIndex={index}
            >
              <div className="bg-surface border border-line rounded-[8px] p-6 hover:border-line transition-colors">
                <h3 className="text-[1.25rem] text-ink mb-4">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[13px] text-muted font-normal px-2.5 py-1 rounded-[8px] border border-line bg-transparent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
