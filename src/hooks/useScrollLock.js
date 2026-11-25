import { useEffect } from 'react'

// Bloquea el scroll en <html> (el contenedor real de scroll). Bloquearlo en <body>
// rompe el header sticky porque html tiene overflow-x: clip.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = prev }
  }, [locked])
}
