export default function SongLibrary({ songs, activeSongId, onSelect, onOpenManager }) {
  interface Song {
    title: string
    meta: string
    bpm: number
    seq: { k: string; n: string }[]
  }
  return (
    <div className="py-[18px] mb-6 animate-fade-in glass-panel-subtle rounded-2xl px-4 md:px-5">
      <div className="flex justify-between items-center mb-3">
        <div className="font-mono text-[11px] text-brand-sub tracking-[1px] uppercase">song library</div>
        <button 
            onClick={onOpenManager}
            className="text-[11px] font-mono text-brand-extra uppercase tracking-widest hover:text-brand-main transition-all flex items-center gap-1.5 group"
        >
            <span className="text-lg leading-none group-hover:rotate-90 transition-transform">+</span>
            add track
        </button>
      </div>
      
      <div className="flex gap-2.5 flex-wrap">
        {Object.entries(songs).map(([id, song]) => {
          const s = song as Song
          const parts = s.title.split('—')
          const short = (parts[0] || s.title).trim().split(' ').slice(0, 4).join(' ')
          const isActive = activeSongId === id
          const isUser = id.startsWith('user_')

          return (
            <button
              key={id}
              className={`px-4 py-2.5 border border-transparent rounded-xl cursor-pointer font-sans text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                isActive 
                  ? 'text-brand-main glass-chip' 
                  : 'bg-transparent text-brand-sub hover:text-brand-main hover:bg-white/10 hover:border-white/20'
              }`}
              onClick={() => onSelect(id)}
            >
              {isUser && <span className="w-1.5 h-1.5 rounded-full bg-brand-extra"></span>}
              {short}
            </button>
          )
        })}
      </div>
    </div>
  )
}
