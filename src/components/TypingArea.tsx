import { useRef, useEffect, type FormEvent } from 'react'

interface Song {
  seq: { k: string; n: string }[]
}

interface TypingAreaProps {
  song: Song | null
  currentIdx: number
  mode: string
  onVirtualChar?: (char: string) => void
  onReset: () => void
}

export default function TypingArea({ song, currentIdx, mode, onVirtualChar, onReset }: TypingAreaProps) {
  const displayRef = useRef<HTMLDivElement | null>(null)
  const mobileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!displayRef.current) return
    const el = displayRef.current.querySelector(`#ci${currentIdx}`)
    if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [currentIdx])

  const sequence = song?.seq || []
  const maxLineChars = mode === 'typing' ? 48 : 36

  // Build readable lines and prefer wrapping at spaces when possible.
  const lines: Array<{ start: number; end: number }> = []
  let start = 0
  while (start < sequence.length) {
    let i = start
    let count = 0
    let lastSpace = -1

    while (i < sequence.length && count < maxLineChars) {
      if (sequence[i].k === ' ') lastSpace = i
      i += 1
      count += 1
    }

    if (i < sequence.length && lastSpace > start) i = lastSpace + 1
    lines.push({ start, end: i - 1 })
    start = i
  }

  const safeIdx = sequence.length === 0 ? 0 : Math.min(currentIdx, sequence.length - 1)
  const currentLineIndex = Math.max(
    0,
    lines.findIndex(line => safeIdx >= line.start && safeIdx <= line.end)
  )
  const visibleLines = lines.slice(currentLineIndex, currentLineIndex + 3)

  const focusMobileInput = () => {
    if (mode !== 'typing') return
    mobileInputRef.current?.focus()
  }

  const handleMobileBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent
    const data = native.data
    if (!data) return

    for (const char of data) {
      onVirtualChar?.(char === '\n' ? ' ' : char)
    }
  }

  const handleMobileInput = (e: FormEvent<HTMLInputElement>) => {
    // Keep this input empty so each event only carries fresh characters.
    e.currentTarget.value = ''
  }

  return (
    <div
      className="w-full relative py-2 md:py-4 min-h-[140px] flex flex-col items-center"
      onClick={focusMobileInput}
    >
      {mode === 'typing' && (
        <>
          <input
            ref={mobileInputRef}
            className="absolute w-px h-px opacity-0 pointer-events-none"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
            onBeforeInput={handleMobileBeforeInput}
            onInput={handleMobileInput}
            aria-label="Typing input"
          />
          <div className="md:hidden mb-2 text-[11px] uppercase tracking-[2px] text-brand-sub/80">
            tap text area to open keyboard
          </div>
        </>
      )}

      <div 
        className="font-mono text-xl md:text-3xl leading-[1.45] tracking-[1px] select-none break-words max-w-8xl text-center transition-all duration-300 px-2" 
        ref={displayRef}
      >
        {visibleLines.map((line, lineIndex) => (
          <div
            key={`${line.start}-${line.end}`}
            className={`${lineIndex > 0 ? 'mt-1' : ''} whitespace-pre overflow-hidden`}
          >
            {sequence.slice(line.start, line.end + 1).map((step, offset) => {
              const i = line.start + offset
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
        ))}
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
