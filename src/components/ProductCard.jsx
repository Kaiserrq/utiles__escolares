import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useRef, useEffect, useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const img = product.images && product.images.length ? product.images[0] : '/vite.svg'
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          setInView(true)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleAdd() {
    addToCart(product)
    setPopped(true)
    setTimeout(() => setPopped(false), 380)
  }

  return (
    <article ref={ref} className={`product-card ${inView ? 'in-view' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={img} alt={product.title} />
        <h3>{product.title}</h3>
        <p className="muted">{product.brand} · {product.category}</p>
      </Link>
      <div className="product-info">
        <strong>${product.price}</strong>
        <button className={`glow ${popped ? 'pop' : ''}`} onClick={handleAdd}>Agregar</button>
      </div>
    </article>
  )
}
