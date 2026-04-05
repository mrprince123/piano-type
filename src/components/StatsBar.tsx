export default function StatsBar({ wpm, acc, elapsed, isTimeMode, timeLimit }) {
  const displayTime = isTimeMode 
    ? Math.max(0, Math.ceil(timeLimit - elapsed)) 
    : Math.floor(elapsed)

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 select-none animate-fade-in w-full md:w-auto">
      <div className="glass-panel-subtle rounded-2xl px-4 py-3 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">
          {isTimeMode ? 'time left' : 'time'}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-brand-extra tabular-nums tracking-tighter">
          {displayTime}<small className="text-base md:text-xl ml-1 opacity-60 font-medium">s</small>
        </span>
      </div>
      
      <div className="glass-panel-subtle rounded-2xl px-4 py-3 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">wpm</span>
        <span className="text-3xl md:text-4xl font-bold text-brand-main tabular-nums tracking-tighter transition-all duration-100">
          {wpm}
        </span>
      </div>

      <div className="glass-panel-subtle rounded-2xl px-4 py-3 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-[2px] text-brand-sub mb-1">acc</span>
        <span className="text-3xl md:text-4xl font-bold text-brand-main tabular-nums tracking-tighter">
          {acc}<small className="text-base md:text-xl opacity-60 font-medium">%</small>
        </span>
      </div>
    </div>
  )
}
