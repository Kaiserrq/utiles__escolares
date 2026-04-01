export default function Contact() {
  return (
    <div className="app-root">
      <h2>Contacto - Webcole</h2>
      <p className="muted">¿Tienes preguntas sobre nuestros útiles escolares o necesitas ayuda con tu pedido? Contáctanos aquí.</p>

      <form onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (simulado)') }} style={{display:'grid', gap:12, maxWidth:640}}>
        <input placeholder="Tu nombre" required style={{padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.04)'}} />
        <input type="email" placeholder="Tu email" required style={{padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.04)'}} />
        <textarea placeholder="Mensaje" rows={6} required style={{padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.04)'}} />
        <div style={{display:'flex', gap:8}}>
          <button className="glow">Enviar</button>
          <button type="button" onClick={() => alert('Llamada simulada a soporte')}>Llamar soporte</button>
        </div>
      </form>
    </div>
  )
}
