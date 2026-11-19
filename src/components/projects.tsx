'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { projects, ProjectItem } from '@/data/projects'
import { LoopVideo } from './loop-video'
import { MediaPlaceholder } from './media-placeholder'
import { Reveal } from './reveal'

const filterCategories = [
  'All',
  'WordPress',
  'Shopify',
  'Webflow',
  'Wix',
  'AI Automation',
]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [isFading, setIsFading] = useState(false)
  const [displayedProjects, setDisplayedProjects] = useState<ProjectItem[]>(projects)

  const handleFilterChange = (category: string) => {
    if (category === activeCategory) return
    setIsFading(true)
    setTimeout(() => {
      setActiveCategory(category)
      if (category === 'All') {
        setDisplayedProjects(projects)
      } else {
        setDisplayedProjects(projects.filter((p) => p.category === category))
      }
      setIsFading(false)
    }, 250)
  }

  return (
    <section id="projects" className="py-20 lg:py-30 border-t border-line" aria-labelledby="projects-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal direction="up" className="mb-10">
          <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
            Projects
          </span>
          <h2 id="projects-title">All projects</h2>
          <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
            Selected client work. Live links are added where the sites are public.
          </p>
        </Reveal>

        {/* Filter Row */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex items-center gap-6 min-w-max border-b border-line pb-3">
            {filterCategories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleFilterChange(category)}
                  className={`text-[14px] font-normal transition-colors pb-1 relative snap-start focus-visible:outline-2 focus-visible:outline-brass ${
                    isActive
                      ? 'text-brass font-medium after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-[2px] after:bg-brass'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-250 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {displayedProjects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <Reveal
                key={project.slug}
                direction={isEven ? 'left' : 'right'}
                staggerIndex={index}
              >
                <article className="group bg-surface border border-line rounded-[8px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brass hover:-translate-y-1">
                  <div>
                    {/* Media container on top (16/10 aspect ratio) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas border-b border-line">
                      {project.media.type === 'video' ? (
                        <LoopVideo
                          src={project.media.src}
                          poster={project.media.poster}
                          title={project.title}
                          aspectRatio="aspect-[16/10]"
                        />
                      ) : (
                        <ProjectImageMedia project={project} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-brass text-[13px] font-medium block mb-1.5">
                        {project.category}
                      </span>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brass transition-colors inline-block"
                        >
                          <h3 className="text-ink">
                            {project.title}
                          </h3>
                        </a>
                      ) : (
                        <h3 className="text-ink">
                          {project.title}
                        </h3>
                      )}

                      <p className="mt-2.5 text-[14px] leading-relaxed text-muted line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-line text-[13px] text-muted leading-relaxed">
                        {project.stack.join(' · ')}
                      </div>
                    </div>
                  </div>

                  {/* Live link footer */}
                  {project.liveUrl && (
                    <div className="px-6 pb-6 pt-0">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[14px] text-brass hover:text-brass-hover font-medium link-underline"
                      >
                        <span>Visit live site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectImageMedia({ project }: { project: ProjectItem }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return <MediaPlaceholder label={`${project.title} preview`} aspectRatio="aspect-[16/10]" />
  }

  return (
    <Image
      src={project.media.src}
      alt={project.title}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      onError={() => setImageError(true)}
      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
    />
  )
}
