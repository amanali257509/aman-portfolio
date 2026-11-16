export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 font-heading text-xl font-bold text-navy-950 animate-pulse shadow-lg shadow-gold-500/20">
          AA
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-gold-500">
          <span className="h-2 w-2 rounded-full bg-gold-500 animate-ping" />
          <span>Initializing Portfolio...</span>
        </div>
      </div>
    </div>
  )
}
