import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Ocupa las celdas vacías de la última fila del grid para que no queden huecos.
export default function GridFiller({ count }) {
  const ref = useRef(null)
  const [span, setSpan] = useState(0)

  useEffect(() => {
    const grid = ref.current?.parentElement
    if (!grid) return undefined
    const measure = () => {
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1
      setSpan((cols - (count % cols)) % cols)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [count])

  return (
    <aside
      ref={ref}
      className={`grid-filler${span ? '' : ' is-hidden'}`}
      style={span ? { gridColumn: `span ${span}` } : undefined}
      aria-hidden={span ? undefined : true}
    >
      <p className="grid-filler-note">¿Falta algo en tu lista?</p>
      <p className="grid-filler-text">Dinos qué útil necesitas y te avisamos cuando lo tengamos.</p>
      <Link to="/contacto" className="btn btn-primary" tabIndex={span ? undefined : -1}>Pedir un útil</Link>
    </aside>
  )
}
