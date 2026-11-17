'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-300 dark:border-white/10 bg-white/90 dark:bg-navy-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-gold-400 hover:border-amber-400/50 dark:hover:border-gold-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-gold-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 -rotate-12 hover:rotate-0" />
      )}
    </button>
  )
}
