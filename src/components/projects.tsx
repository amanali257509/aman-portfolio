'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'
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
}: {
  project: ProjectItem
  isDuplicate?: boolean
  isMobileTouch?: boolean
}) {
  const hasUrl = Boolean(project.url && project.url.trim().length > 0)

  // Card Content JSX
  const CardContent = (
    <article
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate}
      style={{ '--preview-duration': project.scrollDuration } as React.CSSProperties}
      className={`project-card group/card relative flex flex-col w-full rounded-[18px] border border-line bg-surface overflow-hidden select-none transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 hover:scale-[1.015] hover:border-brass hover:shadow-[0_16px_36px_rgba(201,162,77,0.18)] focus-visible:outline-none focus-visible:-translate-y-1.5 focus-visible:scale-[1.015] focus-visible:border-brass focus-visible:shadow-[0_16px_36px_rgba(201,162,77,0.18)] ${
        hasUrl ? 'cursor-pointer' : 'cursor-default'
      }`}
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
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: project.tint || '#c9a24d' }}
          title={project.category}
        />
      </div>

      {/* 2. Card Body: Aspect ~3:4 preview */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas">
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

          {/* Visit live site link (only when URL exists) */}
          {hasUrl && (
            <span className="text-brass text-[12px] font-medium inline-flex items-center gap-1 mt-2 hover:underline">
              Visit live site
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  )

  if (hasUrl) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isDuplicate ? -1 : undefined}
        aria-hidden={isDuplicate}
        className="block focus:outline-none"
      >
        {CardContent}
      </a>
    )
  }

  return CardContent
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
}: {
  items: ProjectItem[]
  direction: 'up' | 'down'
  columnIndex: number
  isMobileTouch: boolean
  isPaused: boolean
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
          />
        ))}

        {/* Set 2: Duplicate cards for seamless loop */}
        {items.map((project, idx) => (
          <ProjectCard
            key={`dup-${project.id}-${idx}`}
            project={project}
            isDuplicate={true}
            isMobileTouch={isMobileTouch}
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

  const sectionRef = useRef<HTMLElement>(null)

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

  const handleFilterClick = (cat: ProjectCategory) => {
    if (cat === activeCategory) return
    setIsFading(true)
    setTimeout(() => {
      setActiveCategory(cat)
      setIsFading(false)
    }, 200)
  }

  const isPaused = !isSectionVisible || !isTabActive

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
            Websites, e-commerce stores and automated workflows built for businesses worldwide.
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
              />
            ))}
          </div>
        ) : (
          /* Normal: 3-Column Infinite Looping Auto-Scroll */
          <div
            className={`project-fade-mask relative h-[clamp(520px,78vh,760px)] max-[899px]:h-[clamp(480px,70vh,640px)] w-full overflow-hidden transition-all duration-200 ${
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
              />

              {/* Column 2: Scrolls DOWN */}
              <ScrollingColumn
                items={col2}
                direction="down"
                columnIndex={1}
                isMobileTouch={isMobileTouch}
                isPaused={isPaused}
              />

              {/* Column 3: Scrolls UP (hidden on mobile <=640px) */}
              <ScrollingColumn
                items={col3}
                direction="up"
                columnIndex={2}
                isMobileTouch={isMobileTouch}
                isPaused={isPaused}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
