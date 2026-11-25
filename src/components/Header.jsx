import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useScrollLock } from '../hooks/useScrollLock.js'
import Logo from './Logo.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'
import { categories } from '../data/categories.js'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/categorias', label: 'Categorías' },
  { to: '/acerca', label: 'Acerca' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/faq', label: 'FAQ' },
]

export default function Header({ onOpenCart }) {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  useScrollLock(menuOpen)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={closeMenu} aria-label="Webcole, inicio">
            <Logo />
            <span className="slogan">tu lista con click</span>
          </Link>

          <nav className="site-nav" aria-label="Principal">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end} className="nav-pill">{l.label}</NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeSwitch className="theme-desktop" />
            <button type="button" className="cart-button" onClick={onOpenCart}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M6 3h9l4 4v14H6z M9 11h7 M9 15h7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <span className="cart-label">Mi lista</span>
              {totalItems > 0 && <span key={totalItems} className="badge" aria-label={`${totalItems} útiles`}>{totalItems}</span>}
            </button>
            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' open' : ''}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className={`mobile-nav grid-bg${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Menú móvil">
          {links.map((l, i) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="mobile-link" style={{ '--i': i }} onClick={closeMenu}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-section">
          <p className="mobile-label" id="theme-label">Tema</p>
          <ThemeSwitch withText />
        </div>
        <div className="mobile-section">
          <p className="mobile-label">Categorías</p>
          <ul className="chips mobile-chips">
            {categories.map(c => (
              <li key={c.name}>
                <Link to={`/?category=${encodeURIComponent(c.name)}#catalogo`} className="chip" style={{ '--cat': c.color }} onClick={closeMenu}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
