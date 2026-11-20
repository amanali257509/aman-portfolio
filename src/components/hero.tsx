'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Download, FileText, X, ExternalLink } from 'lucide-react'
import { profile } from '@/data/profile'
import TiltPhoto from './TiltPhoto'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [cvModalOpen, setCvModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll and handle ESC key for CV modal
  useEffect(() => {
    if (!cvModalOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCvModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cvModalOpen])

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-transparent text-ink min-h-[100svh] flex items-center"
      aria-label="Introduction"
    >
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12 py-24 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Existing Hero Text */}
          <div className="lg:col-span-7">
            {/* Eyebrow line */}
            <div
              style={{ transitionDelay: '0ms' }}
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-3 font-mono">
                {profile.location} · {profile.availability}
              </span>
            </div>

            {/* H1 Heading: 2 lines */}
            <h1
              style={{ transitionDelay: '80ms' }}
              className={`text-[clamp(1.75rem,3.2vw,2.85rem)] leading-[1.15] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="block sm:whitespace-nowrap">
                {profile.hero.headingLine1}
              </span>
              <span className="block text-brass mt-1 sm:mt-1.5 sm:whitespace-nowrap">
                {profile.hero.headingLine2}
              </span>
            </h1>

            {/* Paragraph */}
            <p
              style={{ transitionDelay: '160ms' }}
              className={`mt-6 text-[16px] lg:text-[17px] leading-[1.65] text-muted max-w-[65ch] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {profile.hero.paragraph}
            </p>

            {/* Buttons */}
            <div
              style={{ transitionDelay: '240ms' }}
              className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a href="#contact" className="btn-primary">
                <span>{profile.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 btn-arrow" strokeWidth={1.75} />
              </a>

              {/* View CV in Modal Button */}
              <button
                type="button"
                onClick={() => setCvModalOpen(true)}
                aria-label="View Aman Ali CV in popup"
                className="btn-secondary group/btn cursor-pointer"
              >
                <FileText className="w-4 h-4 text-brass transition-transform duration-200 group-hover/btn:-translate-y-0.5" strokeWidth={2} />
                <span>{profile.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Facts under buttons */}
            <div
              style={{ transitionDelay: '320ms' }}
              className={`mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-6 text-[14px] text-muted transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {profile.hero.facts.map((fact, index) => (
                <span key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                  <span>{fact}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Photo on desktop, stacked below text on mobile */}
          <div
            style={{ transitionDelay: '200ms' }}
            className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <TiltPhoto
              src="/aman-banner.webp"
              alt="Aman Ali - WordPress & Shopify Expert | AI Automation Specialist"
              chips={['Shopify', 'WordPress', 'n8n']}
            />
          </div>
        </div>
      </div>

      {/* CV PDF Lightbox / Modal */}
      {cvModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aman Ali CV Preview"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setCvModalOpen(false)}
        >
          <div
            className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-[20px] border border-line bg-surface shadow-[0_25px_65px_rgba(0,0,0,0.85)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-line bg-[#121813]/95 gap-3 flex-shrink-0">
              {/* Left: Window controls + Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                </div>
                <div className="h-4 w-[1px] bg-line hidden sm:block" />
                <div className="min-w-0 flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brass/10 border border-brass/30 text-brass font-semibold uppercase tracking-wider">
                    PDF
                  </span>
                  <h3 className="text-[15px] sm:text-[16px] font-heading font-semibold text-ink truncate">
                    Aman Ali — Curriculum Vitae
                  </h3>
                </div>
              </div>

              {/* Right: Actions (Download + Open in New Tab + Close) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Download Button */}
                <a
                  href={profile.links.cv}
                  download="Aman_Ali_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold bg-brass text-canvas hover:bg-brass-hover transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Download PDF</span>
                </a>

                {/* Open in New Tab */}
                <a
                  href={profile.links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open PDF in new browser tab"
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-muted hover:text-ink hover:bg-canvas/50 border border-line transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>New Tab</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  aria-label="Close CV preview"
                  className="p-1.5 sm:p-2 rounded-lg text-muted hover:text-ink hover:bg-canvas/60 border border-line transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF Viewer */}
            <div className="relative flex-1 w-full bg-[#0a0d0b] overflow-hidden">
              <iframe
                src={`${profile.links.cv}#toolbar=1&navpanes=0`}
                className="w-full h-full border-none bg-canvas"
                title="Aman Ali CV Preview"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
