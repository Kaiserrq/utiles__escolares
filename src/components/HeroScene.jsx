import { useEffect, useRef } from 'react'

const lerp = (a, b, t) => a + (b - a) * t

// Escena 3D de útiles. Inclinación con el puntero (lerp con rAF) solo con ratón y sin reduced-motion.
export default function HeroScene() {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const hero = stage?.closest('.hero')
    if (!stage || !hero) return undefined
    const ok = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
    if (!ok.matches) return undefined

    const cur = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let raf = 0

    const frame = () => {
      cur.x = lerp(cur.x, target.x, 0.08)
      cur.y = lerp(cur.y, target.y, 0.08)
      stage.style.transform = `rotateX(${cur.x.toFixed(2)}deg) rotateY(${cur.y.toFixed(2)}deg)`
      if (Math.abs(cur.x - target.x) > 0.01 || Math.abs(cur.y - target.y) > 0.01) {
        raf = requestAnimationFrame(frame)
      } else {
        raf = 0
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const r = hero.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      target.y = nx * 24
      target.x = -ny * 24
      kick()
    }
    const onLeave = () => { target.x = 0; target.y = 0; kick() }

    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scene" aria-hidden="true">
      <div className="stage" ref={stageRef}>
        {/* Formas 2D al fondo */}
        <div className="layer l-circle"><div className="float f2"><span className="blob-pink" /></div></div>
        <div className="layer l-squiggle">
          <div className="float f3">
            <svg viewBox="0 0 160 60" width="160" height="60">
              <path d="M6 40 C20 6, 34 6, 40 30 S62 54, 76 22 S104 4, 116 34 S142 50, 154 14" fill="none" stroke="#3ff2a0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="layer l-star">
          <div className="float f1">
            <svg viewBox="0 0 80 80" width="76" height="76">
              <path d="M40 6 L48 30 L74 32 L53 47 L61 72 L40 57 L19 72 L27 47 L6 32 L32 30 Z" fill="#fff04a" stroke="#0e1766" strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Cuaderno (caja 3D) */}
        <div className="layer l-notebook">
          <div className="float f1">
            <div className="nb">
              <div className="nb-face nb-front">
                <span className="nb-binding" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <span key={i} className="nb-ring" style={{ '--n': i }} />)}
                <div className="nb-label">
                  <span className="nb-name">Mate</span>
                  <span className="nb-line" /><span className="nb-line short" />
                </div>
                <span className="nb-sticker" />
              </div>
              <div className="nb-face nb-back" />
              <div className="nb-face nb-side" />
              <div className="nb-face nb-top" />
            </div>
          </div>
        </div>

        {/* Regla */}
        <div className="layer l-ruler">
          <div className="float f2"><div className="ruler"><span className="ruler-hole" /></div></div>
        </div>

        {/* Lápiz */}
        <div className="layer l-pencil">
          <div className="float f3">
            <svg viewBox="0 0 40 300" width="40" height="300">
              <g stroke="#0e1766" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
                <rect x="6" y="276" width="28" height="18" rx="5" fill="#ff8fc4" />
                <rect x="6" y="256" width="28" height="22" fill="#d9deff" />
                <path d="M12 256v22M28 256v22" strokeWidth="2.2" />
                <rect x="6" y="54" width="28" height="204" fill="#fff04a" />
                <path d="M20 54v204" strokeWidth="2.2" opacity=".35" />
                <path d="M6 54 L20 8 L34 54 Z" fill="#f6d7a8" />
                <path d="M15.5 24 L20 8 L24.5 24 Z" fill="#0e1766" strokeWidth="2" />
              </g>
              <rect x="10" y="62" width="5" height="186" fill="#fff" opacity=".5" />
            </svg>
          </div>
        </div>

        {/* Resaltador */}
        <div className="layer l-highlighter">
          <div className="float f1">
            <svg viewBox="0 0 50 190" width="50" height="190">
              <g stroke="#0e1766" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
                <path d="M16 168 L20 186 H30 L34 168 Z" fill="#ff4fa3" />
                <path d="M8 138 L16 168 H34 L42 138 Z" fill="#0e1766" />
                <rect x="6" y="8" width="38" height="132" rx="8" fill="#ff4fa3" />
                <rect x="6" y="52" width="38" height="36" fill="#f7f9ff" />
                <path d="M14 66h22M14 76h14" strokeWidth="2.4" opacity=".55" />
              </g>
              <rect x="12" y="16" width="6" height="112" rx="3" fill="#fff" opacity=".45" />
            </svg>
          </div>
        </div>

        {/* Nota a mano */}
        <div className="layer l-note">
          <div className="float f2">
            <p className="hand-note">¡15% en mochilas!</p>
            <svg className="note-arrow" viewBox="0 0 90 70" width="90" height="70">
              <path d="M8 6 C50 6, 76 22, 70 58" fill="none" stroke="#0e1766" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M56 48 L70 60 L80 44" fill="none" stroke="#0e1766" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
