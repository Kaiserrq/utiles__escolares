import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { categories } from '../data/categories.js'
import ProductCard from '../components/ProductCard.jsx'
import HeroScene from '../components/HeroScene.jsx'
import GridFiller from '../components/GridFiller.jsx'

const promos = [
  '15% en mochilas y cuadernos',
  'Envío gratis desde S/ 50',
  'Cambios en 7 días',
  'Todo lo de la lista del cole',
  'Entrega en 48 horas',
]

function Star() {
  return (
    <svg className="star" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
    </svg>
  )
}

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function scrollToCatalog() {
  const el = document.getElementById('catalogo')
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export default function Home() {
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const category = params.get('category') || 'Todo'
  const qParam = params.get('q') || ''
  const [term, setTerm] = useState(qParam)
  // Si la URL cambia (atrás/adelante o enlace con ?q=), el campo se sincroniza.
  const [prevQ, setPrevQ] = useState(qParam)
  if (qParam !== prevQ) {
    setPrevQ(qParam)
    setTerm(qParam)
  }

  useEffect(() => {
    if (hash === '#catalogo') scrollToCatalog()
  }, [hash])

  const filtered = useMemo(() => {
    const q = norm(term.trim())
    return products.filter(p => {
      if (category !== 'Todo' && p.category !== category) return false
      if (!q) return true
      return norm(`${p.title} ${p.brand} ${p.category}`).includes(q)
    })
  }, [category, term])

  const selectCategory = (name) => {
    const next = new URLSearchParams(params)
    if (name === 'Todo') next.delete('category')
    else next.set('category', name)
    setParams(next, { replace: true })
    scrollToCatalog()
  }

  const onSearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(params)
    if (term.trim()) next.set('q', term.trim())
    else next.delete('q')
    setParams(next, { replace: true })
    scrollToCatalog()
  }

  const showAll = () => {
    setTerm('')
    setParams({}, { replace: true })
  }

  const count = category === 'Todo' ? `${filtered.length} útiles` : `${filtered.length} en ${category}`

  return (
    <>
      <section className="hero grid-bg">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="line">Tu lista escolar,</span>
              <span className="line"><span className="hl-stroke">lista en un click.</span></span>
            </h1>
            <p className="hero-sub">
              Cuadernos, mochilas, uniformes y todo lo de la lista del cole. Envío gratis desde S/ 50.
            </p>
            <form className="search" role="search" onSubmit={onSearch}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={term}
                onChange={e => setTerm(e.target.value)}
                placeholder="Busca cuadernos, mochilas, lápices..."
                aria-label="Buscar útiles"
                enterKeyHint="search"
              />
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
            <div className="chips" aria-label="Categorías">
              {categories.map(c => (
                <button key={c.name} type="button" className="chip" style={{ '--cat': c.color }} onClick={() => selectCategory(c.name)}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <HeroScene />
        </div>
      </section>

      <div className="ribbon" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map(k => (
            <div className="marquee-set" key={k}>
              {[...promos, ...promos].map((p, i) => (
                <span className="marquee-item" key={i}>{p}<Star /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="catalogo" className="catalog">
        <div className="container">
          <div className="catalog-head">
            <h2>Útiles para este año</h2>
            <p className="catalog-count" role="status">{count}</p>
          </div>

          <div className="tabs" role="group" aria-label="Filtrar por categoría">
            <button type="button" className="tab" style={{ '--cat': 'var(--paper)' }} aria-pressed={category === 'Todo'} onClick={() => selectCategory('Todo')}>Todo</button>
            {categories.map(c => (
              <button key={c.name} type="button" className="tab" style={{ '--cat': c.color }} aria-pressed={category === c.name} onClick={() => selectCategory(c.name)}>
                {c.name}
              </button>
            ))}
          </div>

          <div className="panel">
            {filtered.length === 0 ? (
              <div className="empty-catalog">
                <p>No encontramos “{term}”. Prueba con otra palabra o mira todas las categorías.</p>
                <button type="button" className="btn btn-primary" onClick={showAll}>Ver todo</button>
              </div>
            ) : (
              <div className="grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                <GridFiller count={filtered.length} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
