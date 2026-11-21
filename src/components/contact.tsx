'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Check, Copy, Search, ChevronDown, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { Reveal } from './reveal'

interface CountryItem {
  name: string
  code: string
  iso: string
}

const COUNTRIES: CountryItem[] = [
  { name: 'Pakistan', code: '+92', iso: 'pk' },
  { name: 'United States', code: '+1', iso: 'us' },
  { name: 'United Kingdom', code: '+44', iso: 'gb' },
  { name: 'Canada', code: '+1', iso: 'ca' },
  { name: 'Australia', code: '+61', iso: 'au' },
  { name: 'United Arab Emirates', code: '+971', iso: 'ae' },
  { name: 'Saudi Arabia', code: '+966', iso: 'sa' },
  { name: 'Germany', code: '+49', iso: 'de' },
  { name: 'Qatar', code: '+974', iso: 'qa' },
  { name: 'Oman', code: '+968', iso: 'om' },
  { name: 'Kuwait', code: '+965', iso: 'kw' },
  { name: 'Bahrain', code: '+973', iso: 'bh' },
  { name: 'India', code: '+91', iso: 'in' },
  { name: 'Singapore', code: '+65', iso: 'sg' },
  { name: 'Malaysia', code: '+60', iso: 'my' },
  { name: 'France', code: '+33', iso: 'fr' },
  { name: 'Netherlands', code: '+31', iso: 'nl' },
  { name: 'Switzerland', code: '+41', iso: 'ch' },
  { name: 'Sweden', code: '+46', iso: 'se' },
  { name: 'Norway', code: '+47', iso: 'no' },
  { name: 'Denmark', code: '+45', iso: 'dk' },
  { name: 'Ireland', code: '+353', iso: 'ie' },
  { name: 'Italy', code: '+39', iso: 'it' },
  { name: 'Spain', code: '+34', iso: 'es' },
  { name: 'New Zealand', code: '+64', iso: 'nz' },
  { name: 'South Africa', code: '+27', iso: 'za' },
  { name: 'Turkey', code: '+90', iso: 'tr' },
  { name: 'Egypt', code: '+20', iso: 'eg' },
  { name: 'Bangladesh', code: '+880', iso: 'bd' },
  { name: 'Sri Lanka', code: '+94', iso: 'lk' },
  { name: 'Nigeria', code: '+234', iso: 'ng' },
  { name: 'Kenya', code: '+254', iso: 'ke' },
  { name: 'Brazil', code: '+55', iso: 'br' },
  { name: 'Mexico', code: '+52', iso: 'mx' },
  { name: 'Japan', code: '+81', iso: 'jp' },
  { name: 'South Korea', code: '+82', iso: 'kr' },
  { name: 'China', code: '+86', iso: 'cn' },
  { name: 'Hong Kong', code: '+852', iso: 'hk' },
  { name: 'Indonesia', code: '+62', iso: 'id' },
  { name: 'Philippines', code: '+63', iso: 'ph' },
  { name: 'Thailand', code: '+66', iso: 'th' },
  { name: 'Vietnam', code: '+84', iso: 'vn' },
  { name: 'Belgium', code: '+32', iso: 'be' },
  { name: 'Austria', code: '+43', iso: 'at' },
  { name: 'Poland', code: '+48', iso: 'pl' },
  { name: 'Portugal', code: '+351', iso: 'pt' },
  { name: 'Greece', code: '+30', iso: 'gr' },
  { name: 'Czech Republic', code: '+420', iso: 'cz' },
  { name: 'Hungary', code: '+36', iso: 'hu' },
  { name: 'Romania', code: '+40', iso: 'ro' },
  { name: 'Finland', code: '+358', iso: 'fi' },
  { name: 'Argentina', code: '+54', iso: 'ar' },
  { name: 'Colombia', code: '+57', iso: 'co' },
  { name: 'Chile', code: '+56', iso: 'cl' },
  { name: 'Jordan', code: '+962', iso: 'jo' },
  { name: 'Lebanon', code: '+961', iso: 'lb' },
  { name: 'Iraq', code: '+964', iso: 'iq' },
  { name: 'Morocco', code: '+212', iso: 'ma' },
  { name: 'Ghana', code: '+233', iso: 'gh' },
  { name: 'Nepal', code: '+977', iso: 'np' },
]

export function Contact() {
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(COUNTRIES[0])
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const countrySearchInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

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

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES
    const q = countrySearch.trim().toLowerCase()
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q)
    )
  }, [countrySearch])

  // Handle click outside and ESC key to close country dropdown
  useEffect(() => {
    if (!isCountryOpen) return

    setTimeout(() => {
      countrySearchInputRef.current?.focus()
    }, 50)

    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCountryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCountryOpen])

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
      ? `${selectedCountry.code} ${formData.phone.trim()}`
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
        setSelectedCountry(COUNTRIES[0])
        setIsCountryOpen(false)
        setCountrySearch('')
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
        setSelectedCountry(COUNTRIES[0])
        setIsCountryOpen(false)
        setCountrySearch('')
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
        setSelectedCountry(COUNTRIES[0])
        setIsCountryOpen(false)
        setCountrySearch('')
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

                {/* Phone / WhatsApp Number with Searchable Country Code */}
                <div>
                  <label htmlFor="contact-phone" className="block text-[14px] font-normal text-ink mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <div className="flex gap-2">
                    {/* Custom Searchable Country Code Dropdown */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCountryOpen(!isCountryOpen)
                          setCountrySearch('')
                        }}
                        aria-label={`Selected country: ${selectedCountry.name} (${selectedCountry.code}). Click to search and change country.`}
                        aria-expanded={isCountryOpen}
                        aria-haspopup="listbox"
                        className="h-[46px] px-3 rounded-[8px] border border-line bg-canvas hover:border-brass/70 focus:border-brass focus-visible:outline-none transition-colors flex items-center gap-2 cursor-pointer select-none"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                          srcSet={`https://flagcdn.com/w80/${selectedCountry.iso}.png 2x`}
                          width="22"
                          height="15"
                          alt={`${selectedCountry.name} flag`}
                          className="w-[22px] h-[15px] rounded-[2px] object-cover shadow-sm shrink-0"
                          loading="eager"
                        />
                        <span className="font-mono text-[14px] text-ink font-medium tracking-tight">
                          {selectedCountry.code}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-muted transition-transform duration-200 shrink-0 ${
                            isCountryOpen ? 'rotate-180 text-brass' : ''
                          }`}
                        />
                      </button>

                      {/* Popover Dropdown with Search */}
                      {isCountryOpen && (
                        <div
                          role="listbox"
                          aria-label="Country selection list"
                          className="absolute top-full left-0 mt-1.5 w-[290px] sm:w-[330px] max-w-[calc(100vw-3rem)] rounded-[12px] border border-line bg-[#121813] shadow-[0_20px_50px_rgba(0,0,0,0.92)] z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
                        >
                          {/* Search Header */}
                          <div className="p-2.5 border-b border-line/60 bg-[#0f1410]">
                            <div className="relative flex items-center">
                              <Search className="w-3.5 h-3.5 text-muted absolute left-3 pointer-events-none" />
                              <input
                                ref={countrySearchInputRef}
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search country or code..."
                                className="w-full h-9 pl-9 pr-8 rounded-[6px] border border-line/80 bg-canvas text-[13px] text-ink placeholder:text-muted/60 focus:border-brass focus:outline-none transition-colors"
                              />
                              {countrySearch && (
                                <button
                                  type="button"
                                  onClick={() => setCountrySearch('')}
                                  aria-label="Clear search"
                                  className="absolute right-2 p-1 text-muted hover:text-ink transition-colors cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Country Options List */}
                          <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-line scrollbar-track-transparent py-1 select-none">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => {
                                const isSelected =
                                  selectedCountry.iso === c.iso && selectedCountry.code === c.code
                                return (
                                  <button
                                    key={`${c.iso}-${c.code}`}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                      setSelectedCountry(c)
                                      setFormData((prev) => ({
                                        ...prev,
                                        countryCode: c.code,
                                      }))
                                      setIsCountryOpen(false)
                                      setCountrySearch('')
                                      phoneInputRef.current?.focus()
                                    }}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2 text-left text-[13.5px] transition-colors cursor-pointer group ${
                                      isSelected
                                        ? 'bg-brass/10 text-brass font-medium'
                                        : 'text-ink hover:bg-canvas/80 hover:text-brass'
                                    }`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={`https://flagcdn.com/w40/${c.iso}.png`}
                                      srcSet={`https://flagcdn.com/w80/${c.iso}.png 2x`}
                                      width="20"
                                      height="14"
                                      alt=""
                                      className="w-[20px] h-[14px] rounded-[2px] object-cover shrink-0 shadow-xs"
                                      loading="lazy"
                                    />
                                    <span className="truncate flex-1">{c.name}</span>
                                    <span className="font-mono text-[12.5px] text-muted group-hover:text-brass shrink-0">
                                      {c.code}
                                    </span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-brass shrink-0" />}
                                  </button>
                                )
                              })
                            ) : (
                              <div className="px-4 py-6 text-center text-[13px] text-muted">
                                No country found for &ldquo;{countrySearch}&rdquo;
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        ref={phoneInputRef}
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) setErrors({ ...errors, phone: '' })
                        }}
                        placeholder="300 1234567"
                        className="w-full h-[46px] px-4 rounded-[8px] border border-line bg-canvas text-[15px] text-ink placeholder:text-muted/60 focus:border-brass transition-colors"
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
