'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  Search,
  FileText,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  ExternalLink,
  X,
  Command,
} from 'lucide-react'
import { personalDetails } from '@/data/content'
import { useTheme } from './theme-provider'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Actions' | 'Social'
  icon: React.ElementType
  action: () => void
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { theme, toggleTheme } = useTheme()

  const navigateTo = useCallback((id: string) => {
    setOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const items: CommandItem[] = [
    {
      id: 'nav-hero',
      title: 'Home / Hero',
      subtitle: 'Jump to top intro and bio',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('home'),
    },
    {
      id: 'nav-what-i-do',
      title: 'What I Do',
      subtitle: 'AI automation, full stack, e-commerce bento',
      category: 'Navigation',
      icon: Layers,
      action: () => navigateTo('services'),
    },
    {
      id: 'nav-tech-stack',
      title: 'Tech Stack',
      subtitle: 'Skills, tools, and platforms',
      category: 'Navigation',
      icon: Briefcase,
      action: () => navigateTo('skills'),
    },
    {
      id: 'nav-experience',
      title: 'Experience Timeline',
      subtitle: '5+ years engineering career journey',
      category: 'Navigation',
      icon: Briefcase,
      action: () => navigateTo('experience'),
    },
    {
      id: 'nav-education',
      title: 'Education',
      subtitle: 'BS Computer Science, Virtual University',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => navigateTo('education'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Me',
      subtitle: 'Get in touch for roles & projects',
      category: 'Navigation',
      icon: Mail,
      action: () => navigateTo('contact'),
    },
    {
      id: 'act-download-cv',
      title: 'Download CV',
      subtitle: 'Get Aman_Ali_CV.pdf',
      category: 'Actions',
      icon: FileText,
      action: () => {
        setOpen(false)
        window.open('/Aman_Ali_CV.pdf', '_blank')
      },
    },
    {
      id: 'act-send-email',
      title: 'Email Aman Ali',
      subtitle: personalDetails.email,
      category: 'Actions',
      icon: Mail,
      action: () => {
        setOpen(false)
        window.location.href = `mailto:${personalDetails.email}`
      },
    },
    {
      id: 'act-toggle-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle theme display',
      category: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme()
      },
    },
    {
      id: 'soc-github',
      title: 'GitHub Profile',
      subtitle: 'Explore code repositories',
      category: 'Social',
      icon: Github,
      action: () => {
        setOpen(false)
        window.open(personalDetails.links.github, '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'soc-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'Connect on professional network',
      category: 'Social',
      icon: Linkedin,
      action: () => {
        setOpen(false)
        window.open(personalDetails.links.linkedin, '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'soc-fiverr',
      title: 'Fiverr Seller Profile',
      subtitle: 'View freelance reviews & services',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        setOpen(false)
        window.open(personalDetails.links.fiverr, '_blank', 'noopener,noreferrer')
      },
    },
  ]

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  return (
    <>
      {/* Trigger pill */}
      <button
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Open command palette"
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 dark:border-white/10 border-slate-200 bg-white/60 dark:bg-navy-900/60 backdrop-blur-md text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200 shadow-sm"
      >
        <Search className="w-3.5 h-3.5 text-gold-400" />
        <span>Quick search...</span>
        <kbd className="inline-flex items-center gap-0.5 rounded bg-black/10 dark:bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-navy-900 dark:bg-navy-900 bg-slate-900 text-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-gold-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sections, actions, links..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">
                  No commands found matching &quot;{search}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-300 group-hover:bg-gold-500/20 group-hover:text-gold-400 transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-white group-hover:text-gold-300">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-400">{item.subtitle}</div>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 border border-white/10 rounded px-1.5 py-0.5">
                          {item.category}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-black/30 px-4 py-2.5 text-[11px] font-mono text-slate-400">
              <span>Aman Ali • Portfolio</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
