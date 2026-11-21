'use client'

import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '@/data/profile'
import { Reveal } from './reveal'

const COUNTRY_CODES = [
  { code: '+92', label: '🇵🇰 +92 (Pakistan)' },
  { code: '+1', label: '🇺🇸 / 🇨🇦 +1 (US / Canada)' },
  { code: '+44', label: '🇬🇧 +44 (UK)' },
  { code: '+971', label: '🇦🇪 +971 (UAE)' },
  { code: '+966', label: '🇸🇦 +966 (Saudi Arabia)' },
  { code: '+974', label: '🇶🇦 +974 (Qatar)' },
  { code: '+968', label: '🇴🇲 +968 (Oman)' },
  { code: '+965', label: '🇰🇼 +965 (Kuwait)' },
  { code: '+973', label: '🇧🇭 +973 (Bahrain)' },
  { code: '+61', label: '🇦🇺 +61 (Australia)' },
  { code: '+49', label: '🇩🇪 +49 (Germany)' },
  { code: '+33', label: '🇫🇷 +33 (France)' },
  { code: '+31', label: '🇳🇱 +31 (Netherlands)' },
  { code: '+41', label: '🇨🇭 +41 (Switzerland)' },
  { code: '+46', label: '🇸🇪 +46 (Sweden)' },
  { code: '+47', label: '🇳🇴 +47 (Norway)' },
  { code: '+45', label: '🇩🇰 +45 (Denmark)' },
  { code: '+353', label: '🇮🇪 +353 (Ireland)' },
  { code: '+39', label: '🇮🇹 +39 (Italy)' },
  { code: '+34', label: '🇪🇸 +34 (Spain)' },
  { code: '+65', label: '🇸🇬 +65 (Singapore)' },
  { code: '+60', label: '🇲🇾 +60 (Malaysia)' },
  { code: '+91', label: '🇮🇳 +91 (India)' },
  { code: '+880', label: '🇧🇩 +880 (Bangladesh)' },
  { code: '+94', label: '🇱🇰 +94 (Sri Lanka)' },
  { code: '+27', label: '🇿🇦 +27 (South Africa)' },
  { code: '+234', label: '🇳🇬 +234 (Nigeria)' },
  { code: '+20', label: '🇪🇬 +20 (Egypt)' },
  { code: '+90', label: '🇹🇷 +90 (Turkey)' },
  { code: '+55', label: '🇧🇷 +55 (Brazil)' },
  { code: '+52', label: '🇲🇽 +52 (Mexico)' },
  { code: '+81', label: '🇯🇵 +81 (Japan)' },
  { code: '+82', label: '🇰🇷 +82 (South Korea)' },
  { code: '+86', label: '🇨🇳 +86 (China)' },
  { code: '+64', label: '🇳🇿 +64 (New Zealand)' },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+92',
    phone: '',
    topic: 'AI automation and workflows',
    message: '',
    company: '', // Honeypot field
  })
  const [mountedAt, setMountedAt] = useState<number>(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMountedAt(Date.now())
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (at least 2 characters).'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '')
      if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        errs.phone = 'Please enter a valid phone number (6 to 15 digits).'
      }
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please write a message with at least 10 characters.'
    } else if (formData.message.length > 2000) {
      errs.message = 'Message must be under 2000 characters.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setResponseMessage('')

    const fullPhone = formData.phone.trim()
      ? `${formData.countryCode} ${formData.phone.trim()}`
      : 'Not provided'

    try {
      // 1. Direct submission to FormSubmit using secure endpoint token
      const res = await fetch('https://formsubmit.co/ajax/7b9da346f0c66eaea6edcda2c9a579c0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name.trim(),
          Email: formData.email.trim(),
          Phone: fullPhone,
          Topic: formData.topic,
          Message: formData.message.trim(),
          _subject: `New Lead: ${formData.name.trim()} - ${formData.topic}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await res.json()

      if (data.success === 'true' || data.success === true) {
        setStatus('success')
        setResponseMessage('Thank you! Your message has been sent directly to Aman Ali. I will reply soon.')
        setFormData({
          name: '',
          email: '',
          countryCode: '+92',
          phone: '',
          topic: 'AI automation and workflows',
          message: '',
          company: '',
        })
        setErrors({})
        return
      }

      // If FormSubmit requires first-time owner activation
      if (data.message && data.message.toLowerCase().includes('activation')) {
        setStatus('success')
        setResponseMessage(
          'Message submitted! Please check amanali257509@gmail.com and click "Activate Form" once to complete setup.'
        )
        setFormData({
          name: '',
          email: '',
          countryCode: '+92',
          phone: '',
          topic: 'AI automation and workflows',
          message: '',
          company: '',
        })
        setErrors({})
        return
      }

      // 2. Fallback: try server API route
      const fallbackRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          mountedAt,
          submittedAt: Date.now(),
        }),
      })

      const fallbackData = await fallbackRes.json()
      if (fallbackRes.ok && (fallbackData.success === true || fallbackData.success === 'true')) {
        setStatus('success')
        setResponseMessage(fallbackData.message || 'Thank you! Your message has been sent.')
        setFormData({
          name: '',
          email: '',
          countryCode: '+92',
          phone: '',
          topic: 'AI automation and workflows',
          message: '',
          company: '',
        })
        setErrors({})
        return
      }

      throw new Error(data.message || fallbackData.error || 'Failed to deliver message.')
    } catch (err: unknown) {
      setStatus('error')
      setResponseMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-30 border-t border-line" aria-labelledby="contact-title">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) */}
          <Reveal direction="left" className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[13px] font-semibold text-brass uppercase tracking-wider block mb-2">
                Contact
              </span>
              <h2 id="contact-title">Get in touch</h2>
              <p className="mt-3 text-[16px] lg:text-[17px] text-muted max-w-[65ch]">
                Tell me what you need and I&apos;ll reply by email. Open to remote full-time roles, contracts and freelance projects worldwide.
              </p>

              {/* Direct Channels */}
              <div className="mt-8 space-y-4">
                {/* Email with copy */}
                <div className="p-4 rounded-[8px] bg-surface border border-line flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[12px] uppercase tracking-wider text-muted font-medium block">
                      Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[15px] font-medium text-ink hover:text-brass transition-colors truncate block mt-0.5"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="shrink-0 min-h-[44px] min-w-[44px] px-3 py-2 rounded-[8px] border border-line bg-canvas text-[13px] text-muted hover:text-brass hover:border-brass transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brass" strokeWidth={2} />
                        <span className="text-brass font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Plain Social Links */}
                <div className="flex flex-wrap items-center gap-5 pt-2 text-[14px]">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-brass link-underline transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-brass link-underline transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.links.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-brass link-underline transition-colors"
                  >
                    Upwork
                  </a>
                </div>
              </div>

              {/* BOOKING CALENDAR WILL GO HERE */}
              <div className="mt-8 pt-8 border-t border-line text-[13px] text-muted">
                {/* BOOKING CALENDAR WILL GO HERE */}
                <span>Based in Karachi, Pakistan (UTC+5). Available for calls across North American and European time zones.</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Form (7 cols) */}
          <Reveal direction="right" className="lg:col-span-7">
            <div className="bg-surface border border-line rounded-[8px] p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from screen & bots) */}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-[14px] font-normal text-ink mb-2">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: '' })
                    }}
                    placeholder="Your name"
                    className="w-full min-h-[44px] px-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink placeholder:text-muted/60 focus:border-brass transition-colors"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-[13px] text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-[14px] font-normal text-ink mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: '' })
                    }}
                    placeholder="your.email@example.com"
                    className="w-full min-h-[44px] px-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink placeholder:text-muted/60 focus:border-brass transition-colors"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-[13px] text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp Number with Country Code */}
                <div>
                  <label htmlFor="contact-phone" className="block text-[14px] font-normal text-ink mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="w-[130px] sm:w-[160px] shrink-0">
                      <select
                        id="contact-country-code"
                        aria-label="Country dial code"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-full min-h-[44px] px-2.5 sm:px-3 rounded-[8px] border border-line bg-canvas text-[13.5px] sm:text-[14.5px] text-ink focus:border-brass transition-colors cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c, i) => (
                          <option key={`${c.code}-${i}`} value={c.code} className="bg-[#0f1410] text-ink py-1">
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) setErrors({ ...errors, phone: '' })
                        }}
                        placeholder="300 1234567"
                        className="w-full min-h-[44px] px-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink placeholder:text-muted/60 focus:border-brass transition-colors"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p id="contact-phone-error" className="mt-1.5 text-[13px] text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Help with (Select) */}
                <div>
                  <label htmlFor="contact-topic" className="block text-[14px] font-normal text-ink mb-2">
                    What do you need help with?
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full min-h-[44px] px-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink focus:border-brass transition-colors"
                  >
                    <option value="AI automation and workflows">AI automation and workflows</option>
                    <option value="Shopify or WooCommerce">Shopify or WooCommerce</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Full stack web application">Full stack web application</option>
                    <option value="Remote role or long-term contract">Remote role or long-term contract</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-[14px] font-normal text-ink mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: '' })
                    }}
                    placeholder="Tell me about your project, timeline and requirements..."
                    className="w-full p-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink placeholder:text-muted/60 focus:border-brass transition-colors resize-y"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-[13px] text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Announcement Area for Accessibility */}
                <div aria-live="polite" className="pt-1">
                  {status === 'success' && (
                    <div className="p-4 rounded-[8px] bg-canvas border border-brass text-[14px] text-ink">
                      <span className="font-semibold text-brass block mb-1">Message sent successfully</span>
                      <span>{responseMessage}</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 rounded-[8px] bg-canvas border border-red-500/50 text-[14px] text-ink">
                      <span className="font-semibold block text-red-400 mb-1">Error sending message</span>
                      <p className="text-muted text-[13px] leading-relaxed">{responseMessage}</p>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
