import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

// Plantilla compartida por Términos y Privacidad: aviso, índice (sticky en escritorio, plegable en móvil) y secciones.
export default function LegalPage({ title, subtitle, sections }) {
  const [tocOpen, setTocOpen] = useState(false)
  const toc = (
    <ul>
      {sections.map(s => <li key={s.id}><a href={`#${s.id}`} onClick={() => setTocOpen(false)}>{s.title}</a></li>)}
    </ul>
  )
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="container legal">
        <aside className="legal-toc">
          <details className="legal-toc-m" open={tocOpen} onToggle={e => setTocOpen(e.currentTarget.open)}>
            <summary>Índice</summary>
            <nav aria-label="Índice">{toc}</nav>
          </details>
          <nav className="legal-toc-d" aria-label="Índice">
            <p>En esta página</p>
            {toc}
          </nav>
        </aside>
        <div className="legal-main">
          <p className="legal-notice" role="note">Esta es una tienda de demostración. Estos textos son un ejemplo de cómo se verían en la web real.</p>
          {sections.map(s => (
            <section key={s.id} id={s.id} className="legal-sec">
              <h2>{s.title}</h2>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
