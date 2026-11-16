'use client'

import React from 'react'
import { MessageSquare, Quote } from 'lucide-react'
import { getActiveTestimonials } from '@/data/content'

export function Testimonials() {
  const activeTestimonials = getActiveTestimonials()

  // STRICT HONESTY RULE:
  // Automatically hide section if only placeholders exist
  if (activeTestimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client &amp; Team Feedback
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Verified testimonials from colleagues, partners, and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-7 relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <div className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                  {t.clientName}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {t.role} • {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
