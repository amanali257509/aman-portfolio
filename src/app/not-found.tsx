import Link from 'next/link'
import { ArrowLeft, Home, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-dot-grid">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-white/10 bg-navy-900/80 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 mb-6">
          <span className="font-mono text-2xl font-bold">404</span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed mb-8">
          The requested route doesn&apos;t exist in this system. Return to the homepage to explore the portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 shadow-md shadow-gold-500/20 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
