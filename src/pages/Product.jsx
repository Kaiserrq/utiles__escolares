import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { categoryColor } from '../data/categories.js'
import { formatPEN } from '../utils/money.js'
import { useCart } from '../context/CartContext.jsx'
import { createTilt } from '../hooks/tilt.js'
import ProductArt from '../components/ProductArt.jsx'
import ProductCard from '../components/ProductCard.jsx'

const tiltHandlers = createTilt(10)

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  

  useEffect(() => {
    if (!added) return undefined
    const t = setTimeout(() => setAdded(false), 1400)
    return () => clearTimeout(t)
  }, [added])

  if (!product) {
    return (
      <section className="container not-found">
        <h1>Producto no encontrado</h1>
        <p>Puede que ya no esté disponible. Mira el resto del catálogo.</p>
        <Link to="/#catalogo" className="btn btn-primary">Ver catálogo</Link>
      </section>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const max = Math.min(product.stock, 20)

  return (
    <div className="container product-page">
      <nav className="breadcrumb" aria-label="Ruta">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/?category=${encodeURIComponent(product.category)}#catalogo`}>{product.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className="product-grid">
        <div
          className="product-stage grid-bg"
          style={{ '--cat': categoryColor(product.category) }}
          onPointerMove={tiltHandlers.onPointerMove}
          onPointerLeave={tiltHandlers.onPointerLeave}
        >
          <ProductArt product={product} />
        </div>

        <div className="product-info">
          <span className="chip chip-sm" style={{ '--cat': categoryColor(product.category) }}>{product.category}</span>
          <h1 className="product-title">{product.title}</h1>
          <p className="product-meta">{product.brand} <span className="card-rating">★ {product.rating}</span></p>
          <p className="product-price">{formatPEN(product.price)}</p>
          <p className="stock">Quedan {product.stock}</p>
          <p className="product-desc">{product.description}</p>

          <div className="buy-row">
            <div className="stepper stepper-lg" role="group" aria-label="Cantidad">
              <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Menos">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty(q => Math.min(max, q + 1))} aria-label="Más">+</button>
            </div>
            <button
              type="button"
              className={`btn btn-primary btn-grow${added ? ' is-added' : ''}`}
              onClick={() => { addToCart(product, qty); setAdded(true) }}
            >
              {added ? '✓ Agregado a tu lista' : 'Agregar a mi lista'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-title">
          <h2 id="related-title">También de {product.category}</h2>
          <div className="grid grid-related">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
