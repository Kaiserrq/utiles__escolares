import { products } from '../data/products.js'
import { Link } from 'react-router-dom'

export default function Categories(){
  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="app-root">
      <h2>Categorías</h2>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:12}}>
        {categories.map(cat => (
          <Link key={cat} to={`/?category=${encodeURIComponent(cat)}`} style={{padding:'10px 14px', borderRadius:8, background:'rgba(255,255,255,0.02)'}}>{cat}</Link>
        ))}
      </div>
    </div>
  )
}
