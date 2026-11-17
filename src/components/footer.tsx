'use client'

import React from 'react'
import { ArrowUp, Github, Linkedin, ExternalLink, Mail } from 'lucide-react'
import { personalDetails } from '@/data/content'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1e293b] bg-[#0b0f17] py-8">
      <div className="max-w-[1275px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#f59e0b] text-xs font-semibold text-[#0b0f17]">
              AA
            </div>
            <div>
              <div className="text-sm font-semibold text-[#f1f5f9]">
                {personalDetails.name}
              </div>
              <p className="text-xs text-[#94a3b8]">
                {personalDetails.headline.split('|')[0].trim()}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={personalDetails.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
            >
              <Github className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <a
              href={personalDetails.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <a
              href={personalDetails.links.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr"
              className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <a
              href={`mailto:${personalDetails.email}`}
              aria-label="Email"
              className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
            >
              <Mail className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 h-[36px] px-3 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] text-xs font-semibold text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <div>
            &copy; {currentYear} {personalDetails.name}. All rights reserved.
          </div>
          <div>
            Built with Next.js &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  )
}
