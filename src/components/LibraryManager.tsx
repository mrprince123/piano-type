import { useState } from 'react'

interface Song {
  title: string
  meta: string
  bpm: number
  seq: { k: string; n: string }[]
}

export default function LibraryManager({ userSongs, onAdd, onDelete, onClose }) {
  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState(120)
  const [keys, setKeys] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !keys) {
        setError('Title and Keys are required')
        return
    }

    // Basic heuristic: map all characters to C4 for simplicity
    // User can just type "Twinkle twinkle little star" and it becomes a sequence
    const sequence = keys.split('').map(char => ({
        n: 'C4', // Default note
        k: char
    }))

    onAdd({
      title,
      meta: `${bpm} BPM · custom user library`,
      bpm: bpm,
      seq: sequence
    })

    setTitle('')
    setKeys('')
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-brand-bg/55 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="w-full max-w-3xl glass-panel rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        <div className="p-6 md:p-8 border-b border-white/15 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-2xl font-bold text-brand-main">Library Manager</h2>
            <p className="text-brand-sub text-sm mt-1">Add custom typing tracks or manage your library</p>
          </div>
          <button onClick={onClose} className="glass-chip text-brand-sub hover:text-brand-main p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 custom-scrollbar">
          {/* Add Form */}
          <section>
            <h3 className="text-brand-extra uppercase tracking-widest text-[11px] font-bold mb-6">Add New Track</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase text-brand-sub ml-1 font-mono">Track Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Favorite Poem"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:border-brand-extra outline-none transition-all placeholder:text-brand-sub/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase text-brand-sub ml-1 font-mono">BPM (Tempo)</label>
                  <input 
                    type="number" 
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:border-brand-extra outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] uppercase text-brand-sub ml-1 font-mono">Sequence (Keys to Type)</label>
                <textarea 
                  value={keys}
                  onChange={(e) => setKeys(e.target.value)}
                  placeholder="Paste the text you want to practice typing..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:border-brand-extra outline-none transition-all placeholder:text-brand-sub/60 resize-none font-mono text-sm leading-relaxed"
                />
              </div>

              {error && (
                <div className="glass-chip border-brand-error/60 bg-brand-error/20 px-3 py-2 text-brand-main text-xs">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-brand-extra/80 text-brand-bg-dark font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-brand-extra/20"
              >
                Add to Library
              </button>
            </form>
          </section>

          {/* User Songs List */}
          {Object.keys(userSongs).length > 0 && (
            <section>
              <h3 className="text-brand-extra uppercase tracking-widest text-[11px] font-bold mb-6">Your Tracks</h3>
              <div className="space-y-3">
                {Object.entries(userSongs).map(([id, song]) => {
                  const s = song as Song
                  return (
                  <div key={id} className="flex justify-between items-center p-4 glass-panel-subtle rounded-xl group">
                    <div>
                      <div className="font-medium text-brand-main">{s.title}</div>
                      <div className="text-[10px] text-brand-sub truncate w-64">{s.seq.length} characters</div>
                    </div>
                    <button 
                      onClick={() => onDelete(id)}
                      className="text-brand-sub hover:text-brand-error opacity-60 md:opacity-0 group-hover:opacity-100 transition-all p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
