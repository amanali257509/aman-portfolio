'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'

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
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo Mark */}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
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

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[8px] border border-line text-ink hover:border-brass hover:text-brass transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="md:hidden border-b border-line bg-canvas px-5 py-6 space-y-4"
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
            <div className="pt-2 border-t border-line">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Contact me
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
