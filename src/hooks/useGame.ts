import { useState, useRef, useCallback, useEffect } from 'react'

interface Song {
  seq: { k: string; n: string }[]
}

export function useGame(song: Song | null, timeLimit: number | null = null) {
  const [idx, setIdx] = useState(0)
  const [errors, setErrors] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [acc, setAcc] = useState(100)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)

  const startTimeRef = useRef(null)
  const tickerRef = useRef(null)
  const idxRef = useRef(0)
  const errorsRef = useRef(0)
  const totalRef = useRef(0)

  const keys = song ? song.seq.map(s => s.k) : []

  const stopTicker = useCallback(() => {
    if (tickerRef.current) {
      clearInterval(tickerRef.current)
      tickerRef.current = null
    }
  }, [])

  const startTicker = useCallback(() => {
    if (tickerRef.current) return
    tickerRef.current = setInterval(() => {
      if (!startTimeRef.current) return
      
      const now = Date.now()
      const s = (now - startTimeRef.current) / 1000
      const curIdx = idxRef.current
      const curErrs = errorsRef.current
      
      setElapsed(s)
      
      // Live WPM calculation
      const minutes = s / 60
      if (minutes > 0) {
        setWpm(Math.round((curIdx / 5) / minutes) || 0)
      }
      
      setAcc(curIdx > 0 ? Math.round(((curIdx - curErrs) / curIdx) * 100) : 100)

      // Time limit check
      if (timeLimit && s >= timeLimit) {
        stopTicker()
        setFinished(true)
      }
    }, 100) // 100ms for smooth live updates
  }, [timeLimit, stopTicker])

  const reset = useCallback(() => {
    stopTicker()
    startTimeRef.current = null
    idxRef.current = 0
    errorsRef.current = 0
    totalRef.current = 0
    setIdx(0)
    setErrors(0)
    setWpm(0)
    setAcc(100)
    setElapsed(0)
    setFinished(false)
  }, [stopTicker])

  // Reset when song changes
  useEffect(() => { reset() }, [song, reset])

  const handleChar = useCallback((char: string, onCorrect?: (correctIdx: number) => void) => {
    if (finished) return false
    const cur = idxRef.current
    
    // In time mode, we might want to loop or just stop at the end of keys
    // For now, if we reach the end of keys, we stop (standard behavior)
    if (cur >= keys.length) return false

    const expected = keys[cur]
    const ok = char.toLowerCase() === expected.toLowerCase()

    if (ok) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
        startTicker()
      }
      idxRef.current = cur + 1
      totalRef.current += 1
      setIdx(cur + 1)
      onCorrect && onCorrect(cur)

      if (cur + 1 >= keys.length) {
        stopTicker()
        const s = (Date.now() - startTimeRef.current) / 1000
        const finalIdx = cur + 1
        const finalErrs = errorsRef.current
        setWpm(Math.round((finalIdx / 5) / (s / 60)))
        setAcc(Math.round(((finalIdx - finalErrs) / finalIdx) * 100))
        setElapsed(s)
        setFinished(true)
      }
    } else {
      errorsRef.current += 1
      setErrors(e => e + 1)
      // Recalculate accuracy immediately on error for live feel
      if (idxRef.current > 0) {
        setAcc(Math.round(((idxRef.current - errorsRef.current) / idxRef.current) * 100))
      }
    }
    return ok
  }, [keys, startTicker, stopTicker, finished])

  const progress = keys.length > 0 ? (idx / keys.length) * 100 : 0

  return { idx, errors, wpm, acc, elapsed, finished, progress, handleChar, reset }
}
