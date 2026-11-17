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
} from 'lucide-react'
import { personalDetails, getActiveMetrics } from '@/data/content'
import { WorkflowNodesVisual } from './workflow-nodes'

export function Hero() {
  const activeMetrics = getActiveMetrics()

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
              AI Automation &amp; Full Stack Engineer{' '}
              <span className="text-[#f59e0b]">| E-commerce Lead</span>
            </h1>

            {/* Tagline & Paragraph */}
            <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
              &ldquo;{personalDetails.tagline}&rdquo;
            </p>
            <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
              5+ years architecting autonomous n8n workflows, Next.js web applications, high-converting Shopify Liquid themes, and end-to-end e-commerce operations.
            </p>

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
