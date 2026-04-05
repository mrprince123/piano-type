export default function SettingsBar({ settings, onSettingsChange }) {
  const isWords = settings.type === 'words'
  const isTime = settings.type === 'time'

  const wordOptions = [10, 25, 50, 100]
  const timeOptions = [15, 30, 60, 120]

  return (
    <div className="flex justify-center mb-4 animate-fade-in">
      <div className="glass-panel rounded-2xl px-4 py-3 flex flex-wrap items-center gap-4 text-[13px] font-medium">
        <div className="flex gap-2 border-r border-white/20 pr-4">
          <button 
            onClick={() => onSettingsChange({ ...settings, type: 'words' })}
            className={`px-3 py-1.5 rounded-lg transition-all ${isWords ? 'glass-chip text-brand-main' : 'text-brand-sub hover:text-brand-main hover:bg-white/10'}`}
          >
            words
          </button>
          <button 
            onClick={() => onSettingsChange({ ...settings, type: 'time' })}
            className={`px-3 py-1.5 rounded-lg transition-all ${isTime ? 'glass-chip text-brand-main' : 'text-brand-sub hover:text-brand-main hover:bg-white/10'}`}
          >
            time
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(isWords ? wordOptions : timeOptions).map(val => (
            <button
              key={val}
              onClick={() => onSettingsChange({ ...settings, value: val })}
              className={`px-3 py-1.5 rounded-lg transition-all ${settings.value === val ? 'glass-chip text-brand-main' : 'text-brand-sub hover:text-brand-main hover:bg-white/10'}`}
            >
              {val}{isTime ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
