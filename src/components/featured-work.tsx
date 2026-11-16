'use client'

import React from 'react'
import {
  ExternalLink,
  Github,
  ArrowRight,
  Layers,
  Sparkles,
  Bot,
  CheckCircle2,
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
    <section id="work" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Case Studies &amp; Systems</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Work
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Real systems engineered for production, measured by concrete business impact.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-7 sm:p-8 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 shadow-md"
            >
              <div>
                {/* Header: Category & Links */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-500 dark:text-gold-400 border border-gold-500/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live project"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-gold-500 dark:group-hover:text-gold-300 transition-colors">
                  {project.title}
                </h3>

                {/* Problem & Solution */}
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                      Problem:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">{project.problem}</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                      What I Built:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">{project.whatBuilt}</p>
                  </div>
                </div>

                {/* Workflow Diagram Card Layout if Automation */}
                {project.isWorkflow && project.workflowSteps && (
                  <div className="mb-6 p-4 rounded-xl border border-white/5 bg-navy-950/80">
                    <div className="font-mono text-[11px] text-slate-400 mb-2 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-gold-400" />
                      <span>Automation Node Pipeline:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {project.workflowSteps.map((step, idx) => (
                        <div
                          key={step.id}
                          className="p-2 rounded-lg border border-white/10 bg-white/5 text-center"
                        >
                          <span className="block font-mono text-[9px] text-gold-400">
                            {step.badge}
                          </span>
                          <span className="block text-xs font-medium text-white truncate">
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result (Only if real) */}
                {project.result && !project.result.includes('[ADD') && (
                  <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{project.result}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
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
