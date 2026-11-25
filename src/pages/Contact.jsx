import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSent(true)
  }

  return (
    <>
      <PageHeader title="Contacto" subtitle="¿Dudas con tu lista o con un pedido? Escríbenos." />
      <div className="container contact">
        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="c-name">Tu nombre</label>
            <input id="c-name" name="name" autoComplete="name" required onChange={() => setSent(false)} />
          </div>
          <div className="field">
            <label htmlFor="c-mail">Tu correo</label>
            <input id="c-mail" name="email" type="email" autoComplete="email" required onChange={() => setSent(false)} />
          </div>
          <div className="field">
            <label htmlFor="c-msg">Mensaje</label>
            <textarea id="c-msg" name="message" rows={6} required onChange={() => setSent(false)} />
          </div>
          <button type="submit" className="btn btn-primary">Enviar mensaje</button>
          {sent && <p className="form-ok" role="status">Mensaje enviado. Te respondemos en 24 h.</p>}
        </form>

        <div className="contact-cards">
          <div className="info-card" style={{ '--cat': 'var(--hl-green)' }}>
            <h2>WhatsApp</h2>
            <p>+51 900 000 000</p>
          </div>
          <div className="info-card" style={{ '--cat': 'var(--hl-yellow)' }}>
            <h2>Correo</h2>
            <p>hola@webcole.com</p>
          </div>
          <div className="info-card" style={{ '--cat': 'var(--hl-pink)' }}>
            <h2>Horario</h2>
            <p>Lunes a sábado, de 9:00 a 18:00</p>
          </div>
        </div>
      </div>
    </>
  )
}
