import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { formatPEN } from '../../utils/money.js'
import { MethodLogo, SampleQr } from './MethodArt.jsx'
import { METHODS, cardBrand, validateCard } from './checkoutUtils.js'
import CardForm from './CardForm.jsx'
import Receipt from './Receipt.jsx'
import './checkout.css'

const FOCUSABLE = 'a[href],button:not([disabled]):not([tabindex="-1"]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'

const nextSerie = (type) => {
  let n = 0
  try { n = Number(localStorage.getItem('invoiceSeq')) || 0 } catch { /* sin almacenamiento */ }
  n += 1
  try { localStorage.setItem('invoiceSeq', String(n)) } catch { /* sin almacenamiento */ }
  return `${type === 'factura' ? 'F001' : 'B001'}-${String(n).padStart(6, '0')}`
}

const randomCip = () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')

export default function CheckoutModal({ onClose, onDone }) {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState('pay') // pay | processing | approved | receipt
  const [method, setMethod] = useState('yape')
  const [docType, setDocType] = useState('boleta')
  const [cust, setCust] = useState({ name: '', dni: '', ruc: '', razon: '', address: '' })
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' })
  const [tried, setTried] = useState(false)
  const [cip] = useState(randomCip)
  const [receipt, setReceipt] = useState(null)
  const rootRef = useRef(null)
  const dialogRef = useRef(null)
  const timer = useRef(null)
  useScrollLock(true)

  useEffect(() => {
    const opener = document.activeElement
    dialogRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation() // evita que también se cierre el drawer
        if (step !== 'processing') onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const list = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null)
        // Sin enfocables (p. ej. "Procesando") el foco se queda en el diálogo
        if (!list.length) { e.preventDefault(); dialogRef.current.focus(); return }
        const first = list[0]
        const last = list[list.length - 1]
        if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); return }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose, step])

  useEffect(() => () => clearTimeout(timer.current), [])

  // Al cambiar de paso, vuelve al inicio del modal y mueve el foco allí.
  useEffect(() => {
    rootRef.current?.querySelector('.co-body')?.scrollTo(0, 0)
    if (step !== 'pay') dialogRef.current?.focus()
  }, [step])

  const errors = {}
  if (docType === 'boleta') {
    if (cust.name.trim().length < 3) errors.name = 'Escribe tu nombre completo.'
    if (!/^\d{8}$/.test(cust.dni)) errors.dni = 'El DNI tiene 8 dígitos.'
  } else {
    if (!/^(10|20)\d{9}$/.test(cust.ruc)) errors.ruc = 'El RUC tiene 11 dígitos y empieza con 10 o 20.'
    if (cust.razon.trim().length < 3) errors.razon = 'Escribe la razón social.'
  }
  const cardErrors = method === 'card' ? validateCard(card) : {}
  const show = (k) => (tried && errors[k] ? errors[k] : '')

  const submit = (e) => {
    e.preventDefault()
    setTried(true)
    if (Object.keys(errors).length || Object.keys(cardErrors).length) {
      requestAnimationFrame(() => rootRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    const digits = card.number.replace(/\D/g, '')
    const methodLabel = method === 'card'
      ? `Tarjeta ${cardBrand(digits) || ''} **** ${digits.slice(-4)}`.replace('  ', ' ')
      : METHODS.find(m => m.id === method).label
    setStep('processing')
    timer.current = setTimeout(() => {
      setReceipt({
        type: docType,
        serie: nextSerie(docType),
        items: cart.map(i => ({ ...i })),
        total: totalPrice,
        customer: docType === 'boleta'
          ? { name: cust.name.trim(), doc: cust.dni }
          : { name: cust.razon.trim(), doc: cust.ruc, address: cust.address.trim() },
        methodLabel,
        date: new Date(),
      })
      setStep('approved')
    }, 1500)
  }

  const finish = () => { clearCart(); onDone?.(); onClose() }
  const cta = method === 'yape' || method === 'plin' ? 'Ya pagué' : method === 'card' ? `Pagar ${formatPEN(totalPrice)}` : 'Simular pago'
  const moveRadio = (e) => {
    const i = METHODS.findIndex(m => m.id === method)
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const m = METHODS[(i + d + METHODS.length) % METHODS.length]
    setMethod(m.id)
    rootRef.current?.querySelector(`[data-method="${m.id}"]`)?.focus()
  }
  const f = (k, v) => setCust(c => ({ ...c, [k]: v }))
  const title = step === 'pay' ? 'Formas de pago' : step === 'processing' ? 'Procesando…' : step === 'approved' ? 'Pago aprobado' : 'Comprobante'

  return createPortal(
    <div className="co-root" ref={rootRef}>
      <div className="co-overlay" onClick={step === 'processing' ? undefined : onClose} />
      <div className={`co-modal step-${step}`} role="dialog" aria-modal="true" aria-labelledby="co-title" ref={dialogRef} tabIndex={-1}>
        <p className="co-sim">Simulación: así funcionaría la web. No se cobra nada ni se guardan datos.</p>
        <header className="co-head">
          <h2 id="co-title" className="hand-title">{title}</h2>
          {step !== 'processing' && (
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar formas de pago">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
            </button>
          )}
        </header>

        {step === 'pay' && (
          <form className="co-form" onSubmit={submit} noValidate>
            <div className="co-body">
              <p className="co-summary">
                <span>{totalItems} {totalItems === 1 ? 'útil' : 'útiles'}</span>
                <strong>{formatPEN(totalPrice)}</strong>
              </p>

              <h3 className="co-sub" id="co-methods">Elige cómo pagar</h3>
              <div className="co-methods" role="radiogroup" aria-labelledby="co-methods" onKeyDown={moveRadio}>
                {METHODS.map(m => (
                  <button key={m.id} type="button" role="radio" aria-checked={method === m.id} data-method={m.id}
                    tabIndex={method === m.id ? 0 : -1} className={`co-method${method === m.id ? ' on' : ''}`} onClick={() => setMethod(m.id)}>
                    <MethodLogo id={m.id} />
                    <span className="co-method-name">{m.label}</span>
                    <span className="co-method-hint">{m.hint}</span>
                  </button>
                ))}
              </div>

              <section className="co-panel" aria-live="polite">
                {(method === 'yape' || method === 'plin') && (
                  <div className="co-wallet">
                    <SampleQr seed={method === 'yape' ? 11 : 29} color={method === 'yape' ? '#742284' : '#0b4f58'} />
                    <div className="co-wallet-info">
                      <p>Escanea el QR de muestra o yapea al número:</p>
                      <p className="co-big">999 999 999</p>
                      <p>Nombre: <strong>Webcole (demo)</strong></p>
                      <p>Monto: <strong>{formatPEN(totalPrice)}</strong></p>
                      <p className="co-note">El QR es decorativo y no se puede escanear.</p>
                    </div>
                  </div>
                )}
                {method === 'card' && <CardForm value={card} onChange={setCard} errors={cardErrors} tried={tried} />}
                {method === 'cash' && (
                  <div className="co-cash">
                    <p>Tu código de pago (CIP) de muestra:</p>
                    <p className="co-big co-cip">{cip}</p>
                    <ol>
                      <li>Acércate a un agente, bodega o app bancaria.</li>
                      <li>Indica el código CIP y el monto de {formatPEN(totalPrice)}.</li>
                      <li>Conserva tu constancia de pago.</li>
                    </ol>
                  </div>
                )}
                {method === 'bank' && (
                  <dl className="co-bank">
                    <div><dt>Banco</dt><dd>Banco Demo (demo)</dd></div>
                    <div><dt>CCI</dt><dd>002-000-000000000000-00 (demo)</dd></div>
                    <div><dt>Titular</dt><dd>Webcole (demo)</dd></div>
                    <div><dt>Monto</dt><dd>{formatPEN(totalPrice)}</dd></div>
                  </dl>
                )}
              </section>

              <h3 className="co-sub" id="co-doc">Comprobante</h3>
              <div className="co-seg" role="radiogroup" aria-labelledby="co-doc">
                {['boleta', 'factura'].map(t => (
                  <button key={t} type="button" role="radio" aria-checked={docType === t} className={docType === t ? 'on' : ''} onClick={() => setDocType(t)}>
                    {t === 'boleta' ? 'Boleta' : 'Factura'}
                  </button>
                ))}
              </div>
              <div className="co-cust">
                {docType === 'boleta' ? (
                  <>
                    <div className="field">
                      <label htmlFor="co-name">Nombre completo</label>
                      <input id="co-name" autoComplete="off" value={cust.name} onChange={e => f('name', e.target.value)} aria-invalid={!!show('name')} />
                      {show('name') && <p className="co-err">{show('name')}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-dni">DNI</label>
                      <input id="co-dni" inputMode="numeric" autoComplete="off" value={cust.dni} onChange={e => f('dni', e.target.value.replace(/\D/g, '').slice(0, 8))} aria-invalid={!!show('dni')} />
                      {show('dni') && <p className="co-err">{show('dni')}</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="field">
                      <label htmlFor="co-ruc">RUC</label>
                      <input id="co-ruc" inputMode="numeric" autoComplete="off" value={cust.ruc} onChange={e => f('ruc', e.target.value.replace(/\D/g, '').slice(0, 11))} aria-invalid={!!show('ruc')} />
                      {show('ruc') && <p className="co-err">{show('ruc')}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-razon">Razón social</label>
                      <input id="co-razon" autoComplete="off" value={cust.razon} onChange={e => f('razon', e.target.value)} aria-invalid={!!show('razon')} />
                      {show('razon') && <p className="co-err">{show('razon')}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="co-dir">Dirección (opcional)</label>
                      <input id="co-dir" autoComplete="off" value={cust.address} onChange={e => f('address', e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <footer className="co-foot">
              <button type="submit" className="btn btn-primary btn-block">{cta}</button>
            </footer>
          </form>
        )}

        {step === 'processing' && (
          <div className="co-body co-center" role="status">
            <div className="co-spinner" aria-hidden="true"><span /><span /><span /></div>
            <p className="co-big">Procesando tu pago…</p>
            <p className="co-note">Esto es una simulación.</p>
          </div>
        )}

        {step === 'approved' && (
          <>
            <div className="co-body co-center" role="status">
              <svg className="co-check" viewBox="0 0 80 80" aria-hidden="true">
                <circle cx="40" cy="40" r="36" />
                <path d="M24 41 L35 52 L57 29" />
              </svg>
              <p className="co-big">Pago aprobado (simulado)</p>
              <p className="co-note">No se cobró nada.</p>
            </div>
            <footer className="co-foot">
              <button type="button" className="btn btn-primary btn-block" onClick={() => setStep('receipt')}>Ver comprobante</button>
            </footer>
          </>
        )}

        {step === 'receipt' && receipt && (
          <>
            <div className="co-body co-receipt-body"><Receipt data={receipt} /></div>
            <footer className="co-foot co-foot-row">
              <button type="button" className="btn btn-ghost btn-grow" onClick={() => window.print()}>Imprimir / Guardar PDF</button>
              <button type="button" className="btn btn-primary btn-grow" onClick={finish}>Terminar</button>
            </footer>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
