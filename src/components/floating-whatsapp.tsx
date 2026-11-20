'use client'

import React from 'react'
import { WhatsAppLogo } from './whatsapp-logo'

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group">
      {/* Tooltip on desktop hover */}
      <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-[8px] bg-[#171e18] border border-line text-ink text-[12px] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.7)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 hidden sm:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#25D366]" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Clean, perfectly centered floating action button */}
      <a
        href="https://wa.me/923112756456"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aman Ali on WhatsApp (03112756456)"
        title="Chat on WhatsApp"
        className="flex items-center justify-center w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_4px_20px_rgba(0,0,0,0.45),0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-200 hover:scale-108 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        <WhatsAppLogo className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </div>
  )
}

export default FloatingWhatsApp
