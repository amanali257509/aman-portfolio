'use client'

import React, { useState } from 'react'
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
  Sparkles,
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
    <section id="contact" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact info & Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-xs font-mono mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Let&apos;s Build Something</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Get In Touch
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Whether you need an autonomous AI workflow, a high-converting Shopify store, or a full-stack Next.js web application, I&apos;m ready to help you ship it.
              </p>

              {/* Direct Email Card with One-Click Copy */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 backdrop-blur-md p-5 mb-6 shadow-sm">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalDetails.email}`}
                    className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors truncate"
                  >
                    {personalDetails.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    type="button"
                    aria-label="Copy email address"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-gold-400 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                  Professional Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={personalDetails.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 hover:border-gold-500/40 text-slate-800 dark:text-slate-200 hover:text-gold-400 transition-all text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4 text-gold-500" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalDetails.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 hover:border-gold-500/40 text-slate-800 dark:text-slate-200 hover:text-gold-400 transition-all text-xs font-medium"
                  >
                    <Github className="w-4 h-4 text-gold-500" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalDetails.links.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-navy-900/60 hover:border-gold-500/40 text-slate-800 dark:text-slate-200 hover:text-gold-400 transition-all text-xs font-medium"
                  >
                    <ExternalLink className="w-4 h-4 text-gold-500" />
                    <span>Fiverr</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{personalDetails.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl p-7 sm:p-9 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill out the brief form below and I&apos;ll get back to you within 24 hours.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-sm">Message Delivered!</div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Thank you for reaching out. I have received your message and will reply promptly.
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Delivery Error</div>
                    <div className="text-xs text-red-300 mt-0.5">{errorMessage}</div>
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
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                    What can I help you with?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  >
                    <option value="AI Automation & Workflows">AI Automation &amp; Workflows (n8n, Zapier, OpenAI)</option>
                    <option value="Full Stack Web Application">Full Stack Web Application (Next.js, React)</option>
                    <option value="Custom Shopify or E-commerce">Custom Shopify / Liquid / WooCommerce</option>
                    <option value="Technical SEO & Store Operations">Technical SEO &amp; Performance Tuning</option>
                    <option value="Remote Full-time Role / Contract">Remote Full-Time Role or Long-Term Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Details / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your goals, timeline, or current infrastructure..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-950 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 shadow-md shadow-gold-500/20 hover:shadow-gold-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
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
