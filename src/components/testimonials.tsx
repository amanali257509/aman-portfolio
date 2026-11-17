'use client'

import React from 'react'
import { Quote } from 'lucide-react'
import { getActiveTestimonials } from '@/data/content'

export function Testimonials() {
  const activeTestimonials = getActiveTestimonials()

  // STRICT HONESTY RULE:
  // Automatically hide section if only placeholders exist
  if (activeTestimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Endorsements
          </span>
          <h2 className="text-[#f1f5f9]">Client Feedback</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Verified feedback from teams and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#f59e0b] mb-4" strokeWidth={1.75} />
                <p className="text-[15px] leading-[1.6] text-[#f1f5f9] mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#1e293b]">
                <div className="text-sm font-semibold text-[#f1f5f9]">
                  {t.clientName}
                </div>
                <div className="text-xs text-[#94a3b8]">
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
