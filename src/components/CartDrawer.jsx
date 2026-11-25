import { useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useScrollLock } from '../hooks/useScrollLock.js'
import CartItem from './CartItem.jsx'
import CartSummary from './CartSummary.jsx'
import EmptyList from './EmptyList.jsx'

export default function CartDrawer({ open, onClose }) {
  const { cart, totalItems } = useCart()
  const closeRef = useRef(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      opener?.focus?.() // devuelve el foco al botón que abrió "Mi lista"
    }
  }, [open, onClose])

  return (
    <div className={`drawer-root${open ? ' open' : ''}`}>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" aria-hidden={!open} inert={!open}>
        <header className="drawer-head">
          <h2 id="drawer-title" className="hand-title">Mi lista</h2>
          <span className="drawer-count">{totalItems} {totalItems === 1 ? 'útil' : 'útiles'}</span>
          <button type="button" ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Cerrar mi lista">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
          </button>
        </header>
        {cart.length === 0 ? (
          <div className="drawer-scroll paper"><EmptyList onNavigate={onClose} /></div>
        ) : (
          <>
            <ul className="drawer-scroll paper cart-list">
              {cart.map(item => <CartItem key={item.id} item={item} onNavigate={onClose} />)}
            </ul>
            <footer className="drawer-foot"><CartSummary onNavigate={onClose} /></footer>
          </>
        )}
      </aside>
    </div>
  )
}
