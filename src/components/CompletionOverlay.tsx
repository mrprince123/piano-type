export default function CompletionOverlay({ wpm, acc, count, mode, onRestart }) {
  const isPiano = mode === 'piano'
  const label = isPiano ? 'notes' : 'chars'

  return (
    <div className="fixed inset-0 bg-brand-bg/70 backdrop-blur-xl z-50 flex items-center justify-center animate-fade-in p-4">
      <div className="glass-panel rounded-3xl p-7 md:p-10 max-w-lg w-full text-center space-y-7 border-white/25">
        <div className="space-y-2">
          <h2 className="text-brand-extra font-mono uppercase tracking-[4px] text-xs font-bold italic">session complete</h2>
          <div className="text-6xl md:text-7xl font-black text-brand-main tracking-tighter tabular-nums">{wpm}</div>
          <div className="text-brand-sub text-sm font-medium uppercase tracking-widest">words per minute</div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="p-4 glass-panel-subtle rounded-2xl">
            <div className="text-2xl font-bold text-brand-main">{acc}%</div>
            <div className="text-[10px] text-brand-sub uppercase tracking-wider">accuracy</div>
          </div>
          <div className="p-4 glass-panel-subtle rounded-2xl">
            <div className="text-2xl font-bold text-brand-main">{count}</div>
            <div className="text-[10px] text-brand-sub uppercase tracking-wider">{label}</div>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="group flex items-center justify-center gap-3 w-full py-4 bg-brand-extra/80 text-brand-bg-dark font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-extra/25"
        >
          <span>restart test</span>
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <p className="text-[10px] text-brand-sub font-mono uppercase tracking-widest opacity-70">press shift + enter to restart</p>
      </div>
    </div>
  )
}
