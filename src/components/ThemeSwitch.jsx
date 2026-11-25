import { useTheme } from '../hooks/useTheme.js'

const svgProps = { viewBox: '0 0 24 24', width: 18, height: 18, 'aria-hidden': true, focusable: 'false', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const options = [
  {
    value: 'light', label: 'Claro', short: 'Claro',
    icon: <svg {...svgProps}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  },
  {
    value: 'dark', label: 'Oscuro', short: 'Oscuro',
    icon: <svg {...svgProps}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>,
  },
  {
    value: 'auto', label: 'Automático', short: 'Auto',
    icon: <svg {...svgProps}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>,
  },
]

export default function ThemeSwitch({ withText = false, className = '' }) {
  const { preference, setPreference } = useTheme()
  return (
    <div className={`theme-switch${withText ? ' with-text' : ''} ${className}`.trim()} role="radiogroup" aria-label="Tema">
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={preference === o.value}
          aria-label={o.label}
          title={o.label}
          className="theme-opt"
          onClick={() => setPreference(o.value)}
        >
          {o.icon}
          {withText && <span>{o.short}</span>}
        </button>
      ))}
    </div>
  )
}
