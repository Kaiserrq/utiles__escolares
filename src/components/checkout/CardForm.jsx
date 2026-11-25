import { useState } from 'react'
import { cardBrand } from './checkoutUtils.js'

export default function CardForm({ value, onChange, errors, tried }) {
  const [flipped, setFlipped] = useState(false)
  const digits = value.number.replace(/\D/g, '')
  const brand = cardBrand(digits)
  const padded = (digits + '################').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const set = (k, v) => onChange({ ...value, [k]: v })
  const err = (k) => (tried && errors[k] ? errors[k] : '')

  return (
    <div className="co-card-form">
      <div className="co-card-scene" aria-hidden="true">
        <div className={`co-card3d${flipped ? ' flipped' : ''}`}>
          <div className={`co-face co-front brand-${brand || 'none'}`}>
            <div className="co-chip" />
            <span className="co-brand">{brand || 'Tarjeta'}</span>
            <p className="co-num">{padded}</p>
            <div className="co-meta">
              <span className="co-holder">{value.name.trim() || 'NOMBRE APELLIDO'}</span>
              <span>{value.exp || 'MM/AA'}</span>
            </div>
          </div>
          <div className={`co-face co-back brand-${brand || 'none'}`}>
            <div className="co-stripe" />
            <div className="co-sign"><span>{value.cvv ? value.cvv.padEnd(3, '•') : '•••'}</span></div>
            <span className="co-brand">{brand}</span>
          </div>
        </div>
      </div>
      <p className="co-hint">Usa una tarjeta de prueba, p. ej. <strong>4111 1111 1111 1111</strong></p>

      <div className="field">
        <label htmlFor="cc-number">Número de tarjeta</label>
        <input id="cc-number" inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" value={value.number}
          aria-invalid={!!err('number')} aria-describedby={err('number') ? 'cc-number-e' : undefined}
          onChange={e => set('number', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())} />
        {err('number') && <p className="co-err" id="cc-number-e">{err('number')}</p>}
      </div>
      <div className="field">
        <label htmlFor="cc-name">Nombre en la tarjeta</label>
        <input id="cc-name" autoComplete="off" placeholder="Como aparece en la tarjeta" value={value.name}
          aria-invalid={!!err('name')} aria-describedby={err('name') ? 'cc-name-e' : undefined}
          onChange={e => set('name', e.target.value.toUpperCase().slice(0, 26))} />
        {err('name') && <p className="co-err" id="cc-name-e">{err('name')}</p>}
      </div>
      <div className="co-row">
        <div className="field">
          <label htmlFor="cc-exp">Vence (MM/AA)</label>
          <input id="cc-exp" inputMode="numeric" autoComplete="off" placeholder="MM/AA" value={value.exp}
            aria-invalid={!!err('exp')} aria-describedby={err('exp') ? 'cc-exp-e' : undefined}
            onChange={e => {
              const d = e.target.value.replace(/\D/g, '').slice(0, 4)
              set('exp', d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d)
            }} />
          {err('exp') && <p className="co-err" id="cc-exp-e">{err('exp')}</p>}
        </div>
        <div className="field">
          <label htmlFor="cc-cvv">CVV</label>
          <input id="cc-cvv" inputMode="numeric" autoComplete="off" placeholder="123" value={value.cvv}
            aria-invalid={!!err('cvv')} aria-describedby={err('cvv') ? 'cc-cvv-e' : undefined}
            onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)}
            onChange={e => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))} />
          {err('cvv') && <p className="co-err" id="cc-cvv-e">{err('cvv')}</p>}
        </div>
      </div>
    </div>
  )
}
