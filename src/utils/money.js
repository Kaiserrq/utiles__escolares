const pen = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })

// "S/ 12.00" (soles peruanos)
export const formatPEN = (n) => pen.format(n)

// Parte numérica sin símbolo, para mostrar "S/" aparte con otro tamaño.
export const formatPENAmount = (n) =>
  pen.formatToParts(n).filter(p => p.type !== 'currency' && p.type !== 'literal').map(p => p.value).join('')
