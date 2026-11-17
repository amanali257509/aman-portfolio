'use client'

import React, { useState } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'
import { personalDetails } from '@/data/content'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'AI Automation & Workflows',
    message: '',
    _gotcha: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        service: 'AI Automation & Workflows',
        message: '',
        _gotcha: '',
      })
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred. Please try emailing directly.'
      )
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-[#1e293b]">
      <div className="max-w-[1275px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Contact info & Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 h-8 px-3 rounded-[6px] border border-[#1e293b] bg-[#111827] text-xs font-normal text-[#f59e0b] mb-4">
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Let&apos;s Build Something</span>
              </div>

              <h2 className="text-[#f1f5f9] mb-4">
                Get In Touch
              </h2>

              <p className="text-[16px] leading-[1.6] text-[#94a3b8] max-w-[65ch] mb-8">
                Whether you need an autonomous AI workflow, a high-converting Shopify store, or a full-stack Next.js web application, I&apos;m ready to help you ship it.
              </p>

              {/* Direct Email Card with One-Click Copy */}
              <div className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 mb-6 hover:border-[#f59e0b] transition-colors duration-200">
                <span className="text-xs uppercase tracking-wider text-[#94a3b8] block mb-2 font-semibold">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalDetails.email}`}
                    className="text-[16px] font-semibold text-[#f1f5f9] hover:text-[#f59e0b] transition-colors duration-200 truncate"
                  >
                    {personalDetails.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    type="button"
                    aria-label="Copy email address"
                    className="shrink-0 inline-flex items-center gap-1.5 h-[36px] px-3 rounded-[6px] text-xs border border-[#1e293b] bg-[#0b0f17] text-[#94a3b8] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors duration-200"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#f59e0b]" strokeWidth={2} />
                        <span className="text-[#f59e0b] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#94a3b8] block font-semibold">
                  Professional Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={personalDetails.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#111827] text-[#f1f5f9] hover:border-[#f59e0b] hover:text-[#f59e0b] text-xs font-semibold transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4 text-[#f59e0b]" strokeWidth={1.75} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalDetails.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#111827] text-[#f1f5f9] hover:border-[#f59e0b] hover:text-[#f59e0b] text-xs font-semibold transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 text-[#f59e0b]" strokeWidth={1.75} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalDetails.links.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#111827] text-[#f1f5f9] hover:border-[#f59e0b] hover:text-[#f59e0b] text-xs font-semibold transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4 text-[#f59e0b]" strokeWidth={1.75} />
                    <span>Fiverr</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="mt-8 pt-6 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 text-xs text-[#f59e0b]">
                <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                <span>{personalDetails.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#111827] border border-[#1e293b] rounded-[6px] p-6 space-y-6">
              <div>
                <h3 className="text-[#f1f5f9] mb-1">
                  Send a Message
                </h3>
                <p className="text-[14px] text-[#94a3b8]">
                  Fill out the brief form below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-[6px] bg-[#0b0f17] border border-[#f59e0b] text-[#f59e0b] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#f59e0b]" strokeWidth={1.75} />
                  <div>
                    <div className="font-semibold text-sm">Message Delivered!</div>
                    <div className="text-xs text-[#94a3b8] mt-1">
                      Thank you for reaching out. I have received your message and will reply promptly.
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-[6px] bg-[#0b0f17] border border-red-500/50 text-red-400 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" strokeWidth={1.75} />
                  <div>
                    <div className="font-semibold text-sm">Delivery Error</div>
                    <div className="text-xs text-red-300 mt-1">{errorMessage}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from screen & readers) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#94a3b8] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] text-sm text-[#f1f5f9] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#f59e0b] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#94a3b8] mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] text-sm text-[#f1f5f9] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#f59e0b] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-2">
                    What can I help you with?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-[44px] px-4 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] text-sm text-[#f1f5f9] focus:outline-none focus:border-[#f59e0b] transition-colors duration-200"
                  >
                    <option value="AI Automation & Workflows">AI Automation &amp; Workflows (n8n, Zapier, OpenAI)</option>
                    <option value="Full Stack Web Application">Full Stack Web Application (Next.js, React)</option>
                    <option value="Custom Shopify or E-commerce">Custom Shopify / Liquid / WooCommerce</option>
                    <option value="Technical SEO & Store Operations">Technical SEO &amp; Performance Tuning</option>
                    <option value="Remote Full-time Role / Contract">Remote Full-Time Role or Long-Term Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-2">
                    Project Details / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your goals, timeline, or current infrastructure..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-[6px] border border-[#1e293b] bg-[#0b0f17] text-sm text-[#f1f5f9] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#f59e0b] transition-colors duration-200 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-[44px] px-6 rounded-[6px] text-[15px] font-semibold bg-[#f59e0b] text-[#0b0f17] hover:bg-[#d97706] transition-colors duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" strokeWidth={1.75} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
