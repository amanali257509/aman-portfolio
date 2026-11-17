'use client'

import React from 'react'
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Clock,
  Layers,
  Globe,
  ShoppingBag,
  Bot,
} from 'lucide-react'
import { personalDetails, getActiveMetrics } from '@/data/content'
import { WorkflowNodesVisual } from './workflow-nodes'

export function Hero() {
  const activeMetrics = getActiveMetrics()

  const handleFilterCategory = (category: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('filter-projects', { detail: category }))
      const el = document.getElementById('projects')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-[1275px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 h-8 px-3 rounded-[6px] border border-[#1e293b] bg-[#111827] text-xs font-normal text-[#f59e0b]">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span>Open to remote full-time roles &amp; freelance worldwide</span>
            </div>

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-[6px] bg-[#f59e0b] text-[#0b0f17] font-semibold flex items-center justify-center text-lg shrink-0">
                AA
              </div>
              <div>
                <div className="text-[18px] font-semibold text-[#f1f5f9]">
                  {personalDetails.name}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#94a3b8] mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" strokeWidth={1.75} />
                    {personalDetails.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#94a3b8]" strokeWidth={1.75} />
                    {personalDetails.timezone}
                  </span>
                </div>
              </div>
            </div>

            {/* H1 Headline */}
            <h1 className="text-[#f1f5f9]">
              WordPress &amp; Shopify Expert{' '}
              <span className="text-[#f59e0b]">| AI Automation Specialist</span>
            </h1>

            {/* Tagline & Subtitle */}
            <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
              E-commerce Technology Lead with 5+ years architecting bespoke WordPress (ACF Pro) themes, high-converting Shopify Liquid stores, autonomous AI automation pipelines (n8n, OpenAI), and modern Next.js web applications.
            </p>

            {/* 3 Prominent Expertise Badges/Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                {
                  title: 'WordPress & ACF Expert',
                  desc: 'Custom Themes, ACF Pro & WooCommerce',
                  category: 'WordPress',
                  icon: Globe,
                },
                {
                  title: 'Shopify (Liquid) Expert',
                  desc: 'Theme 2.0, Liquid & CRO',
                  category: 'Shopify',
                  icon: ShoppingBag,
                },
                {
                  title: 'AI Automation (n8n, OpenAI)',
                  desc: 'Workflows & Custom AI Agents',
                  category: 'AI Automation',
                  icon: Bot,
                },
              ].map((badge) => {
                const Icon = badge.icon
                return (
                  <button
                    key={badge.category}
                    type="button"
                    onClick={() => handleFilterCategory(badge.category)}
                    className="text-left group p-3.5 rounded-[6px] bg-[#111827] border border-[#1e293b] hover:border-[#f59e0b] transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-8 w-8 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] group-hover:border-[#f59e0b] flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#f59e0b] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#f1f5f9] group-hover:text-[#f59e0b] transition-colors leading-snug">
                        {badge.title}
                      </div>
                      <div className="text-[11px] text-[#94a3b8] mt-1 leading-normal">
                        {badge.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-6 text-[15px] font-semibold bg-[#f59e0b] text-[#0b0f17] rounded-[6px] hover:bg-[#d97706] transition-colors duration-200"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-6 text-[15px] font-semibold border border-[#1e293b] text-[#f1f5f9] rounded-[6px] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
              >
                <Layers className="w-4 h-4 text-[#f59e0b]" strokeWidth={1.75} />
                <span>What I Do</span>
              </a>

              <a
                href="/Aman_Ali_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-6 text-[15px] font-semibold border border-[#1e293b] text-[#f1f5f9] rounded-[6px] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
              >
                <Download className="w-4 h-4 text-[#94a3b8]" strokeWidth={1.75} />
                <span>Download CV</span>
              </a>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#1e293b]">
              <span className="text-xs text-[#94a3b8] uppercase tracking-wider">
                Direct Channels:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalDetails.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="h-9 w-9 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
                >
                  <Github className="w-4 h-4" strokeWidth={1.75} />
                </a>
                <a
                  href={personalDetails.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" strokeWidth={1.75} />
                </a>
                <a
                  href={personalDetails.links.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiverr"
                  className="h-9 w-9 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
                </a>
                <a
                  href={`mailto:${personalDetails.email}`}
                  className="inline-flex items-center gap-2 h-9 px-3 rounded-[6px] border border-[#1e293b] text-xs text-[#94a3b8] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f59e0b]" strokeWidth={1.75} />
                  <span>{personalDetails.email}</span>
                </a>
              </div>
            </div>

            {/* Metrics */}
            {activeMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1e293b]">
                {activeMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-[28px] font-semibold text-[#f59e0b] leading-tight">
                      {metric.value}
                    </div>
                    <div className="text-xs text-[#94a3b8] mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Workflow visual (5 cols) */}
          <div className="lg:col-span-5">
            <WorkflowNodesVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
