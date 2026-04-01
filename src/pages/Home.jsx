import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const [query, setQuery] = useState('')
  const { cart, totalItems } = useCart()

  const [category, setCategory] = useState(null)
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    setCategory(cat)
  }, [window.location.search])

  let visible = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
  if (category) visible = visible.filter(p => p.category === category)

  return (
    <div className="app-root">
      <section className="hero">
        <div style={{flex:1}}>
          <h2>Ofertas y Promociones</h2>
          <div className="promo" style={{background:'linear-gradient(90deg, rgba(107,123,255,0.12), rgba(123,245,255,0.06))', padding:18, borderRadius:12}}>
            <h3 style={{margin:0}}>Oferta especial: 15% en mochilas y cuadernos</h3>
            <p className="muted" style={{marginTop:6}}>Prepárate para el ciclo escolar con los mejores útiles. Envío gratis en compras mayores a $50.</p>
            <div style={{marginTop:8}}>
              <button className="glow animated">Ver promociones</button>
            </div>
          </div>
        </div>
        <div className="search">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar cuadernos, mochilas, lápices..." />
          <button>Buscar</button>
        </div>
      </section>

      <div className="content">
        <section className="product-grid">
          {visible.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        <aside className="sidebar">
          <div className="cart-summary">
            <h3>Mi carrito</h3>
            <p className="muted">Items: {totalItems}</p>
            {cart.length === 0 ? <p className="muted">Tu carrito está vacío. Comienza a añadir útiles.</p> : (
              <ul>
                {cart.map(i => <li key={i.id}><small>{i.title} x {i.qty}</small></li>)}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
