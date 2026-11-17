'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  Search,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
  ExternalLink,
  X,
  Command,
} from 'lucide-react'
import { personalDetails } from '@/data/content'

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
      title: 'Contact',
      subtitle: 'Send message or copy direct email',
      category: 'Navigation',
      icon: Mail,
      action: () => navigateTo('contact'),
    },
    {
      id: 'act-email',
      title: 'Send Email Directly',
      subtitle: personalDetails.email,
      category: 'Actions',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${personalDetails.email}`
        setOpen(false)
      },
    },
    {
      id: 'soc-github',
      title: 'GitHub Profile',
      subtitle: 'View repositories and contributions',
      category: 'Social',
      icon: Github,
      action: () => {
        window.open(personalDetails.links.github, '_blank')
        setOpen(false)
      },
    },
    {
      id: 'soc-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'Connect professionally',
      category: 'Social',
      icon: Linkedin,
      action: () => {
        window.open(personalDetails.links.linkedin, '_blank')
        setOpen(false)
      },
    },
    {
      id: 'soc-fiverr',
      title: 'Fiverr Pro Profile',
      subtitle: 'Top-rated custom order packages',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        window.open(personalDetails.links.fiverr, '_blank')
        setOpen(false)
      },
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Open command palette"
        className="hidden md:flex items-center gap-2 h-8 px-3 rounded-[6px] border border-[#1e293b] bg-[#111827] text-xs text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
      >
        <Search className="w-3.5 h-3.5" strokeWidth={1.75} />
        <span>Quick search...</span>
        <kbd className="inline-flex items-center gap-0.5 rounded-[6px] bg-[#0b0f17] px-1.5 py-0.5 text-[10px] text-[#94a3b8] border border-[#1e293b]">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-[6px] border border-[#1e293b] bg-[#111827] text-[#f1f5f9] transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-[#1e293b] px-4 py-3">
              <Search className="w-4 h-4 text-[#94a3b8]" strokeWidth={1.75} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or jump to section..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-[#f1f5f9] placeholder-[#94a3b8]/60 focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="p-1 rounded-[6px] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#94a3b8]">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      type="button"
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[6px] text-left hover:bg-[#0b0f17] transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] flex items-center justify-center text-[#94a3b8] group-hover:text-[#f59e0b] group-hover:border-[#f59e0b] shrink-0 transition-colors">
                          <Icon className="w-4 h-4" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#f1f5f9] truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#94a3b8] truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#94a3b8] border border-[#1e293b] rounded-[6px] px-1.5 py-0.5 bg-[#0b0f17]">
                        {item.category}
                      </span>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#1e293b] bg-[#0b0f17] px-4 py-2 text-[11px] text-[#94a3b8]">
              <span>Use arrows or mouse to navigate</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
