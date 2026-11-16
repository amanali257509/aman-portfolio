'use client'

import React from 'react'
import { ArrowUp, Github, Linkedin, ExternalLink, Mail, Heart, Sparkles } from 'lucide-react'
import { personalDetails } from '@/data/content'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-navy-950/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 font-heading text-sm font-bold text-navy-950 shadow-md">
              AA
            </div>
            <div>
              <div className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                {personalDetails.name}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {personalDetails.headline.split('|')[0].trim()}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalDetails.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalDetails.links.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalDetails.email}`}
              aria-label="Email"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-gold-500 hover:border-gold-500/30 transition-all"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            &copy; {currentYear} {personalDetails.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
