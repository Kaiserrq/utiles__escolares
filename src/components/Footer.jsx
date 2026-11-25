import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <svg className="footer-wave" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 40V18 Q50 0 100 18 T200 18 T300 18 T400 18 T500 18 T600 18 T700 18 T800 18 T900 18 T1000 18 T1100 18 T1200 18 V40Z" fill="var(--footer-bg)" />
      </svg>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Tu lista escolar, lista en un click. Útiles para todo el año.</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces del pie">
          <Link to="/categorias">Categorías</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/faq">FAQ</Link>
          <a href="#terminos">Términos</a>
          <a href="#privacidad">Privacidad</a>
        </nav>
        <p className="footer-copy">© 2026 Webcole</p>
      </div>
    </footer>
  )
}
