import { useCallback } from 'react'

export function useNoteFloat() {
  const spawn = useCallback((x, y, label) => {
    const el = document.createElement('div')
    el.className = 'note-float'
    el.textContent = label
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    el.style.opacity = '1'
    document.body.appendChild(el)

    let cy = y, op = 1
    const step = () => {
      cy -= 1.8
      op -= 0.038
      el.style.top = cy + 'px'
      el.style.opacity = op.toString()
      if (op > 0) requestAnimationFrame(step)
      else el.remove()
    }
    requestAnimationFrame(step)
  }, [])

  return spawn
}
