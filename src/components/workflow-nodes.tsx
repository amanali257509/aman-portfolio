'use client'

import React, { useState } from 'react'
import { Webhook, Bot, Database, Send, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

interface NodeItem {
  id: string
  title: string
  type: string
  icon: React.ElementType
  status: string
  color: string
  textColor: string
  borderColor: string
}

const nodes: NodeItem[] = [
  {
    id: 'trigger',
    title: 'Store Webhook',
    type: 'TRIGGER',
    icon: Webhook,
    status: 'Event Fired',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'ai-agent',
    title: 'OpenAI Agent',
    type: 'INTELLIGENCE',
    icon: Bot,
    status: 'Auto-Classify',
    color: 'from-gold-500/25 to-amber-600/20',
    textColor: 'text-gold-400',
    borderColor: 'border-gold-500/40',
  },
  {
    id: 'database',
    title: 'Custom DB Sync',
    type: 'ROUTING',
    icon: Database,
    status: 'Atomic Write',
    color: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 'destination',
    title: 'Dispatch & Alert',
    type: 'ACTION',
    icon: Send,
    status: 'Completed',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
  },
]

export function WorkflowNodesVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 dark:border-white/10 border-slate-200/80 bg-navy-900/60 dark:bg-navy-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Workflow Orchestration
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-400">
              Autonomous n8n + OpenAI Pipeline
            </p>
          </div>
        </div>
        <div className="font-mono text-xs text-slate-400">
          Latency: <span className="text-gold-400 font-medium">180ms</span>
        </div>
      </div>

      {/* Desktop / Tablet Flow Layout */}
      <div className="relative hidden md:grid md:grid-cols-4 md:gap-4 items-center">
        {/* SVG animated connector lines running across nodes */}
        <div className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 px-8">
          <svg className="w-full h-8" preserveAspectRatio="none">
            <line
              x1="12%"
              y1="50%"
              x2="88%"
              y2="50%"
              stroke="rgba(245, 183, 77, 0.2)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-flow-line"
            />
          </svg>
        </div>

        {nodes.map((node, index) => {
          const Icon = node.icon
          const isHovered = activeNode === node.id

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative z-10 flex flex-col rounded-xl border bg-navy-950/90 p-4 transition-all duration-300 ${
                node.borderColor
              } ${
                isHovered
                  ? 'scale-105 shadow-lg shadow-gold-500/10 ring-1 ring-gold-500/40'
                  : 'hover:border-gold-500/40'
              }`}
            >
              {/* Node status badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-wider text-slate-400">
                  {node.type}
                </span>
                <span className={`flex items-center gap-1 font-mono text-[10px] ${node.textColor}`}>
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  {node.status}
                </span>
              </div>

              {/* Icon and Title */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${node.color} ${node.textColor} border ${node.borderColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading text-sm font-semibold text-white truncate">
                    {node.title}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    Step 0{index + 1}
                  </div>
                </div>
              </div>

              {/* Connector dot */}
              {index < nodes.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 shadow-md">
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Flow Layout (Vertical Stack) */}
      <div className="flex flex-col gap-3 md:hidden">
        {nodes.map((node, index) => {
          const Icon = node.icon
          return (
            <div key={node.id} className="relative">
              <div
                className={`flex items-center justify-between rounded-xl border bg-navy-950/90 p-3.5 ${node.borderColor}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${node.color} ${node.textColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-medium text-white">
                      {node.title}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      {node.type} • Step 0{index + 1}
                    </div>
                  </div>
                </div>
                <span className={`font-mono text-xs ${node.textColor} flex items-center gap-1`}>
                  <CheckCircle2 className="w-3 h-3" />
                  {node.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom status note */}
      <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5 pt-3">
        <span>Payload: JSON / REST / Webhook</span>
        <span className="text-gold-400">Zero-downtime execution</span>
      </div>
    </div>
  )
}
