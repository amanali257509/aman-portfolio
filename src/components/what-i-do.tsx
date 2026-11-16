'use client'

import React from 'react'
import {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react'
import { services } from '@/data/content'

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
}

export function WhatIDo() {
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Engineering Disciplines</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What I Do
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Specialized in bridging advanced AI automation with robust e-commerce architecture and full-stack web platforms.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2
            const isHeroCard = service.highlight // AI Automation takes 7 cols on lg
            const isFullStack = service.id === 'full-stack' // 5 cols on lg
            const colSpan = isHeroCard
              ? 'lg:col-span-7'
              : isFullStack
              ? 'lg:col-span-5'
              : 'lg:col-span-4'

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl border transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between ${colSpan} ${
                  isHeroCard
                    ? 'border-gold-500/30 bg-gradient-to-br from-navy-900/90 via-navy-950/90 to-navy-900/90 shadow-xl shadow-gold-500/5'
                    : 'border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md hover:border-gold-500/30 shadow-md'
                }`}
              >
                {/* Ambient hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Icon & ID */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isHeroCard
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:text-gold-400 group-hover:border-gold-500/30'
                      } transition-colors`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Short description */}
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-gold-500 dark:group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-medium text-xs text-gold-500 dark:text-gold-400 mb-3">
                    {service.shortDescription}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Tags / Technologies */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-navy-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                      >
                        {tag}
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
