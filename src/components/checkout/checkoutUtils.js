export const METHODS = [
  { id: 'yape', label: 'Yape', hint: 'QR y número' },
  { id: 'plin', label: 'Plin', hint: 'QR y número' },
  { id: 'card', label: 'Tarjeta', hint: 'Visa / Mastercard' },
  { id: 'cash', label: 'PagoEfectivo', hint: 'Código CIP' },
  { id: 'bank', label: 'Transferencia', hint: 'Banco (demo)' },
]

export const cardBrand = (digits) => (digits[0] === '4' ? 'Visa' : digits[0] === '5' ? 'Mastercard' : '')

const luhn = (d) => {
  let sum = 0
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i])
    if (i % 2 === 1) { n *= 2; if (n > 9) n -= 9 }
    sum += n
  }
  return sum % 10 === 0
}

export function validateCard({ number, name, exp, cvv }) {
  const e = {}
  const d = number.replace(/\D/g, '')
  if (d.length !== 16) e.number = 'El número debe tener 16 dígitos.'
  else if (!luhn(d)) e.number = 'El número no parece válido. Prueba con 4111 1111 1111 1111.'
  if (name.trim().length < 3) e.name = 'Escribe el nombre como aparece en la tarjeta.'
  const m = /^(\d{2})\/(\d{2})$/.exec(exp)
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.exp = 'Usa el formato MM/AA.'
  else {
    const now = new Date()
    const y = 2000 + Number(m[2])
    if (y < now.getFullYear() || (y === now.getFullYear() && Number(m[1]) < now.getMonth() + 1)) e.exp = 'La tarjeta está vencida.'
  }
  if (!/^\d{3}$/.test(cvv)) e.cvv = 'El CVV tiene 3 dígitos.'
  return e
}

