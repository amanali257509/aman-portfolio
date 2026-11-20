'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { WhatsAppLogo } from './whatsapp-logo'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI Automation', href: '#automation' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Focus trap / management when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector('a')
      firstLink?.focus()
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* 2px brass scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-brass z-50 pointer-events-none transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <header
        className={`sticky top-0 left-0 right-0 z-40 bg-canvas/90 backdrop-blur-md transition-colors duration-200 ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          {/* Left: Logo Mark */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-brass"
              aria-label="Aman Ali - Homepage"
            >
              <span className="h-8 w-8 rounded-[8px] bg-surface border border-line flex items-center justify-center font-heading font-bold text-brass text-sm group-hover:border-brass transition-colors">
                AA
              </span>
              <span className="font-heading font-bold text-[17px] text-ink tracking-tight">
                {profile.name}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 justify-center flex-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-normal text-muted hover:text-brass transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Desktop / Tablet Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-brass text-canvas hover:bg-brass-hover text-[13px] font-semibold transition-all shadow-[0_2px_10px_rgba(201,162,77,0.25)] active:scale-95"
              >
                Hire me
              </a>

              <a
                href="https://wa.me/923112756456"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat directly on WhatsApp (03112756456)"
                title="Chat on WhatsApp"
                className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[8px] bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 shrink-0"
              >
                <WhatsAppLogo className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-[8px] border border-line text-ink hover:border-brass hover:text-brass transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.75} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="lg:hidden border-b border-line bg-canvas/95 backdrop-blur-md px-5 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] font-normal text-muted hover:text-brass transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-line flex flex-col sm:flex-row gap-2.5">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center text-[14px]"
              >
                Hire me
              </a>
              <a
                href="https://wa.me/923112756456"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-[8px] bg-[#25D366] text-white hover:bg-[#20bd5a] font-semibold text-center text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <WhatsAppLogo className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
