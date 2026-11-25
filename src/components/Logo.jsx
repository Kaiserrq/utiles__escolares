export default function Logo({ light = false }) {
  return (
    <span className={`logo${light ? ' logo-light' : ''}`}>
      <span className="logo-word">webcole</span>
      <svg className="logo-pencil" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <g transform="rotate(40 12 12)" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="9.5" y="2" width="5" height="14" rx="1" fill="var(--hl-yellow)" />
          <path d="M9.5 16h5l-2.5 5z" fill="var(--hl-orange)" />
        </g>
      </svg>
    </span>
  )
}
