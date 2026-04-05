// Full 88-key piano frequency map: A0 (midi 21) → C8 (midi 108)
const NOTE_NAMES: string[] = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

export const FREQS: Record<string, number> = {};

for (let midi = 21; midi <= 108; midi++) {
  const oct = Math.floor((midi - 12) / 12);
  const name = NOTE_NAMES[midi % 12] + oct;
  FREQS[name] = 440 * Math.pow(2, (midi - 69) / 12);
}

// Sharp aliases
const ALIASES = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
Object.entries(ALIASES).forEach(([sharp, flat]) => {
  for (let o = 0; o <= 8; o++) {
    if (FREQS[flat + o]) FREQS[sharp + o] = FREQS[flat + o];
  }
});
