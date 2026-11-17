'use client'

import React from 'react'
import {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
  Cpu,
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
    <section id="services" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Engineering Disciplines</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What I Do
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Specialized in bridging advanced AI automation with robust e-commerce architecture and full-stack web platforms.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2
            const isHeroCard = service.highlight
            const isFullStack = service.id === 'full-stack'
            const colSpan = isHeroCard
              ? 'lg:col-span-7'
              : isFullStack
              ? 'lg:col-span-5'
              : 'lg:col-span-4'

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between ${colSpan} ${
                  isHeroCard
                    ? 'border-amber-300/80 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 shadow-md shadow-amber-500/5 dark:border-gold-500/30 dark:bg-gradient-to-br dark:from-navy-900/90 dark:via-navy-950/90 dark:to-navy-900/90 dark:shadow-xl dark:shadow-gold-500/5'
                    : 'border-slate-200/90 bg-white/90 backdrop-blur-md hover:border-amber-400/80 shadow-sm dark:border-white/10 dark:bg-navy-900/60 dark:hover:border-gold-500/30'
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Step ID */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        isHeroCard
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-gold-500/20 dark:text-gold-400 dark:border-gold-500/40'
                          : 'bg-slate-100 text-slate-800 border border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 group-hover:text-amber-700 dark:group-hover:text-gold-400 group-hover:border-amber-400/50'
                      } transition-colors`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-amber-600 dark:group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-semibold text-xs text-amber-700 dark:text-gold-400 mb-2.5">
                    {service.shortDescription}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>
                </div>

                {/* Tags / Technologies */}
                <div className="pt-3.5 border-t border-slate-200/80 dark:border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200/90 dark:bg-navy-950/80 dark:text-slate-300 dark:border-white/10"
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
