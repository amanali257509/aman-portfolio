import React from 'react'

interface MediaPlaceholderProps {
  label?: string
  aspectRatio?: string
  className?: string
}

export function MediaPlaceholder({
  label = 'Video placeholder',
  aspectRatio = 'aspect-[16/10]',
  className = '',
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-[8px] overflow-hidden bg-surface media-shimmer border border-line flex flex-col items-center justify-center p-4 text-center ${className}`}
    >
      <div className="w-8 h-8 rounded-[8px] border border-line flex items-center justify-center text-brass mb-2">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <span className="text-[13px] text-muted font-normal tracking-wide">
        {label}
      </span>
    </div>
  )
}
