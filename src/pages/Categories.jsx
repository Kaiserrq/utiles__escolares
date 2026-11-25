import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { categories } from '../data/categories.js'
import ProductArt from '../components/ProductArt.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function Categories() {
  return (
    <>
      <PageHeader title="Categorías" subtitle="Elige por dónde empezar tu lista." />
      <section className="container tiles-wrap">
        <div className="tiles">
          {categories.map((c, i) => {
            const count = products.filter(p => p.category === c.name).length
            const rep = products.find(p => p.id === c.rep)
            return (
              <Link
                key={c.name}
                to={`/?category=${encodeURIComponent(c.name)}#catalogo`}
                className={`tile tile-${i}`}
                style={{ '--cat': c.color }}
              >
                <div className="tile-art"><ProductArt product={rep} /></div>
                <div className="tile-text">
                  <h2>{c.name}</h2>
                  <p>{count} productos</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
