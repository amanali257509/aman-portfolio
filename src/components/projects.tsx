'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink, Layers, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project, ProjectCategory } from '@/lib/projects'

type FilterCategory = 'All' | ProjectCategory

const categories: FilterCategory[] = [
  'All',
  'WordPress',
  'Shopify',
  'Webflow',
  'Wix',
  'AI Automation',
]

function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="group bg-[#111827] border border-[#1e293b] rounded-[6px] overflow-hidden hover:border-[#f59e0b] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Screenshot Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#0b0f17] border-b border-[#1e293b]">
          {!imageError && project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} - ${project.category} project by Aman Ali`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#94a3b8] p-4 text-center bg-gradient-to-br from-[#111827] to-[#0b0f17]">
              <Layers className="w-8 h-8 text-[#f59e0b] mb-2 opacity-80" />
              <span className="text-xs font-semibold text-[#f1f5f9]">{project.title}</span>
              <span className="text-[11px] text-[#94a3b8] mt-0.5">{project.category} Showcase</span>
            </div>
          )}

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-[6px] text-xs font-semibold bg-[#0b0f17]/90 text-[#f59e0b] border border-[#1e293b] backdrop-blur-sm shadow-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[#f1f5f9] text-[17px] font-semibold leading-snug group-hover:text-[#f59e0b] transition-colors">
              {project.title}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live site for ${project.title}`}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[6px] bg-[#f59e0b] text-[#0b0f17] text-xs font-semibold hover:bg-[#d97706] transition-colors shrink-0"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" strokeWidth={2} />
              </a>
            )}
          </div>

          {/* 2-line description */}
          <p className="text-[14px] leading-[1.6] text-[#94a3b8] line-clamp-2">
            {project.description}
          </p>

          {/* Highlighted Result Line */}
          <div className="p-2.5 rounded-[6px] bg-[#0b0f17] border border-[#f59e0b]/30 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-[#f59e0b] mr-1.5 uppercase tracking-wider text-[11px]">
                Result:
              </span>
              <span className="text-[#f1f5f9] font-medium leading-relaxed">
                {project.result}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Tags Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-[#1e293b]/60 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-normal bg-[#0b0f17] text-[#94a3b8] border border-[#1e293b]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

  // Listen for category filter events triggered from Hero expertise cards or URL
  useEffect(() => {
    const handleCustomFilter = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (
        detail &&
        ['All', 'WordPress', 'Shopify', 'Webflow', 'Wix', 'AI Automation'].includes(detail)
      ) {
        setActiveCategory(detail as FilterCategory)
      }
    }

    window.addEventListener('filter-projects', handleCustomFilter)
    return () => window.removeEventListener('filter-projects', handleCustomFilter)
  }, [])

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Portfolio Showcase
          </span>
          <h2 className="text-[#f1f5f9]">Featured Projects</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Real client systems engineered for high performance, custom ACF architecture, streamlined Shopify conversions, and autonomous AI automation.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="flex flex-wrap gap-2 mb-10 pb-1 overflow-x-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`h-[38px] px-4 rounded-[6px] text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] ${
                activeCategory === cat
                  ? 'bg-[#f59e0b] text-[#0b0f17] shadow-sm font-bold'
                  : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:border-[#f59e0b] hover:text-[#f1f5f9]'
              }`}
            >
              {cat}
              {cat === 'All' ? ` (${projects.length})` : ` (${projects.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center border border-[#1e293b] rounded-[6px] bg-[#111827]">
            <p className="text-[#94a3b8] text-sm">
              No projects listed in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
