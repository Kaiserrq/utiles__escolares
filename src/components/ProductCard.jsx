import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductArt from './ProductArt.jsx'
import { useCart } from '../context/CartContext.jsx'
import { createTilt } from '../hooks/tilt.js'
import { categoryColor } from '../data/categories.js'
import { formatPENAmount } from '../utils/money.js'

const tiltHandlers = createTilt(8)

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  

  useEffect(() => {
    if (!added) return undefined
    const id = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(id)
  }, [added])

  const handleAdd = () => {
    addToCart(product, 1)
    setAdded(true)
  }

  return (
    <article
      className="card"
      onPointerMove={tiltHandlers.onPointerMove}
      onPointerLeave={tiltHandlers.onPointerLeave}
      style={{ '--cat': categoryColor(product.category) }}
    >
      <div className="card-art">
        <span className="chip chip-sm">{product.category}</span>
        <ProductArt product={product} className={added ? 'jump' : ''} />
        {added && <span className="note-added" aria-hidden="true">¡a tu lista!</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/product/${product.id}`} className="card-link">{product.title}</Link>
        </h3>
        <p className="card-brand">{product.brand}<span className="card-rating"> ★ {product.rating}</span></p>
        <div className="card-foot">
          <span className="price"><span className="cur">S/</span> {formatPENAmount(product.price)}</span>
          <button
            type="button"
            className={`btn-add${added ? ' is-added' : ''}`}
            onClick={handleAdd}
            aria-label={`Agregar ${product.title}`}
          >
            <span className="plus" aria-hidden="true">{added ? '✓' : '+'}</span>
            <span className="lbl">{added ? 'Agregado' : 'Agregar'}</span>
          </button>
        </div>
      </div>
      <span className="sr-only" role="status">{added ? `${product.title} agregado a tu lista` : ''}</span>
    </article>
  )
}
