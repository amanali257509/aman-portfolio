import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24 bg-[#0b0f17]">
      <div className="max-w-md w-full text-center p-6 rounded-[6px] border border-[#1e293b] bg-[#111827]">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#0b0f17] text-[#f59e0b] border border-[#1e293b] mb-6">
          <span className="text-lg font-semibold">404</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#f1f5f9] mb-2">
          Page Not Found
        </h1>
        <p className="text-[15px] leading-[1.6] text-[#94a3b8] mb-8">
          The requested route doesn&apos;t exist in this system. Return to the homepage to explore the portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-[6px] font-semibold text-[15px] bg-[#f59e0b] hover:bg-[#d97706] text-[#0b0f17] transition-colors duration-200"
        >
          <Home className="w-4 h-4" strokeWidth={1.75} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
