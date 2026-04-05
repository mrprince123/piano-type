export default function Header({ mode, onModeChange, onOpenManager }) {
  return (
    <header className="w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6 pt-8 select-none animate-fade-in group">
      <div className="flex flex-col">
        <div className="font-sans text-[30px] md:text-[34px] font-bold text-brand-main tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">
          Piano<span className="text-brand-extra font-extrabold italic">Type</span>
        </div>
        <div className="font-mono text-[10px] font-medium text-brand-sub tracking-[3px] uppercase mt-2 opacity-80">
          Glass Practice Studio
        </div>
      </div>

      <div className="w-full md:w-auto flex flex-wrap gap-1 items-center glass-panel-subtle p-1.5 rounded-2xl">
        <button 
          onClick={() => onModeChange('piano')}
          className={`px-4 md:px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2.5 ${
            mode === 'piano' 
              ? 'glass-chip text-brand-main font-bold animate-glow-pulse' 
              : 'text-brand-sub hover:text-brand-main hover:bg-white/10'
          }`}
        >
          <span className="text-sm">🎹</span> piano
        </button>
        
        <button 
          onClick={() => onModeChange('typing')}
          className={`px-4 md:px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2.5 ${
            mode === 'typing' 
              ? 'glass-chip text-brand-main font-bold animate-glow-pulse' 
              : 'text-brand-sub hover:text-brand-main hover:bg-white/10'
          }`}
        >
          <span className="text-sm">⌨️</span> typing
        </button>

        <div className="hidden md:block w-[1px] h-4 bg-white/20 mx-1" />

        <button 
          onClick={onOpenManager}
          className="ml-auto md:ml-0 px-4 md:px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest text-brand-sub hover:text-brand-main hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2.5"
        >
          <span className="text-sm">📚</span> library
        </button>
      </div>
    </header>
  )
}
