import { useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()

  if (!product) return <p>Producto no encontrado</p>

  const imgs = product.images && product.images.length ? product.images : ['/vite.svg']

  return (
    <div className="product-detail">
      <div>
        <img src={imgs[0]} alt={product.title} />
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          {imgs.map((src, idx) => (
            <img key={idx} src={src} alt={`${product.title}-${idx}`} style={{width:72, height:72, objectFit:'cover', borderRadius:6}} />
          ))}
        </div>
      </div>

      <div>
        <h2>{product.title}</h2>
        <p className="muted">{product.brand} · {product.category} · SKU: {product.sku}</p>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong> <span className="muted">· Stock: {product.stock}</span></p>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="glow" onClick={() => addToCart(product)}>Agregar al carrito</button>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Volver arriba</button>
        </div>
      </div>
    </div>
  )
}
