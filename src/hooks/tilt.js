const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches

// Inclina un elemento según el puntero escribiendo --rx / --ry (sin re-render).
export function createTilt(max = 8) {
  return {
    onPointerMove(e) {
      if (e.pointerType !== 'mouse' || !canTilt()) return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`)
    },
    onPointerLeave(e) {
      e.currentTarget.style.setProperty('--ry', '0deg')
      e.currentTarget.style.setProperty('--rx', '0deg')
    },
  }
}
