'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
} from 'lucide-react'
import {
  allProjects,
  filterCategories,
  column1Ids,
  column2Ids,
  column3Ids,
  ProjectCategory,
  ProjectItem,
} from '@/data/projects'
import { Reveal } from './reveal'

/**
 * Global Scroll Speed (pixels per second).
 * Easily adjust speed globally here.
 */
export const SCROLL_SPEED = 35

const COLUMN_FACTORS = [1.0, 1.15, 1.3]

/**
 * Single Project Card Component
 */
function ProjectCard({
  project,
  isDuplicate = false,
  isMobileTouch = false,
  onOpenModal,
}: {
  project: ProjectItem
  isDuplicate?: boolean
  isMobileTouch?: boolean
  onOpenModal: (project: ProjectItem) => void
}) {
  const hasUrl = Boolean(project.url && project.url.trim().length > 0)

  return (
    <article
      role="button"
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate}
      aria-label={`View ${project.title} full project`}
      onClick={() => onOpenModal(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenModal(project)
        }
      }}
      style={{ '--preview-duration': project.scrollDuration } as React.CSSProperties}
      className="project-card group/card relative flex flex-col w-full rounded-[18px] border border-line bg-surface overflow-hidden select-none cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 hover:scale-[1.015] hover:border-brass hover:shadow-[0_16px_36px_rgba(201,162,77,0.18)] focus-visible:outline-none focus-visible:-translate-y-1.5 focus-visible:scale-[1.015] focus-visible:border-brass focus-visible:shadow-[0_16px_36px_rgba(201,162,77,0.18)] text-left"
    >
      {/* 1. Browser-bar header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-line/70 bg-[#121813]/90">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]/80" />
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]/80" />
          <span className="w-2 h-2 rounded-full bg-[#10b981]/80" />
          <span className="ml-2 text-[11px] font-mono text-muted/75 truncate max-w-[170px] hidden sm:inline">
            {project.domain}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted/60 opacity-0 group-hover/card:opacity-100 transition-opacity hidden sm:inline">
            Click to view
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.tint || '#c9a24d' }}
            title={project.category}
          />
        </div>
      </div>

      {/* 2. Card Body: Taller preview so at least half of the page is visible */}
      <div className="relative aspect-[3/4.6] w-full overflow-hidden bg-canvas">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="project-card-image absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          />
        )}

        {/* Floating Zoom Badge on Card Hover */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#0f1410]/85 backdrop-blur-md border border-line/80 text-[11px] font-mono text-ink opacity-0 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 transition-all duration-200 flex items-center gap-1.5 pointer-events-none shadow-lg">
          <Maximize2 className="w-3 h-3 text-brass" />
          <span>Full preview</span>
        </div>

        {/* 3. Info Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3.5 sm:p-4 md:p-5 bg-gradient-to-t from-[#0f1410]/95 via-[#0f1410]/85 to-transparent transition-all duration-300 ease-out ${
            isMobileTouch
              ? 'opacity-100 translate-y-0'
              : 'opacity-100 sm:opacity-0 sm:translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 group-focus-visible/card:opacity-100 group-focus-visible/card:translate-y-0'
          }`}
        >
          {/* Category Tag */}
          <span className="text-[10.5px] sm:text-[11px] font-semibold text-brass uppercase tracking-wider font-mono block">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-[14px] sm:text-[16px] font-heading font-semibold text-ink leading-tight line-clamp-1 mt-0.5">
            {project.title}
          </h3>

          {/* Description (hidden on mobile <=640px) */}
          <p className="text-[12px] sm:text-[13px] text-muted leading-snug line-clamp-1 mt-1 hidden sm:block">
            {project.description}
          </p>

          {/* Actions line */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-brass text-[12px] font-medium inline-flex items-center gap-1">
              View full page
              <Maximize2 className="w-3 h-3" />
            </span>

            {/* Direct Visit live site link if URL exists */}
            {hasUrl && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted hover:text-ink text-[12px] font-medium inline-flex items-center gap-1 ml-auto hover:underline z-20"
              >
                Live site
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Vertical Scrolling Column Component
 */
function ScrollingColumn({
  items,
  direction,
  columnIndex,
  isMobileTouch,
  isPaused,
  onOpenModal,
}: {
  items: ProjectItem[]
  direction: 'up' | 'down'
  columnIndex: number
  isMobileTouch: boolean
  isPaused: boolean
  onOpenModal: (project: ProjectItem) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollDuration, setScrollDuration] = useState('50s')

  // Calculate duration based on actual track height and global SCROLL_SPEED
  useEffect(() => {
    if (!trackRef.current) return
    const factor = COLUMN_FACTORS[columnIndex % COLUMN_FACTORS.length] || 1.0

    // Measure single track height (half of total scrollHeight because items are duplicated)
    const singleHeight = trackRef.current.scrollHeight / 2 || items.length * 420
    const calculatedDuration = Math.round((singleHeight / SCROLL_SPEED) * factor)

    setScrollDuration(`${Math.max(calculatedDuration, 20)}s`)
  }, [items, columnIndex])

  const animationClass = direction === 'up' ? 'project-scroll-up' : 'project-scroll-down'

  return (
    <div
      className={`column-group relative flex-1 min-w-0 h-full overflow-hidden ${
        columnIndex === 2 ? 'hidden min-[641px]:flex flex-col' : 'flex flex-col'
      }`}
    >
      <div
        ref={trackRef}
        style={{ '--scroll-duration': scrollDuration } as React.CSSProperties}
        className={`project-track flex flex-col gap-3.5 sm:gap-4 md:gap-5 will-change-transform ${animationClass} ${
          isPaused ? 'paused-track' : ''
        }`}
      >
        {/* Set 1: Primary interactive cards */}
        {items.map((project, idx) => (
          <ProjectCard
            key={`orig-${project.id}-${idx}`}
            project={project}
            isDuplicate={false}
            isMobileTouch={isMobileTouch}
            onOpenModal={onOpenModal}
          />
        ))}

        {/* Set 2: Duplicate cards for seamless loop */}
        {items.map((project, idx) => (
          <ProjectCard
            key={`dup-${project.id}-${idx}`}
            project={project}
            isDuplicate={true}
            isMobileTouch={isMobileTouch}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Main Projects Section
 */
export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All')
  const [isFading, setIsFading] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(true)
  const [isTabActive, setIsTabActive] = useState(true)
  const [isMobileTouch, setIsMobileTouch] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const modalScrollRef = useRef<HTMLDivElement>(null)

  // Detect Touch / Reduced Motion
  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsMobileTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  // Visibility and Tab Activity
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
    }
  }, [])

  // Filter column items
  const { col1, col2, col3 } = useMemo(() => {
    if (activeCategory === 'All') {
      // Use exact explicit column order
      const c1 = column1Ids
        .map((id) => allProjects.find((p) => p.id === id))
        .filter(Boolean) as ProjectItem[]
      const c2 = column2Ids
        .map((id) => allProjects.find((p) => p.id === id))
        .filter(Boolean) as ProjectItem[]
      const c3 = column3Ids
        .map((id) => allProjects.find((p) => p.id === id))
        .filter(Boolean) as ProjectItem[]
      return { col1: c1, col2: c2, col3: c3 }
    }

    // Filter projects by category
    let filtered = allProjects.filter((p) => p.category === activeCategory)

    // If fewer than 6 items, repeat to keep columns full
    if (filtered.length > 0 && filtered.length < 6) {
      const base = [...filtered]
      while (filtered.length < 6) {
        filtered = [...filtered, ...base]
      }
    }

    // Distribute round-robin across 3 columns
    const c1: ProjectItem[] = []
    const c2: ProjectItem[] = []
    const c3: ProjectItem[] = []

    filtered.forEach((item, index) => {
      const colIndex = index % 3
      if (colIndex === 0) c1.push(item)
      else if (colIndex === 1) c2.push(item)
      else c3.push(item)
    })

    return { col1: c1, col2: c2, col3: c3 }
  }, [activeCategory])

  // Active project list for modal navigation
  const activeProjectList = useMemo(() => {
    if (activeCategory === 'All') return allProjects
    const filtered = allProjects.filter((p) => p.category === activeCategory)
    return filtered.length > 0 ? filtered : allProjects
  }, [activeCategory])

  const navigateProject = useCallback(
    (dir: 'prev' | 'next') => {
      if (!activeProject) return
      const list = activeProjectList
      const idx = list.findIndex((p) => p.id === activeProject.id)
      if (idx === -1) {
        const allIdx = allProjects.findIndex((p) => p.id === activeProject.id)
        if (allIdx === -1) return
        const nextIdx =
          dir === 'next'
            ? (allIdx + 1) % allProjects.length
            : (allIdx - 1 + allProjects.length) % allProjects.length
        setActiveProject(allProjects[nextIdx])
      } else {
        const nextIdx =
          dir === 'next' ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length
        setActiveProject(list[nextIdx])
      }

      // Reset scroll position to top when navigating
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0
      }
    },
    [activeProject, activeProjectList]
  )

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!activeProject) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateProject('prev')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigateProject('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject, navigateProject])

  const handleFilterClick = (cat: ProjectCategory) => {
    if (cat === activeCategory) return
    setIsFading(true)
    setTimeout(() => {
      setActiveCategory(cat)
      setIsFading(false)
    }, 200)
  }

  // Pause track when section is offscreen, tab hidden, or lightbox modal is open
  const isPaused = !isSectionVisible || !isTabActive || Boolean(activeProject)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 lg:py-28 border-t border-line bg-transparent text-ink overflow-hidden"
      aria-labelledby="projects-title"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal direction="up" className="mb-8">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2 font-mono">
            Selected Work
          </span>
          <h2 id="projects-title" className="text-ink">
            All projects
          </h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Websites, e-commerce stores and automated workflows built for businesses worldwide. Click any project to inspect full design.
          </p>
        </Reveal>

        {/* Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter projects by technology"
          className="mb-8 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0"
        >
          <div className="flex items-center gap-2.5 min-w-max">
            {filterCategories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => handleFilterClick(category)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 snap-start focus-visible:outline-2 focus-visible:outline-brass ${
                    isActive
                      ? 'bg-brass text-canvas border border-brass font-semibold shadow-[0_2px_12px_rgba(201,162,77,0.25)]'
                      : 'bg-surface/70 text-muted border border-line hover:text-ink hover:border-line/90'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrolling Window or Reduced Motion Static Grid */}
        {prefersReducedMotion ? (
          /* Reduced Motion: Static Clean Grid */
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-200 ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {[...col1, ...col2, ...col3].map((project, idx) => (
              <ProjectCard
                key={`static-${project.id}-${idx}`}
                project={project}
                isDuplicate={false}
                isMobileTouch={isMobileTouch}
                onOpenModal={setActiveProject}
              />
            ))}
          </div>
        ) : (
          /* Normal: 3-Column Infinite Looping Auto-Scroll */
          <div
            className={`project-fade-mask relative h-[clamp(650px,88vh,940px)] max-[899px]:h-[clamp(560px,80vh,780px)] w-full overflow-hidden transition-all duration-200 ${
              isFading ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            <div className="grid grid-cols-2 min-[641px]:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 h-full">
              {/* Column 1: Scrolls UP */}
              <ScrollingColumn
                items={col1}
                direction="up"
                columnIndex={0}
                isMobileTouch={isMobileTouch}
                isPaused={isPaused}
                onOpenModal={setActiveProject}
              />

              {/* Column 2: Scrolls DOWN */}
              <ScrollingColumn
                items={col2}
                direction="down"
                columnIndex={1}
                isMobileTouch={isMobileTouch}
                isPaused={isPaused}
                onOpenModal={setActiveProject}
              />

              {/* Column 3: Scrolls UP (hidden on mobile <=640px) */}
              <ScrollingColumn
                items={col3}
                direction="up"
                columnIndex={2}
                isMobileTouch={isMobileTouch}
                isPaused={isPaused}
                onOpenModal={setActiveProject}
              />
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} project preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-[20px] border border-line bg-surface shadow-[0_25px_65px_rgba(0,0,0,0.85)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Modal Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-line bg-[#121813]/95 gap-3 flex-shrink-0">
              {/* Left: Window controls + Project Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                </div>
                <div className="h-4 w-[1px] bg-line hidden sm:block" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brass/10 border border-brass/30 text-brass font-semibold uppercase tracking-wider">
                      {activeProject.category}
                    </span>
                    <h3 className="text-[15px] sm:text-[17px] font-heading font-semibold text-ink truncate">
                      {activeProject.title}
                    </h3>
                  </div>
                  {activeProject.domain && (
                    <p className="text-[11.5px] font-mono text-muted truncate mt-0.5">
                      {activeProject.domain}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-brass text-canvas hover:bg-brass-hover transition-colors shadow-sm"
                  >
                    <span>Visit live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={activeProject.origImage || activeProject.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open high-resolution image in new tab"
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-muted hover:text-ink hover:bg-canvas/50 border border-line transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open HD</span>
                </a>

                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close modal"
                  className="p-1.5 sm:p-2 rounded-lg text-muted hover:text-ink hover:bg-canvas/60 border border-line transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Body: Full Image / Video */}
            <div
              ref={modalScrollRef}
              className="relative flex-1 w-full overflow-y-auto overflow-x-hidden bg-[#0a0d0b] p-3 sm:p-6 select-text scrollbar-thin scrollbar-thumb-line scrollbar-track-transparent"
            >
              {/* Helper hint banner for tall mockups */}
              <div className="flex items-center justify-between text-[11px] font-mono text-muted/80 pb-3 border-b border-line/40 mb-4 px-1">
                <span>Full design preview • Scroll down to view entire page</span>
                <span className="hidden sm:inline">Use ← → keys to navigate • ESC to close</span>
              </div>

              {activeProject.video ? (
                <div className="flex justify-center items-center py-4">
                  <video
                    src={activeProject.video}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="max-h-[75vh] w-auto max-w-full rounded-xl border border-line shadow-2xl"
                  />
                </div>
              ) : (
                <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeProject.origImage || activeProject.image}
                    alt={`${activeProject.title} full webpage screenshot`}
                    className="w-full h-auto rounded-xl border border-line/80 shadow-[0_15px_40px_rgba(0,0,0,0.7)] block"
                    loading="eager"
                  />
                </div>
              )}

              {/* Project Description footer */}
              <div className="max-w-4xl mx-auto mt-6 p-4 rounded-xl border border-line bg-[#121813]/80">
                <p className="text-[13px] sm:text-[14px] text-muted leading-relaxed">
                  <span className="text-ink font-medium">About this project: </span>
                  {activeProject.description}
                </p>
              </div>
            </div>

            {/* 3. Navigation Chevrons: Floating Prev / Next on Desktop */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                navigateProject('prev')
              }}
              aria-label="Previous project"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-canvas/80 hover:bg-brass hover:text-canvas text-ink border border-line/80 backdrop-blur-md shadow-xl transition-all duration-200 hidden md:flex items-center justify-center hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                navigateProject('next')
              }}
              aria-label="Next project"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-canvas/80 hover:bg-brass hover:text-canvas text-ink border border-line/80 backdrop-blur-md shadow-xl transition-all duration-200 hidden md:flex items-center justify-center hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
