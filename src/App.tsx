import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Header from './components/Header'
import TypingArea from './components/TypingArea'
import StatsBar from './components/StatsBar'
import SongLibrary from './components/SongLibrary'
import CompletionOverlay from './components/CompletionOverlay'
import FloatingNotes from './components/FloatingNotes'
import SettingsBar from './components/SettingsBar'
import LibraryManager from './components/LibraryManager'
import Keyboard from './components/Keyboard'
import { useGame } from './hooks/useGame'
import { SONGS } from './data/songs'
import { WORDS } from './data/words'

interface Song {
  title: string
  meta: string
  bpm: number
  seq: { k: string; n: string }[]
}

// Audio cache
const audioCache: Record<string, HTMLAudioElement> = {}
const getAudio = (note: string) => {
  if (audioCache[note]) return audioCache[note]
  const audio = new Audio(`https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/${note}.mp3`)
  audio.volume = 0.4
  audioCache[note] = audio
  return audio
}

export default function App() {
  const [mode, setMode] = useState('piano') // 'piano' | 'typing'
  const [testSettings, setTestSettings] = useState({ type: 'words', value: 25 })
  const [activeSongId, setActiveSongId] = useState('mario')
  const [userSongs, setUserSongs] = useState(() => {
    const saved = localStorage.getItem('pianotype_user_songs')
    return saved ? JSON.parse(saved) : {}
  })
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [errorKeys, setErrorKeys] = useState<Set<string>>(new Set())
  const [isManagerOpen, setIsManagerOpen] = useState(false)
  const releaseTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const errorTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const finishedRef = useRef(false)
  const isManagerOpenRef = useRef(false)
  const modeRef = useRef(mode)
  const testSettingsRef = useRef(testSettings)

  // Persist user songs
  useEffect(() => {
    localStorage.setItem('pianotype_user_songs', JSON.stringify(userSongs))
  }, [userSongs])

  // Combine default songs with user songs
  const allSongs = useMemo(() => ({ ...SONGS, ...userSongs }), [userSongs])

  const generateTypingData = useCallback((count: number) => {
    const sequence = []
    for (let i = 0; i < count; i++) {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)]
        for (const char of word) {
            sequence.push({ n: 'C4', k: char.toLowerCase() })
        }
        if (i < count - 1) {
            sequence.push({ n: 'C4', k: ' ' })
        }
    }
    return {
        title: 'Speed Typing Test',
        meta: `Random ${count} words · speed & accuracy`,
        bpm: 120,
        seq: sequence
    }
  }, [])

  const [typingData, setTypingData] = useState(() => generateTypingData(25))

  // Handle mode shifts or setting changes
  useEffect(() => {
    if (mode === 'typing') {
      const count = testSettings.type === 'words' ? testSettings.value : 100 // Enough for time mode
      setTypingData(generateTypingData(count))
    }
  }, [mode, testSettings, generateTypingData])

  // Global keyboard pipeline: key indicator + gameplay input
  useEffect(() => {
    const clearReleaseTimer = (key: string) => {
      const timer = releaseTimersRef.current[key]
      if (!timer) return
      clearTimeout(timer)
      delete releaseTimersRef.current[key]
    }
    const clearErrorTimer = (key: string) => {
      const timer = errorTimersRef.current[key]
      if (!timer) return
      clearTimeout(timer)
      delete errorTimersRef.current[key]
    }

    const handleDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      clearReleaseTimer(key)
      setPressedKeys(prev => {
        const next = new Set(prev)
        next.add(key)
        return next
      })

      if (finishedRef.current || isManagerOpenRef.current) return
      if (e.key === 'Escape') {
        resetRef.current()
        if (modeRef.current === 'typing') {
          setTypingData(generateTypingData(testSettingsRef.current.value))
        }
        return
      }

      if (e.key === 'Enter' && e.shiftKey) {
        resetRef.current()
        if (modeRef.current === 'typing') {
          setTypingData(generateTypingData(testSettingsRef.current.value))
        }
        return
      }

      if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return
      if (key.length !== 1) return
      if (key === ' ') e.preventDefault()

      const ok = handleCharRef.current(key, (correctIdx) => {
        const note = currentSongRef.current?.seq?.[correctIdx]?.n
        if (note) playNoteRef.current(note)
      })

      if (!ok) {
        clearErrorTimer(key)
        setErrorKeys(prev => {
          const next = new Set(prev)
          next.add(key)
          return next
        })
        errorTimersRef.current[key] = setTimeout(() => {
          setErrorKeys(prev => {
            const next = new Set(prev)
            next.delete(key)
            return next
          })
          delete errorTimersRef.current[key]
        }, 180)
      }
    }
    const handleUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      clearReleaseTimer(key)
      // Keep the key highlighted briefly so fast taps are still visible.
      releaseTimersRef.current[key] = setTimeout(() => {
        setPressedKeys(prev => {
          const next = new Set(prev)
          next.delete(key)
          return next
        })
        delete releaseTimersRef.current[key]
      }, 80)
    }
    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
      Object.values(releaseTimersRef.current).forEach(clearTimeout)
      releaseTimersRef.current = {}
      Object.values(errorTimersRef.current).forEach(clearTimeout)
      errorTimersRef.current = {}
    }
  }, [])

  const currentSong = mode === 'piano' ? allSongs[activeSongId] : typingData
  const { idx, errors, wpm, acc, elapsed, finished, progress, handleChar, reset } = useGame(
    currentSong, 
    testSettings.type === 'time' ? testSettings.value : null
  )

  const wordProgress = useMemo(() => {
    if (mode !== 'typing' || !currentSong?.seq?.length) return null
    const chars = currentSong.seq.map(step => step.k)
    const text = chars.join('').trim()
    if (!text) return null

    const totalWords = text.split(/\s+/).filter(Boolean).length
    if (totalWords === 0) return null

    const completedWords = currentSong.seq
      .slice(0, idx)
      .reduce((count, step) => count + (step.k === ' ' ? 1 : 0), 0)

    const currentWord = finished
      ? totalWords
      : Math.min(totalWords, completedWords + 1)

    return `${currentWord}/${totalWords}`
  }, [mode, currentSong, idx, finished])

  const currentSongRef = useRef(currentSong)
  const handleCharRef = useRef(handleChar)
  const resetRef = useRef(reset)
  const playNoteRef = useRef<(note: string) => void>(() => {})

  const playNote = useCallback((note: string) => {
    if (mode === 'typing') return // No piano sound in dedicated typing mode
    const audio = getAudio(note)
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [mode])
  
  useEffect(() => {
    finishedRef.current = finished
    isManagerOpenRef.current = isManagerOpen
    modeRef.current = mode
    testSettingsRef.current = testSettings
    currentSongRef.current = currentSong
    handleCharRef.current = handleChar
    resetRef.current = reset
    playNoteRef.current = playNote
  }, [finished, isManagerOpen, mode, testSettings, currentSong, handleChar, reset, playNote])

  const handleAddSong = (newSong) => {
    const id = `user_${Date.now()}`
    setUserSongs(prev => ({ ...prev, [id]: newSong }))
    setActiveSongId(id)
    setIsManagerOpen(false)
    setMode('piano')
  }

  const handleDeleteSong = (id) => {
    setUserSongs(prev => {
        const next = { ...prev }
        delete next[id]
        return next
    })
    if (activeSongId === id) setActiveSongId('mario')
  }

  return (
    <div className="min-h-screen text-brand-main font-sans selection:bg-brand-extra/30 animate-fade-in flex flex-col items-center overflow-x-hidden">
      <Header 
        mode={mode} 
        onModeChange={(m) => {
            setMode(m)
            reset()
        }} 
        onOpenManager={() => setIsManagerOpen(true)} 
      />
      
      <main className="w-full max-w-6xl px-4 md:px-8 flex-1 flex flex-col justify-center pb-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 md:mb-8">
            <StatsBar 
                wpm={wpm} 
                acc={acc} 
                elapsed={elapsed} 
                isTimeMode={mode === 'typing' && testSettings.type === 'time'}
                timeLimit={testSettings.value}
                wordProgress={wordProgress}
            />
            
            {mode === 'typing' && (
                <SettingsBar settings={testSettings} onSettingsChange={setTestSettings} />
            )}
        </div>
        
        <div className="relative rounded-3xl p-4 md:p-8 overflow-hidden group min-h-[280px] flex items-center mb-6">
          <TypingArea 
            song={currentSong} 
            currentIdx={idx} 
            mode={mode}
            onReset={() => {
              reset()
              if (mode === 'typing') setTypingData(generateTypingData(testSettings.value))
            }}
          />
          
          {mode === 'piano' && (
            <FloatingNotes note={currentSong.seq[idx]?.n} active={idx > 0 && !finished} />
          )}
        </div>

        {mode === 'piano' && (
          <SongLibrary 
            songs={allSongs}
            activeSongId={activeSongId} 
            onSelect={(id) => {
                setActiveSongId(id)
                reset()
            }} 
            onOpenManager={() => setIsManagerOpen(true)}
          />
        )}
        {/* Visual Keyboard */}
        <div className="mt-auto py-4">
          <Keyboard 
            pressedKeys={pressedKeys} 
            errorKeys={errorKeys}
            targetKey={currentSong?.seq?.[idx]?.k?.toLowerCase()}
          />
        </div>
      </main>

      {isManagerOpen && (
        <LibraryManager 
          userSongs={userSongs} 
          onAdd={handleAddSong} 
          onDelete={handleDeleteSong}
          onClose={() => setIsManagerOpen(false)} 
        />
      )}

      {finished && (
        <CompletionOverlay 
          wpm={wpm} 
          acc={acc} 
          count={idx}
          mode={mode}
          onRestart={() => {
            reset()
            if (mode === 'typing') setTypingData(generateTypingData(testSettings.value))
          }} 
        />
      )}

      <footer className="py-6 text-brand-sub text-[11px] font-mono uppercase tracking-[2px] flex flex-wrap gap-4 md:gap-8 items-center justify-center opacity-60 hover:opacity-100 transition-opacity w-full">
        <div className="flex gap-2 items-center">
          <kbd className="px-2 py-1 glass-chip">esc</kbd>
          <span>reset</span>
        </div>
        <div className="flex gap-2 items-center">
          <kbd className="px-2 py-1 glass-chip">shift</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 glass-chip">enter</kbd>
          <span>restart</span>
        </div>
      </footer>
    </div>
  )
}
