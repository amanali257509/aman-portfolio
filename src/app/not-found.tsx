import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70dvh] flex items-center justify-center px-5 py-24 bg-canvas">
      <div className="max-w-md w-full text-center p-8 rounded-[8px] border border-line bg-surface">
        <span className="text-[14px] font-semibold text-brass uppercase tracking-wider block mb-2">
          404 Error
        </span>
        <h1 className="text-[1.75rem] font-heading font-bold text-ink mb-3">
          Page Not Found
        </h1>
        <p className="text-[15px] leading-relaxed text-muted mb-8">
          The requested page could not be found. Please return to the homepage to explore the portfolio.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}
