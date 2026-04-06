export default function StatsBar({ wpm, acc, elapsed, isTimeMode, timeLimit, wordProgress }) {
  const displayTime = isTimeMode 
    ? Math.max(0, Math.ceil(timeLimit - elapsed)) 
    : Math.floor(elapsed)

  return (
    <div className={`grid ${wordProgress ? 'grid-cols-4' : 'grid-cols-3'} gap-3 md:gap-6 select-none animate-fade-in w-full md:w-auto`}>
      <div className="px-1 py-1 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">
          {isTimeMode ? 'time left' : 'time'}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-brand-extra tabular-nums tracking-tighter">
          {displayTime}<small className="text-base md:text-xl ml-1 opacity-60 font-medium">s</small>
        </span>
      </div>
      
      <div className="px-1 py-1 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">wpm</span>
        <span className="text-3xl md:text-4xl font-bold text-brand-main tabular-nums tracking-tighter transition-all duration-100">
          {wpm}
        </span>
      </div>

      <div className="px-1 py-1 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">acc</span>
        <span className="text-3xl md:text-4xl font-bold text-brand-main tabular-nums tracking-tighter">
          {acc}<small className="text-base md:text-xl opacity-60 font-medium">%</small>
        </span>
      </div>

      {wordProgress && (
        <div className="px-1 py-1 flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">word</span>
          <span className="text-3xl md:text-4xl font-bold text-brand-main tabular-nums tracking-tighter">
            {wordProgress}
          </span>
        </div>
      )}
    </div>
  )
}
