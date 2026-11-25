import PageHeader from '../components/PageHeader.jsx'

const qas = [
  { q: '¿Cómo realizo una compra?', a: 'Busca los útiles que necesitas, agrégalos a Mi lista con el botón "Agregar", revisa la lista desde el encabezado y haz clic en "Pagar". Este demo muestra una compra simulada.' },
  { q: '¿Cómo tengo acceso a todas las categorías?', a: 'Entra a Categorías desde el menú o usa los botones de color en la página de inicio. También puedes usar el buscador.' },
  { q: '¿Cómo se guarda mi lista?', a: 'Tu lista se guarda automáticamente en tu navegador, así que tus productos se mantienen aunque recargues la página.' },
  { q: '¿Hay descuentos?', a: 'Sí, tenemos promociones en mochilas, cuadernos y paquetes de útiles. Revisa la página de inicio para ver las ofertas actuales.' },
  { q: '¿Qué marcas venden?', a: 'Trabajamos con marcas confiables como Faber-Castell, Staedtler, Bic, Nike y más. Todos los productos son de calidad garantizada.' },
]

export default function FAQ() {
  return (
    <>
      <PageHeader title="Preguntas frecuentes" subtitle="Lo que más nos preguntan, resuelto." />
      <div className="container faq">
        {qas.map(qa => (
          <details key={qa.q} className="faq-item">
            <summary>
              <span>{qa.q}</span>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <div className="faq-body"><div><p>{qa.a}</p></div></div>
          </details>
        ))}
      </div>
    </>
  )
}
