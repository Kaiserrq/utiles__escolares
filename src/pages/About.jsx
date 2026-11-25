import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { categories } from '../data/categories.js'

const brands = ['Faber-Castell', 'Staedtler', 'Bic', 'Scotch', '3M', 'Fiskars', 'Maped', 'Rotring', 'Larousse', 'Nike', 'Prismacolor', 'SwissPack']

const steps = [
  { t: 'Busca', d: 'Usa el buscador o recorre las categorías hasta encontrar lo que pide tu lista.' },
  { t: 'Agrega a tu lista', d: 'Con un click cada útil entra a Mi lista. Cambia cantidades cuando quieras.' },
  { t: 'Paga', d: 'Revisa el total, mira si ya tienes envío gratis (desde S/ 50) y confirma tu pedido.' },
]

export default function About() {
  return (
    <>
      <PageHeader title="Acerca de Webcole" subtitle="Una tienda hecha para resolver la lista del cole sin vueltas." />
      <div className="container about">
        <section className="about-block">
          <h2>Qué vendemos</h2>
          <p>
            Todo lo que aparece en una lista escolar: cuadernos y libretas, lápices y bolígrafos, mochilas,
            papelería, uniformes y los útiles que siempre faltan a último momento, como reglas, compases o un diccionario.
          </p>
          <div className="chips">
            {categories.map(c => (
              <Link key={c.name} to={`/?category=${encodeURIComponent(c.name)}#catalogo`} className="chip" style={{ '--cat': c.color }}>{c.name}</Link>
            ))}
          </div>
        </section>

        <section className="about-block">
          <h2>Cómo funciona</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.t} className="step">
                <span className="step-n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-block">
          <h2>Marcas con las que trabajamos</h2>
          <ul className="chips brand-chips">
            {brands.map(b => <li key={b} className="chip chip-plain">{b}</li>)}
          </ul>
        </section>
      </div>
    </>
  )
}
