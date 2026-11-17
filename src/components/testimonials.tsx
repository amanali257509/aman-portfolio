'use client'

import React from 'react'
import Image from 'next/image'
import { Quote, Star, ExternalLink } from 'lucide-react'
import { testimonials, Testimonial } from '@/lib/testimonials'

export function Testimonials() {
  // STRICT RULE:
  // If array is empty, do not render this section at all.
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Client Feedback
          </span>
          <h2 className="text-[#f1f5f9]">What Clients Say</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Direct feedback from business owners, agency leads, and international clients.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: Testimonial) => (
            <article
              key={t.id}
              className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Bar: Quote icon & Source badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-8 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5 text-[#f59e0b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b]" />
                      ))}
                    </div>

                    {/* Source Badge */}
                    {t.source && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#0b0f17] text-[#f59e0b] border border-[#1e293b]">
                        {t.source}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-[14px] leading-[1.7] text-[#94a3b8] mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-[#1e293b] flex items-center gap-3">
                {t.avatar ? (
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#1e293b] shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] font-semibold flex items-center justify-center text-xs shrink-0">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <h4 className="text-[14px] font-semibold text-[#f1f5f9] leading-tight">
                    {t.name}
                  </h4>
                  <div className="text-xs text-[#94a3b8] mt-0.5">
                    {t.role}
                    {t.company ? ` • ${t.company}` : ''}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
