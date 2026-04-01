export default function FAQ(){
  const qas = [
    {q: '¿Cómo realizo una compra?', a: 'Busca los útiles que necesitas, agrega al carrito haciendo clic en "Agregar", revisa tu carrito desde el header y haz clic en "Pagar" para completar la compra. Este demo muestra una compra simulada.'},
    {q: '¿Cóm o tengo acceso a todas las categorías?', a: 'Puedes navegar por categorías desde el menú (Inicio, Cuadernos, Escritura, Mochilas, Papelería, Otros) o usar la búsqueda rápida en la página principal.'},
    {q: '¿Cóm o se guarda mi carrito?', a: 'Tu carrito se guarda automáticamente en tu navegador, así que tus productos se mantienen aunque recargues la página.'},
    {q: '¿Hay descuentos?', a: 'Sí, contamos con promociones especiales en mochilas, cuadernos y paquetes de útiles. Revisa la página de inicio para las ofertas actuales.'},
    {q: '¿qué marcas venden?', a: 'Trabajamos con marcas confiables como Faber-Castell, Staedtler, Bic, Nike y más. Todos los productos son de calidad garantizada.'}
  ]

  return (
    <div className="app-root">
      <h2>Preguntas frecuentes</h2>
      <div style={{display:'grid', gap:12}}>
        {qas.map((qa, i) => (
          <details key={i} style={{padding:12, borderRadius:8, background:'rgba(255,255,255,0.02)'}}>
            <summary style={{fontWeight:600, cursor:'pointer'}}>{qa.q}</summary>
            <p className="muted" style={{marginTop:8}}>{qa.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
