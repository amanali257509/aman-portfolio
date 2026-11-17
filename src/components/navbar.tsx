'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { personalDetails, getActiveProjects } from '@/data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hasActiveProjects = getActiveProjects().length > 0

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'What I Do', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech Stack', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0b0f17] border-b border-[#1e293b]'
          : 'bg-[#0b0f17]'
      }`}
    >
      <div className="max-w-[1275px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="#home" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-[6px] bg-[#f59e0b] text-[#0b0f17] font-semibold flex items-center justify-center text-sm">
            AA
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-[#f1f5f9] leading-tight">
              {personalDetails.name}
            </span>
            <span className="text-xs text-[#94a3b8] leading-tight">
              WordPress &amp; Shopify Expert
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-[#94a3b8] hover:text-[#f59e0b] transition-colors duration-200 font-normal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-2 h-[44px] px-6 text-[15px] font-semibold bg-[#f59e0b] text-[#0b0f17] rounded-[6px] hover:bg-[#d97706] transition-colors duration-200"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation"
            className="md:hidden h-[44px] w-[44px] flex items-center justify-center rounded-[6px] border border-[#1e293b] text-[#f1f5f9] hover:border-[#f59e0b] transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1e293b] bg-[#111827] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] text-[#94a3b8] hover:text-[#f59e0b] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 h-[44px] px-6 text-[15px] font-semibold bg-[#f59e0b] text-[#0b0f17] rounded-[6px] hover:bg-[#d97706] transition-colors duration-200 mt-4"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </a>
        </div>
      )}
    </header>
  )
}
