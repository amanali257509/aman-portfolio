'use client'

import React, { useState } from 'react'
import { Webhook, Bot, Database, Send, Zap, CheckCircle2, ArrowRight, ArrowDown } from 'lucide-react'

interface NodeItem {
  id: string
  title: string
  category: string
  subtitle: string
  icon: React.ElementType
  status: string
  step: string
  lightBg: string
  lightBorder: string
  lightText: string
  darkBg: string
  darkBorder: string
  darkText: string
}

const workflowNodes: NodeItem[] = [
  {
    id: 'trigger',
    title: 'Store Webhook',
    category: 'TRIGGER',
    subtitle: 'Shopify order.created',
    icon: Webhook,
    status: 'Event Fired',
    step: '01',
    lightBg: 'bg-emerald-50 text-emerald-700',
    lightBorder: 'border-emerald-300/80',
    lightText: 'text-emerald-700',
    darkBg: 'dark:bg-emerald-500/15 dark:text-emerald-400',
    darkBorder: 'dark:border-emerald-500/30',
    darkText: 'dark:text-emerald-400',
  },
  {
    id: 'logic',
    title: 'n8n Router',
    category: 'ROUTER',
    subtitle: 'Filter & format payload',
    icon: Database,
    status: 'Normalized',
    step: '02',
    lightBg: 'bg-blue-50 text-blue-700',
    lightBorder: 'border-blue-300/80',
    lightText: 'text-blue-700',
    darkBg: 'dark:bg-blue-500/15 dark:text-cyan-400',
    darkBorder: 'dark:border-cyan-500/30',
    darkText: 'dark:text-cyan-400',
  },
  {
    id: 'ai',
    title: 'OpenAI Agent',
    category: 'INTELLIGENCE',
    subtitle: 'Analyze & categorize',
    icon: Bot,
    status: 'Processed',
    step: '03',
    lightBg: 'bg-amber-50 text-amber-800',
    lightBorder: 'border-amber-300/80',
    lightText: 'text-amber-800',
    darkBg: 'dark:bg-gold-500/20 dark:text-gold-400',
    darkBorder: 'dark:border-gold-500/40',
    darkText: 'dark:text-gold-400',
  },
  {
    id: 'action',
    title: 'Sync & Dispatch',
    category: 'ACTION',
    subtitle: 'MySQL DB & Slack alert',
    icon: Send,
    status: 'Completed',
    step: '04',
    lightBg: 'bg-purple-50 text-purple-700',
    lightBorder: 'border-purple-300/80',
    lightText: 'text-purple-700',
    darkBg: 'dark:bg-purple-500/15 dark:text-purple-400',
    darkBorder: 'dark:border-purple-500/30',
    darkText: 'dark:text-purple-400',
  },
]

export function WorkflowNodesVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-navy-900/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl dark:shadow-2xl transition-colors">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3 mb-5">
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
            <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              workflow: ecommerce-ai-pipeline.n8n
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Engine
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-500 dark:text-slate-400">
            180ms
          </span>
        </div>
      </div>

      {/* Node Grid Layout (2x2 Connected Architecture) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
        {workflowNodes.map((node, index) => {
          const Icon = node.icon
          const isHovered = activeNode === node.id

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative rounded-xl border p-3.5 sm:p-4 transition-all duration-200 cursor-pointer ${
                node.lightBorder
              } ${node.darkBorder} ${
                isHovered
                  ? 'bg-white dark:bg-navy-950 scale-[1.02] shadow-md ring-2 ring-gold-500/40'
                  : 'bg-slate-50/80 dark:bg-navy-950/70 hover:bg-white dark:hover:bg-navy-950'
              }`}
            >
              {/* Node Card Header */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  {node.category} • Step {node.step}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium ${node.lightText} ${node.darkText}`}
                >
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  {node.status}
                </span>
              </div>

              {/* Node Body: Icon + Title + Subtitle */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${node.lightBg} ${node.lightBorder} ${node.darkBg} ${node.darkBorder}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading text-sm font-bold text-slate-900 dark:text-white truncate">
                    {node.title}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans truncate">
                    {node.subtitle}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Live Stream Terminal Ticker */}
      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-slate-500 dark:text-slate-400">&gt;</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">
            Payload: JSON • REST • OpenAI • Sync 100%
          </span>
        </div>
        <span className="text-gold-600 dark:text-gold-400 font-semibold shrink-0">
          Autonomous 24/7
        </span>
      </div>
    </div>
  )
}
