'use client'

import React from 'react'
import Link from 'next/link'
import { profile } from '@/data/profile'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 py-12 border-t border-line bg-transparent" aria-label="Site Footer">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="h-8 w-8 rounded-[8px] bg-surface border border-line flex items-center justify-center font-heading font-bold text-brass text-sm hover:border-brass transition-colors"
            aria-label="Back to top"
          >
            AA
          </Link>
          <div>
            <div className="font-heading font-semibold text-[15px] text-ink">
              {profile.name}
            </div>
            <p className="text-[13px] text-muted">
              {profile.title} · {profile.subtitle}
            </p>
          </div>
        </div>

        {/* Plain text links */}
        <div className="flex flex-wrap items-center gap-6 text-[14px]">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-brass link-underline transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-brass link-underline transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-brass link-underline transition-colors"
          >
            Upwork
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted hover:text-brass link-underline transition-colors"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[13px] text-muted">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
