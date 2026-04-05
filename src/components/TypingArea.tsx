import { useRef, useEffect } from 'react'

interface Song {
  seq: { k: string; n: string }[]
}

interface TypingAreaProps {
  song: Song | null
  currentIdx: number
  mode: string
  onReset: () => void
}

export default function TypingArea({ song, currentIdx, mode, onReset }: TypingAreaProps) {
  const displayRef = useRef(null)

  useEffect(() => {
    if (!displayRef.current) return
    const el = displayRef.current.querySelector(`#ci${currentIdx}`)
    if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [currentIdx])

  const sequence = song?.seq || []

  return (
    <div className="w-full relative py-2 md:py-4 min-h-[140px] flex flex-col items-center">
      <div 
        className="font-mono text-xl md:text-3xl leading-[1.8] tracking-[1px] select-none break-words max-w-4xl text-center transition-all duration-300 px-2" 
        ref={displayRef}
      >
        {sequence.map((step, i) => {
          const isTyped = i < currentIdx
          const isCurrent = i === currentIdx
          
          return (
            <span 
                key={i} 
                id={`ci${i}`}
                className={`relative inline-block transition-all duration-150 ${
                    isTyped ? 'text-brand-main opacity-100' : isCurrent ? 'text-brand-extra scale-110' : 'text-brand-sub opacity-30'
                }`}
                style={{ whiteSpace: step.k === ' ' ? 'pre' : 'normal' }}
            >
              {isCurrent && (
                <span className="absolute -mt-1 w-[2px] h-[1.2em] bg-brand-extra animate-blink" />
              )}
              {step.k}
            </span>
          )
        })}
      </div>

      <div className="mt-8 md:mt-12 flex gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button 
            onClick={onReset}
            className="p-3 rounded-full glass-chip text-brand-sub hover:text-brand-extra hover:border-brand-extra/40 transition-all active:scale-90"
            title="Restart Test (Esc)"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </button>
      </div>
    </div>
  )
}
