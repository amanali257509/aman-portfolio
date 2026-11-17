'use client'

import React from 'react'
import { Webhook, Bot, Database, Send, Check } from 'lucide-react'

interface NodeItem {
  id: string
  title: string
  type: string
  subtitle: string
  icon: React.ElementType
  step: string
}

const steps: NodeItem[] = [
  {
    id: 'trigger',
    title: 'Store Webhook',
    type: 'TRIGGER',
    subtitle: 'Shopify order.created payload',
    icon: Webhook,
    step: '01',
  },
  {
    id: 'router',
    title: 'n8n Logic Router',
    type: 'LOGIC',
    subtitle: 'Normalize & format JSON data',
    icon: Database,
    step: '02',
  },
  {
    id: 'ai',
    title: 'OpenAI GPT-4o Agent',
    type: 'AI MODEL',
    subtitle: 'Extract tags & automate response',
    icon: Bot,
    step: '03',
  },
  {
    id: 'action',
    title: 'Sync & Dispatch',
    type: 'ACTION',
    subtitle: 'Atomic database write & notification',
    icon: Send,
    step: '04',
  },
]

export function WorkflowNodesVisual() {
  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 hover:border-[#f59e0b] transition-colors duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1e293b] pb-4 mb-4">
        <div>
          <span className="text-[12px] font-semibold text-[#f59e0b] uppercase tracking-wider block">
            AI Automation Architecture
          </span>
          <span className="text-[14px] font-semibold text-[#f1f5f9]">
            Autonomous n8n Pipeline
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#94a3b8]">Latency:</span>
          <span className="text-[12px] font-semibold text-[#f59e0b]">180ms</span>
        </div>
      </div>

      {/* 4 Steps Stack */}
      <div className="space-y-3">
        {steps.map((node) => {
          const Icon = node.icon
          return (
            <div
              key={node.id}
              className="flex items-center justify-between p-3 rounded-[6px] bg-[#0b0f17] border border-[#1e293b] hover:border-[#f59e0b] transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-[6px] border border-[#1e293b] bg-[#111827] text-[#f59e0b] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#f1f5f9] truncate">
                      {node.title}
                    </span>
                    <span className="text-[10px] text-[#94a3b8] border border-[#1e293b] rounded-[6px] px-1.5 py-0.2 shrink-0">
                      Step {node.step}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#94a3b8] truncate">
                    {node.subtitle}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-[12px] text-[#f59e0b] pl-2">
                <Check className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-[12px] text-[#94a3b8]">
        <span>Format: JSON / REST / Webhook</span>
        <span className="text-[#f59e0b]">Zero-downtime execution</span>
      </div>
    </div>
  )
}
