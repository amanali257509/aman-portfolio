'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { personalDetails, getActiveProjects } from '@/data/content'
import { ThemeToggle } from './theme-toggle'
import { CommandMenu } from './command-menu'

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
    { label: 'Tech Stack', href: '#skills' },
    ...(hasActiveProjects ? [{ label: 'Work', href: '#work' }] : []),
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/90 dark:bg-navy-950/85 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-lg dark:shadow-black/20'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-xl p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 font-heading text-lg font-bold text-navy-950 shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform duration-200">
              <span>AA</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-navy-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {personalDetails.name}
              </span>
              <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 -mt-0.5 tracking-wider uppercase font-semibold">
                AI &amp; Full Stack
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-300/90 dark:border-white/10 bg-white/90 dark:bg-navy-900/60 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-gold-400 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <CommandMenu />
            <ThemeToggle />

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-400 dark:from-gold-500 dark:to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-sm shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-300 bg-white/90 dark:bg-navy-900/60 shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-navy-950/95 backdrop-blur-2xl p-4 shadow-xl">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-gold-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 mt-2 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-amber-500 dark:bg-gold-500 text-slate-950 shadow-sm"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="/Aman_Ali_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-800 dark:text-slate-300"
                >
                  Download CV (PDF)
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
