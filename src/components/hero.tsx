'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { profile } from '@/data/profile'
import FluidBackground from './FluidBackground'
import TiltPhoto from './TiltPhoto'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-canvas text-ink min-h-[100svh] flex items-center"
      aria-label="Introduction"
    >
      {/* Background Fluid Smoke Simulation (WebGL2 Canvas at z-0, pointer-events-none) */}
      <FluidBackground colors={['#c7a34d', '#e6c77a', '#8f6b2a']} />

      {/* Hero Content (z-10 above the fluid canvas) */}
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

            {/* H1 Heading */}
            <h1
              style={{ transitionDelay: '80ms' }}
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span>{profile.hero.headingLine1}</span>
              <span className="block text-brass mt-1">
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

              <a
                href={profile.links.cv}
                download="Aman_Ali_CV.pdf"
                className="btn-secondary"
              >
                <Download className="w-4 h-4 text-muted" strokeWidth={1.75} />
                <span>{profile.hero.secondaryCta}</span>
              </a>
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
    </section>
  )
}

export default Hero
