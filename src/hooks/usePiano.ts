import { useRef, useCallback } from 'react'
import { FREQS } from '../data/frequencies'

export function usePiano() {
  const actxRef = useRef(null)

  const getAC = useCallback(() => {
    if (!actxRef.current) {
      actxRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)()
    }
    if (actxRef.current.state === 'suspended') actxRef.current.resume()
    return actxRef.current
  }, [])

  const playNote = useCallback((noteName, bpm) => {
    const freq = FREQS[noteName]
    if (!freq) return

    const c = getAC()
    const beat = 60 / bpm
    const dur = Math.min(beat * 2.4, 2.6)

    // Master gain envelope
    const master = c.createGain()
    master.gain.setValueAtTime(0, c.currentTime)
    master.gain.linearRampToValueAtTime(0.78, c.currentTime + 0.005)
    master.gain.setValueAtTime(0.78, c.currentTime + 0.01)
    master.gain.exponentialRampToValueAtTime(0.3, c.currentTime + dur * 0.22)
    master.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
    master.connect(c.destination)

    // Hall reverb impulse — large & open
    const rLen = Math.floor(c.sampleRate * 3.6)
    const rBuf = c.createBuffer(2, rLen, c.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const dat = rBuf.getChannelData(ch)
      for (let i = 0; i < rLen; i++) {
        const dec = Math.pow(1 - i / rLen, 1.4)
        dat[i] = (Math.random() * 2 - 1) * dec * (i < 400 ? i / 400 : 1)
      }
    }
    const rev = c.createConvolver()
    rev.buffer = rBuf
    const rg = c.createGain()
    rg.gain.value = 0.55
    rev.connect(rg)
    rg.connect(c.destination)

    // Warm low-pass
    const lpf = c.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = Math.min(freq * 16, 9000)
    lpf.Q.value = 0.5
    lpf.connect(master)
    lpf.connect(rev)

    // Stereo panners
    const pan1 = c.createStereoPanner()
    const pan2 = c.createStereoPanner()
    pan1.pan.value = -0.25
    pan2.pan.value = 0.25

    // 8 harmonic partials for full-spectrum richness
    const partials = [
      [0.5,   'sine',     0.42],
      [1,     'triangle', 1.00],
      [2,     'sine',     0.50],
      [3,     'sine',     0.26],
      [4,     'sine',     0.16],
      [5,     'sine',     0.09],
      [6,     'sine',     0.05],
      [2.001, 'sine',     0.07], // inharmonicity shimmer
    ]

    partials.forEach(([mult, type, vol], pi) => {
      const o = c.createOscillator()
      const g = c.createGain()
      o.type = type as OscillatorType
      o.frequency.value = freq * (mult as number)
      const dRate = dur * (0.2 + 0.8 / Math.max(mult as number, 0.5))
      g.gain.setValueAtTime(vol, c.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dRate)
      o.connect(g)
      if (pi % 2 === 0) { g.connect(pan1); pan1.connect(lpf) }
      else               { g.connect(pan2); pan2.connect(lpf) }
      o.start()
      o.stop(c.currentTime + dur + 0.1)
    })

    // Hammer felt transient click
    const click = c.createOscillator()
    const cg = c.createGain()
    click.type = 'square'
    click.frequency.value = freq * 8
    cg.gain.setValueAtTime(0.12, c.currentTime)
    cg.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.018)
    click.connect(cg)
    cg.connect(master)
    click.start()
    click.stop(c.currentTime + 0.02)
  }, [getAC])

  const resume = useCallback(() => getAC(), [getAC])

  return { playNote, resume }
}
