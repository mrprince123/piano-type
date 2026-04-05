# PianoType 🎹

A Monkeytype-style piano typing game with 88-key full-spectrum sound, hall reverb, and 18 songs.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Songs included (18)

| Song | Artist | BPM |
|------|--------|-----|
| The Undertaker — Rest in Peace | WWE | 58 |
| Super Mario Bros | Koji Kondo | 206 |
| Tetris (Korobeiniki) | Traditional | 162 |
| Zelda Main Theme | Koji Kondo | 126 |
| Moonlight Sonata | Beethoven | 60 |
| Pirates of the Caribbean | Hans Zimmer | 172 |
| Imperial March | John Williams | 104 |
| Megalovania | Toby Fox | 218 |
| Canon in D | Pachelbel | 96 |
| Ode to Joy | Beethoven | 110 |
| A Dream Is a Wish (Cinderella) | Disney | 88 |
| Interstellar Main Theme | Hans Zimmer | 52 |
| River Flows in You | Yiruma | 76 |
| Nocturne in E♭ | Chopin | 66 |
| Bohemian Rhapsody | Queen | 72 |
| Habanera (Carmen) | Bizet | 96 |
| Für Elise | Beethoven | 80 |
| Hedwig's Theme | John Williams | 94 |
| Pink Panther Theme | Henry Mancini | 120 |

## How to play

- Click the typing area or press any key to focus
- Type the letters shown on screen — each correct key plays its piano note
- Press **Tab** to restart at any time
- Click **▶ auto-play** to hear the song play itself

## Sound engine

- Full 88-key frequency map (A0 27.5 Hz → C8 4186 Hz)
- 8 layered harmonic oscillators per note (triangle + sine partials)
- Sub-octave bass for weight and depth
- Inharmonicity shimmer oscillator
- Hammer-felt transient click on attack
- 3.6-second hall reverb impulse response
- Warm low-pass filter per note
- Stereo panning on alternating harmonics

## Tech stack

- React 18 + Vite
- Web Audio API (no external audio libraries)
- DM Sans + DM Mono + Playfair Display (Google Fonts)
- Pure CSS (no Tailwind or UI libraries)
