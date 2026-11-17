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
    <section
      id="home"
      className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 flex items-center justify-center overflow-hidden bg-dot-grid"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 sm:h-[450px] sm:w-[500px] rounded-full bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent blur-[100px] dark:from-gold-500/15" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Bio, headline, badges, CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-mono mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to remote full-time roles &amp; freelance</span>
            </div>

            {/* Profile Avatar & Location Badge */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 font-heading text-lg font-extrabold text-navy-950 shadow-md shadow-gold-500/25 ring-2 ring-gold-500/30">
                <span>AA</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-navy-950 flex items-center justify-center">
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>
              </div>
              <div>
                <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {personalDetails.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-600 dark:text-gold-400" />
                    {personalDetails.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                    {personalDetails.timezone}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
              AI Automation &amp; Full Stack Engineer{' '}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-gold-400 dark:via-amber-400 dark:to-gold-500 bg-clip-text text-transparent">
                | E-commerce Lead
              </span>
            </h1>

            {/* Tagline & Subline */}
            <p className="text-base text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-6">
              &ldquo;{personalDetails.tagline}&rdquo;{' '}
              <span className="block mt-2 text-sm text-slate-600 dark:text-slate-400">
                5+ years architecting autonomous n8n workflows, Next.js web applications, high-converting Shopify Liquid themes, and end-to-end e-commerce operations.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-6 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 dark:from-gold-500 dark:via-amber-500 dark:to-gold-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-slate-300 dark:border-white/15 bg-white dark:bg-navy-900/60 backdrop-blur-md text-slate-800 dark:text-white hover:border-gold-500/40 hover:text-gold-600 dark:hover:text-gold-400 transition-all duration-200 shadow-sm"
              >
                <Layers className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                <span>What I Do</span>
              </a>

              <a
                href="/Aman_Ali_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-transparent text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links & Direct Email */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/10 w-full">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Direct Channels:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalDetails.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/40 transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalDetails.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/40 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalDetails.links.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiverr Seller Profile"
                  className="p-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/40 transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalDetails.email}`}
                  aria-label="Email Aman Ali"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-500/40 transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>{personalDetails.email}</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            {activeMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full pt-4 border-t border-slate-200/80 dark:border-white/10">
                {activeMetrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-heading text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-gold-400">
                      {metric.value}
                    </span>
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: 2x2 spacious Workflow Node canvas (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <WorkflowNodesVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
