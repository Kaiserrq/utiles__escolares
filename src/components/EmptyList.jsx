import { Link } from 'react-router-dom'

export default function EmptyList({ onNavigate }) {
  return (
    <div className="empty-list">
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <g stroke="#0e1766" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <g transform="rotate(-6 58 57)">
            <rect x="26" y="14" width="64" height="86" rx="6" fill="#fff" />
            <path d="M52 38h26M52 52h26M52 66h16" strokeWidth="2.5" opacity=".5" />
            <path d="M44 14v86" stroke="#ff5a5a" strokeWidth="2.5" />
          </g>
          <g transform="rotate(34 86 82)">
            <rect x="80" y="52" width="12" height="40" rx="2" fill="#fff04a" />
            <path d="M80 92h12l-6 14z" fill="#f6d7a8" />
          </g>
        </g>
      </svg>
      <p>Tu lista está vacía. Agrega útiles desde el catálogo.</p>
      <Link to="/#catalogo" className="btn btn-primary" onClick={onNavigate}>Ver catálogo</Link>
    </div>
  )
}
