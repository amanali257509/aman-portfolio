export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f17]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#f59e0b] text-[#0b0f17] font-semibold text-lg">
          AA
        </div>
        <div className="flex items-center gap-2 text-xs text-[#f59e0b]">
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
          <span>Initializing Portfolio...</span>
        </div>
      </div>
    </div>
  )
}
