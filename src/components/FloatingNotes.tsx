import { useState, useEffect } from 'react'

export default function FloatingNotes({ note, active }) {
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (active && note) {
      const id = Date.now() + Math.random()
      const newNote = {
        id,
        left: Math.random() * 80 + 10 + '%',
        symbol: ['♩', '♪', '♫', '♬'][Math.floor(Math.random() * 4)]
      }
      
      setElements(prev => [...prev, newNote])
      
      setTimeout(() => {
        setElements(prev => prev.filter(n => n.id !== id))
      }, 2000)
    }
  }, [note, active])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(el => (
        <span 
          key={el.id}
          className="absolute bottom-0 text-brand-extra opacity-40 text-2xl animate-float-up"
          style={{ left: el.left }}
        >
          {el.symbol}
        </span>
      ))}
    </div>
  )
}
