import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPEN } from '../utils/money.js'

const FREE_SHIPPING = 50

export default function CartSummary({ onNavigate, showContinue = true }) {
  const { totalPrice, clearCart } = useCart()
  const [paid, setPaid] = useState(false)
  const missing = Math.max(0, FREE_SHIPPING - totalPrice)
  const pct = Math.min(100, (totalPrice / FREE_SHIPPING) * 100)

  return (
    <div className="cart-summary">
      <div className="ship">
        <p className="ship-text">
          {missing > 0 ? <>Te faltan <strong>{formatPEN(missing)}</strong> para envío gratis</> : <strong>¡Tienes envío gratis!</strong>}
        </p>
        <div
          className="ship-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={FREE_SHIPPING}
          aria-valuenow={Math.min(totalPrice, FREE_SHIPPING)}
          aria-label="Progreso hacia envío gratis"
        >
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </div>
      <div className="total-row">
        <span>Total</span>
        <strong className="total">{formatPEN(totalPrice)}</strong>
      </div>
      <button type="button" className="btn btn-primary btn-block" onClick={() => setPaid(true)}>Pagar {formatPEN(totalPrice)}</button>
      {paid && <p className="pay-msg" role="status">Compra simulada: es un demo y no se cobró nada. ¡Gracias!</p>}
      {showContinue && (
        <Link to="/#catalogo" className="btn btn-ghost btn-block" onClick={onNavigate}>Seguir comprando</Link>
      )}
      <button type="button" className="link-btn muted-link" onClick={() => { clearCart(); setPaid(false) }}>Vaciar lista</button>
    </div>
  )
}
