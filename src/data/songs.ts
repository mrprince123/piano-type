// Each song: { title, meta, bpm, seq: [{n: noteName, k: keyToPress}] }

interface Song {
  title: string
  meta: string
  bpm: number
  seq: { n: string; k: string }[]
}

interface Songs {
  [key: string]: Song
}

export const SONGS: Songs = {
  undertaker: {
    title: 'The Undertaker — Rest in Peace',
    meta: 'WWE Ministry Theme · 58 BPM · dark & brooding',
    bpm: 58,
    seq: [
      {n:'E2',k:'e'},{n:'E2',k:'e'},{n:'E2',k:'e'},{n:'B2',k:'b'},
      {n:'A2',k:'a'},{n:'G2',k:'g'},{n:'E2',k:'e'},{n:'G2',k:'g'},
      {n:'A2',k:'a'},{n:'E2',k:'e'},{n:'E3',k:'r'},{n:'D3',k:'d'},
      {n:'E2',k:'e'},{n:'E2',k:'e'},{n:'E2',k:'e'},{n:'B2',k:'b'},
      {n:'A2',k:'a'},{n:'G2',k:'g'},{n:'E2',k:'e'},{n:'G2',k:'g'},
      {n:'A2',k:'a'},{n:'G2',k:'g'},{n:'F2',k:'f'},{n:'E2',k:'e'},
      {n:'D2',k:'s'},{n:'E2',k:'e'},{n:'F2',k:'f'},{n:'G2',k:'g'},
      {n:'A2',k:'a'},{n:'B2',k:'b'},{n:'C3',k:'c'},{n:'B2',k:'b'},
      {n:'A2',k:'a'},{n:'G2',k:'g'},{n:'F2',k:'f'},{n:'E2',k:'e'},
    ],
  },

  mario: {
    title: 'Super Mario Bros — Main Theme',
    meta: 'Koji Kondo · Nintendo · 206 BPM · cheerful',
    bpm: 206,
    seq: [
      {n:'E5',k:'e'},{n:'E5',k:'e'},{n:'E5',k:'e'},{n:'C5',k:'c'},
      {n:'E5',k:'e'},{n:'G5',k:'g'},{n:'G4',k:'q'},
      {n:'C5',k:'c'},{n:'G4',k:'q'},{n:'E4',k:'w'},
      {n:'A4',k:'a'},{n:'B4',k:'b'},{n:'Bb4',k:'v'},{n:'A4',k:'a'},
      {n:'G4',k:'q'},{n:'E5',k:'e'},{n:'G5',k:'g'},{n:'A5',k:'h'},
      {n:'F5',k:'f'},{n:'G5',k:'g'},{n:'E5',k:'e'},
      {n:'C5',k:'c'},{n:'D5',k:'d'},{n:'B4',k:'b'},
      {n:'C5',k:'c'},{n:'G4',k:'q'},{n:'E4',k:'w'},
      {n:'A4',k:'a'},{n:'B4',k:'b'},{n:'Bb4',k:'v'},{n:'A4',k:'a'},
      {n:'G4',k:'q'},{n:'E5',k:'e'},{n:'G5',k:'g'},{n:'A5',k:'h'},
      {n:'F5',k:'f'},{n:'G5',k:'g'},{n:'E5',k:'e'},
    ],
  },

  tetris: {
    title: 'Tetris — Korobeiniki',
    meta: 'Traditional Russian · 162 BPM · fast & joyful',
    bpm: 162,
    seq: [
      {n:'E5',k:'e'},{n:'B4',k:'b'},{n:'C5',k:'c'},{n:'D5',k:'d'},
      {n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},{n:'A4',k:'a'},
      {n:'C5',k:'c'},{n:'E5',k:'e'},{n:'D5',k:'d'},{n:'C5',k:'c'},
      {n:'B4',k:'b'},{n:'C5',k:'c'},{n:'D5',k:'d'},{n:'E5',k:'e'},
      {n:'C5',k:'c'},{n:'A4',k:'a'},{n:'A4',k:'a'},{n:'A4',k:'a'},
      {n:'B4',k:'b'},{n:'C5',k:'c'},{n:'D5',k:'d'},{n:'F5',k:'f'},
      {n:'A5',k:'h'},{n:'G5',k:'g'},{n:'F5',k:'f'},{n:'E5',k:'e'},
      {n:'C5',k:'c'},{n:'E5',k:'e'},{n:'D5',k:'d'},{n:'C5',k:'c'},
      {n:'B4',k:'b'},{n:'B4',k:'b'},{n:'C5',k:'c'},{n:'D5',k:'d'},
    ],
  },

  zelda: {
    title: 'Zelda — Main Theme',
    meta: 'Koji Kondo · Nintendo · 126 BPM · heroic',
    bpm: 126,
    seq: [
      {n:'D5',k:'d'},{n:'D5',k:'d'},{n:'D5',k:'d'},
      {n:'G4',k:'q'},{n:'D5',k:'d'},{n:'C5',k:'c'},
      {n:'B4',k:'b'},{n:'A4',k:'a'},{n:'G4',k:'q'},
      {n:'B4',k:'b'},{n:'D5',k:'d'},{n:'G5',k:'g'},
      {n:'F5',k:'f'},{n:'G5',k:'g'},{n:'D5',k:'d'},
      {n:'D5',k:'d'},{n:'D5',k:'d'},{n:'G4',k:'q'},
      {n:'D5',k:'d'},{n:'C5',k:'c'},{n:'B4',k:'b'},
      {n:'A4',k:'a'},{n:'G4',k:'q'},{n:'B4',k:'b'},
      {n:'D5',k:'d'},{n:'G5',k:'g'},{n:'A5',k:'h'},
      {n:'G5',k:'g'},{n:'F5',k:'f'},{n:'E5',k:'e'},
      {n:'D5',k:'d'},{n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},
    ],
  },

  moonlight: {
    title: 'Moonlight Sonata — 1st Movement',
    meta: 'Beethoven · 60 BPM · melancholic & vast',
    bpm: 60,
    seq: [
      {n:'Ab3',k:'j'},{n:'C4',k:'c'},{n:'E4',k:'e'},
      {n:'Ab3',k:'j'},{n:'C4',k:'c'},{n:'E4',k:'e'},
      {n:'Ab3',k:'j'},{n:'C4',k:'c'},{n:'E4',k:'e'},
      {n:'Ab3',k:'j'},{n:'Db4',k:'z'},{n:'F4',k:'f'},
      {n:'Ab3',k:'j'},{n:'Db4',k:'z'},{n:'F4',k:'f'},
      {n:'Ab3',k:'j'},{n:'Db4',k:'z'},{n:'F4',k:'f'},
      {n:'G3',k:'l'},{n:'Db4',k:'z'},{n:'F4',k:'f'},
      {n:'G3',k:'l'},{n:'Db4',k:'z'},{n:'F4',k:'f'},
      {n:'Ab3',k:'j'},{n:'C4',k:'c'},{n:'Eb4',k:'x'},
      {n:'Ab3',k:'j'},{n:'C4',k:'c'},{n:'Eb4',k:'x'},
      {n:'Ab2',k:'u'},{n:'Ab3',k:'j'},{n:'C4',k:'c'},
    ],
  },

  pirates: {
    title: "Pirates of the Caribbean — He's a Pirate",
    meta: 'Hans Zimmer · 172 BPM · adventurous',
    bpm: 172,
    seq: [
      {n:'A3',k:'a'},{n:'C4',k:'c'},{n:'D4',k:'d'},
      {n:'D4',k:'d'},{n:'E4',k:'e'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'C4',k:'c'},
      {n:'A3',k:'a'},{n:'A3',k:'a'},{n:'C4',k:'c'},
      {n:'D4',k:'d'},{n:'D4',k:'d'},{n:'E4',k:'e'},
      {n:'F4',k:'f'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'C4',k:'c'},{n:'A3',k:'a'},
      {n:'A3',k:'a'},{n:'B3',k:'n'},{n:'C4',k:'c'},
      {n:'D4',k:'d'},{n:'E4',k:'e'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'C4',k:'c'},
      {n:'A3',k:'a'},{n:'G3',k:'o'},{n:'A3',k:'a'},
    ],
  },

  imperial: {
    title: 'Star Wars — Imperial March',
    meta: 'John Williams · 104 BPM · powerful',
    bpm: 104,
    seq: [
      {n:'G4',k:'g'},{n:'G4',k:'g'},{n:'G4',k:'g'},
      {n:'Eb4',k:'x'},{n:'Bb4',k:'v'},{n:'G4',k:'g'},
      {n:'Eb4',k:'x'},{n:'Bb4',k:'v'},{n:'G4',k:'g'},
      {n:'D5',k:'d'},{n:'D5',k:'d'},{n:'D5',k:'d'},
      {n:'Eb5',k:'p'},{n:'Bb4',k:'v'},{n:'Gb4',k:'k'},
      {n:'Eb4',k:'x'},{n:'Bb4',k:'v'},{n:'G4',k:'g'},
      {n:'G5',k:'m'},{n:'G4',k:'g'},{n:'G4',k:'g'},
      {n:'G5',k:'m'},{n:'F5',k:'f'},{n:'E5',k:'e'},
      {n:'Eb5',k:'p'},{n:'E5',k:'e'},{n:'Ab4',k:'i'},
      {n:'Db5',k:'y'},{n:'C5',k:'c'},{n:'B4',k:'b'},
      {n:'Bb4',k:'v'},{n:'Bb4',k:'v'},{n:'Eb4',k:'x'},
      {n:'Gb4',k:'k'},{n:'Eb4',k:'x'},{n:'Bb4',k:'v'},
    ],
  },

  megalovania: {
    title: 'Megalovania — Undertale',
    meta: 'Toby Fox · 218 BPM · intense & relentless',
    bpm: 218,
    seq: [
      {n:'D4',k:'d'},{n:'D4',k:'d'},{n:'D5',k:'t'},{n:'A4',k:'a'},
      {n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'C4',k:'c'},{n:'C4',k:'c'},{n:'D5',k:'t'},{n:'A4',k:'a'},
      {n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'B3',k:'j'},{n:'B3',k:'j'},{n:'D5',k:'t'},{n:'A4',k:'a'},
      {n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'Bb3',k:'h'},{n:'Bb3',k:'h'},{n:'D5',k:'t'},{n:'A4',k:'a'},
      {n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'F4',k:'f'},{n:'G4',k:'g'},
    ],
  },

  canon: {
    title: "Pachelbel's Canon in D",
    meta: 'Johann Pachelbel · 96 BPM · baroque & timeless',
    bpm: 96,
    seq: [
      {n:'D5',k:'d'},{n:'A4',k:'a'},{n:'B4',k:'b'},{n:'F4',k:'f'},
      {n:'G4',k:'g'},{n:'D4',k:'s'},{n:'G4',k:'g'},{n:'A4',k:'a'},
      {n:'D5',k:'d'},{n:'A4',k:'a'},{n:'B4',k:'b'},{n:'F4',k:'f'},
      {n:'G4',k:'g'},{n:'D4',k:'s'},{n:'G4',k:'g'},{n:'A4',k:'a'},
      {n:'F4',k:'f'},{n:'D4',k:'s'},{n:'F4',k:'f'},{n:'A4',k:'a'},
      {n:'G4',k:'g'},{n:'D4',k:'s'},{n:'G4',k:'g'},{n:'B4',k:'b'},
      {n:'A4',k:'a'},{n:'E4',k:'e'},{n:'A4',k:'a'},{n:'C5',k:'c'},
      {n:'D5',k:'d'},{n:'A4',k:'a'},{n:'D5',k:'d'},{n:'F5',k:'f'},
    ],
  },

  ode: {
    title: 'Ode to Joy — Symphony No.9',
    meta: 'Beethoven · 110 BPM · triumphant',
    bpm: 110,
    seq: [
      {n:'E4',k:'e'},{n:'E4',k:'e'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'G4',k:'g'},{n:'F4',k:'f'},{n:'E4',k:'e'},{n:'D4',k:'d'},
      {n:'C4',k:'c'},{n:'C4',k:'c'},{n:'D4',k:'d'},{n:'E4',k:'e'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'D4',k:'d'},
      {n:'E4',k:'e'},{n:'E4',k:'e'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'G4',k:'g'},{n:'F4',k:'f'},{n:'E4',k:'e'},{n:'D4',k:'d'},
      {n:'C4',k:'c'},{n:'C4',k:'c'},{n:'D4',k:'d'},{n:'E4',k:'e'},
      {n:'D4',k:'d'},{n:'C4',k:'c'},{n:'C4',k:'c'},
    ],
  },

  cinderella: {
    title: 'Cinderella — A Dream Is a Wish',
    meta: 'Disney Classic · 88 BPM · magical & gentle',
    bpm: 88,
    seq: [
      {n:'C4',k:'c'},{n:'E4',k:'e'},{n:'G4',k:'g'},{n:'C5',k:'l'},
      {n:'B4',k:'b'},{n:'A4',k:'a'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'C4',k:'c'},{n:'E4',k:'e'},
      {n:'G4',k:'g'},{n:'C5',k:'l'},{n:'B4',k:'b'},{n:'A4',k:'a'},
      {n:'G4',k:'g'},{n:'E4',k:'e'},{n:'C4',k:'c'},{n:'D4',k:'d'},
      {n:'E4',k:'e'},{n:'F4',k:'f'},{n:'G4',k:'g'},{n:'A4',k:'a'},
      {n:'G4',k:'g'},{n:'F4',k:'f'},{n:'E4',k:'e'},{n:'D4',k:'d'},
      {n:'C4',k:'c'},{n:'G3',k:'o'},
    ],
  },

  interstellar: {
    title: 'Interstellar — Main Theme',
    meta: 'Hans Zimmer · 52 BPM · cosmic & vast',
    bpm: 52,
    seq: [
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'A3',k:'j'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'A3',k:'j'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'B3',k:'n'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'B3',k:'n'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'C4',k:'c'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'C4',k:'c'},
      {n:'A2',k:'a'},{n:'Db3',k:'z'},{n:'A3',k:'j'},
      {n:'A2',k:'a'},{n:'Db3',k:'z'},{n:'A3',k:'j'},
      {n:'G2',k:'g'},{n:'D3',k:'d'},{n:'G3',k:'l'},
      {n:'G2',k:'g'},{n:'D3',k:'d'},{n:'G3',k:'l'},
      {n:'A2',k:'a'},{n:'E3',k:'r'},{n:'A3',k:'j'},
    ],
  },

  riverflows: {
    title: 'River Flows in You',
    meta: 'Yiruma · 76 BPM · tender & romantic',
    bpm: 76,
    seq: [
      {n:'A4',k:'a'},{n:'B4',k:'b'},{n:'C5',k:'c'},{n:'E5',k:'e'},
      {n:'D5',k:'d'},{n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},
      {n:'B4',k:'b'},{n:'C5',k:'c'},{n:'E5',k:'e'},{n:'D5',k:'d'},
      {n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},{n:'G4',k:'g'},
      {n:'A4',k:'a'},{n:'B4',k:'b'},{n:'C5',k:'c'},{n:'E5',k:'e'},
      {n:'D5',k:'d'},{n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},
      {n:'B4',k:'b'},{n:'C5',k:'c'},{n:'A4',k:'a'},{n:'G4',k:'g'},
      {n:'F4',k:'f'},{n:'E4',k:'e'},{n:'F4',k:'f'},{n:'G4',k:'g'},
    ],
  },

  nocturne: {
    title: 'Nocturne in E♭ — Op.9 No.2',
    meta: 'Frédéric Chopin · 66 BPM · dreamy',
    bpm: 66,
    seq: [
      {n:'Eb5',k:'p'},{n:'D5',k:'d'},{n:'C5',k:'c'},{n:'Bb4',k:'v'},
      {n:'Ab4',k:'i'},{n:'Bb4',k:'v'},{n:'C5',k:'c'},{n:'Eb5',k:'p'},
      {n:'F5',k:'f'},{n:'Eb5',k:'p'},{n:'D5',k:'d'},{n:'C5',k:'c'},
      {n:'Bb4',k:'v'},{n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'Ab4',k:'i'},
      {n:'Bb4',k:'v'},{n:'C5',k:'c'},{n:'Eb5',k:'p'},{n:'F5',k:'f'},
      {n:'G5',k:'o'},{n:'F5',k:'f'},{n:'Eb5',k:'p'},{n:'D5',k:'d'},
      {n:'C5',k:'c'},{n:'Bb4',k:'v'},{n:'Ab4',k:'i'},{n:'Bb4',k:'v'},
      {n:'C5',k:'c'},{n:'Eb5',k:'p'},{n:'D5',k:'d'},{n:'C5',k:'c'},
    ],
  },

  bohemian: {
    title: 'Bohemian Rhapsody — Piano Intro',
    meta: 'Queen · Freddie Mercury · 72 BPM · epic',
    bpm: 72,
    seq: [
      {n:'Bb4',k:'v'},{n:'A4',k:'a'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'Eb4',k:'x'},{n:'D4',k:'d'},{n:'C4',k:'c'},{n:'Bb3',k:'h'},
      {n:'C4',k:'c'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},
      {n:'Bb4',k:'v'},{n:'Eb4',k:'x'},{n:'Bb4',k:'v'},{n:'Ab4',k:'i'},
      {n:'G4',k:'g'},{n:'F4',k:'f'},{n:'Bb4',k:'v'},{n:'G4',k:'g'},
      {n:'Eb4',k:'x'},{n:'F4',k:'f'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},
      {n:'C4',k:'c'},{n:'D4',k:'d'},{n:'Bb3',k:'h'},{n:'C4',k:'c'},
      {n:'Bb3',k:'h'},{n:'Ab3',k:'j'},{n:'G3',k:'l'},{n:'F3',k:'y'},
    ],
  },

  habanera: {
    title: 'Habanera — Carmen',
    meta: 'Georges Bizet · 96 BPM · fiery & bold',
    bpm: 96,
    seq: [
      {n:'D4',k:'d'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},
      {n:'F4',k:'f'},{n:'Eb4',k:'x'},{n:'D4',k:'d'},{n:'C4',k:'c'},
      {n:'D4',k:'d'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},
      {n:'Ab4',k:'i'},{n:'G4',k:'g'},{n:'F4',k:'f'},{n:'Eb4',k:'x'},
      {n:'D4',k:'d'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},
      {n:'F4',k:'f'},{n:'Eb4',k:'x'},{n:'D4',k:'d'},{n:'C4',k:'c'},
      {n:'Bb3',k:'h'},{n:'A3',k:'a'},{n:'Bb3',k:'h'},{n:'C4',k:'c'},
      {n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},{n:'D4',k:'d'},
    ],
  },

  fur_elise: {
    title: 'Für Elise',
    meta: 'Ludwig van Beethoven · 80 BPM · iconic',
    bpm: 80,
    seq: [
      {n:'E5',k:'e'},{n:'Eb5',k:'p'},{n:'E5',k:'e'},{n:'Eb5',k:'p'},
      {n:'E5',k:'e'},{n:'B4',k:'b'},{n:'D5',k:'d'},{n:'C5',k:'c'},
      {n:'A4',k:'a'},{n:'C4',k:'c'},{n:'E4',k:'e'},{n:'A4',k:'a'},
      {n:'B4',k:'b'},{n:'E4',k:'e'},{n:'Ab4',k:'i'},{n:'B4',k:'b'},
      {n:'C5',k:'c'},{n:'E4',k:'e'},{n:'E5',k:'e'},{n:'Eb5',k:'p'},
      {n:'E5',k:'e'},{n:'Eb5',k:'p'},{n:'E5',k:'e'},{n:'B4',k:'b'},
      {n:'D5',k:'d'},{n:'C5',k:'c'},{n:'A4',k:'a'},{n:'C4',k:'c'},
      {n:'E4',k:'e'},{n:'A4',k:'a'},{n:'B4',k:'b'},{n:'E4',k:'e'},
      {n:'C5',k:'c'},{n:'B4',k:'b'},{n:'A4',k:'a'},
    ],
  },

  pink_panther: {
    title: 'The Pink Panther Theme',
    meta: 'Henry Mancini · 120 BPM · cool & jazzy',
    bpm: 120,
    seq: [
      {n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'Db4',k:'z'},{n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'Eb4',k:'x'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'Bb4',k:'v'},{n:'A4',k:'a'},{n:'G4',k:'g'},{n:'F4',k:'f'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'E4',k:'e'},{n:'F4',k:'f'},
      {n:'D4',k:'d'},{n:'E4',k:'e'},{n:'F4',k:'f'},{n:'G4',k:'g'},
      {n:'E4',k:'e'},{n:'D4',k:'d'},{n:'Db4',k:'z'},{n:'D4',k:'d'},
    ],
  },

  hedwigs: {
    title: "Hedwig's Theme — Harry Potter",
    meta: 'John Williams · 94 BPM · magical & mysterious',
    bpm: 94,
    seq: [
      {n:'B4',k:'b'},{n:'E5',k:'e'},{n:'G5',k:'g'},{n:'F5',k:'f'},
      {n:'E5',k:'e'},{n:'B5',k:'q'},{n:'A5',k:'h'},{n:'F5',k:'f'},
      {n:'E5',k:'e'},{n:'G5',k:'g'},{n:'F5',k:'f'},{n:'Eb5',k:'p'},
      {n:'F5',k:'f'},{n:'B4',k:'b'},{n:'B4',k:'b'},{n:'E5',k:'e'},
      {n:'G5',k:'g'},{n:'F5',k:'f'},{n:'E5',k:'e'},{n:'B5',k:'q'},
      {n:'D6',k:'2'},{n:'Db6',k:'1'},{n:'D6',k:'2'},{n:'C6',k:'3'},
      {n:'B5',k:'q'},{n:'E5',k:'e'},{n:'G5',k:'g'},{n:'F5',k:'f'},
      {n:'E5',k:'e'},{n:'B5',k:'q'},{n:'A5',k:'h'},{n:'F5',k:'f'},
    ],
  },
};

export const SONG_IDS = Object.keys(SONGS);
