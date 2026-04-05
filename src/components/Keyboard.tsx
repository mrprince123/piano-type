import React from 'react'

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

export default function Keyboard({ pressedKeys, targetKey }) {
  // Normalize targetKey for comparison (sometimes it might be uppercase or space)
  const normalizedTarget = targetKey?.toLowerCase()

  return (
    <div className="flex flex-col gap-2 items-center select-none opacity-75 hover:opacity-100 transition-opacity duration-500 scale-[0.82] md:scale-100 glass-panel-subtle rounded-2xl p-3 md:p-4">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {/* Row Indentation for QWERTY feel */}
          {rowIndex === 1 && <div className="w-4" />}
          {rowIndex === 2 && <div className="w-8" />}
          
          {row.map(key => {
            const isPressed = pressedKeys.has(key)
            const isTarget = normalizedTarget === key
            
            return (
              <div
                key={key}
                className={`
                  w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg text-sm font-mono font-medium transition-all duration-75
                  border-b-4 
                  ${isPressed 
                    ? 'bg-brand-main text-brand-bg-dark border-brand-main translate-y-[2px] border-b-0 shadow-inner' 
                    : isTarget 
                      ? 'bg-brand-extra/20 text-brand-main border-brand-extra/50 animate-pulse' 
                      : 'bg-white/10 text-brand-sub border-white/20'}
                `}
              >
                {key.toUpperCase()}
              </div>
            )
          })}
        </div>
      ))}
      
      {/* Spacebar Row */}
      <div className="flex gap-1.5 mt-1">
        <div 
          className={`
            h-10 md:h-12 w-48 md:w-64 rounded-lg transition-all duration-75 border-b-4 flex items-center justify-center
            ${pressedKeys.has(' ') 
              ? 'bg-brand-main border-brand-main translate-y-[2px] border-b-0 shadow-inner' 
              : normalizedTarget === ' ' 
                ? 'bg-brand-extra/20 border-brand-extra/40 animate-pulse' 
                : 'bg-white/10 border-white/20'}
          `}
        >
          {normalizedTarget === ' ' && <span className="text-brand-extra text-[10px] uppercase tracking-widest font-mono">space</span>}
        </div>
      </div>
    </div>
  )
}
