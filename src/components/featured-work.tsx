'use client'

import React from 'react'
import {
  ExternalLink,
  Github,
  Bot,
  Check,
} from 'lucide-react'
import { getActiveProjects } from '@/data/content'

export function FeaturedWork() {
  const activeProjects = getActiveProjects()

  // STRICT HONESTY RULE:
  // Automatically hide section if only placeholders exist
  if (activeProjects.length === 0) {
    return null
  }

  return (
    <section id="work" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
            Case Studies
          </span>
          <h2 className="text-[#f1f5f9]">Featured Work</h2>
          <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch]">
            Real systems engineered for production, measured by concrete business impact.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-[6px] bg-[#0b0f17] text-[#f59e0b] border border-[#1e293b] font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code"
                        className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
                      >
                        <Github className="w-4 h-4" strokeWidth={1.75} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live project"
                        className="h-8 w-8 rounded-[6px] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b] transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-[#f1f5f9] mb-3">
                  {project.title}
                </h3>

                {/* Problem & Built */}
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#f59e0b] block mb-1">
                      Problem:
                    </span>
                    <p className="text-[15px] leading-[1.6] text-[#94a3b8]">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#f59e0b] block mb-1">
                      What I Built:
                    </span>
                    <p className="text-[15px] leading-[1.6] text-[#94a3b8]">{project.whatBuilt}</p>
                  </div>
                </div>

                {/* Workflow Diagram Card Layout if Automation */}
                {project.isWorkflow && project.workflowSteps && (
                  <div className="mb-6 p-4 rounded-[6px] border border-[#1e293b] bg-[#0b0f17]">
                    <div className="text-xs font-semibold text-[#94a3b8] mb-3 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#f59e0b]" strokeWidth={1.75} />
                      <span>Automation Node Pipeline:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {project.workflowSteps.map((step) => (
                        <div
                          key={step.id}
                          className="p-2 rounded-[6px] border border-[#1e293b] bg-[#111827] text-center"
                        >
                          <span className="block text-[10px] font-semibold text-[#f59e0b]">
                            {step.badge}
                          </span>
                          <span className="block text-xs font-semibold text-[#f1f5f9] truncate">
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result */}
                {project.result && !project.result.includes('[ADD') && (
                  <div className="mb-6 p-3 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] text-[#f59e0b] text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-[#f59e0b]" strokeWidth={2} />
                    <span>{project.result}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-[#1e293b] mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-[6px] text-xs bg-[#0b0f17] text-[#94a3b8] border border-[#1e293b]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
