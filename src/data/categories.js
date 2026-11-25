// Metadatos por categoría: color resaltador y producto representativo para el arte.
export const categories = [
  { name: 'Cuadernos', color: 'var(--hl-yellow)', rep: '3' },
  { name: 'Escritura', color: 'var(--hl-pink)', rep: '7' },
  { name: 'Mochilas', color: 'var(--hl-sky)', rep: '14' },
  { name: 'Papelería', color: 'var(--hl-green)', rep: '21' },
  { name: 'Uniformes', color: 'var(--hl-orange)', rep: '26' },
  { name: 'Otros', color: 'var(--hl-lilac)', rep: '34' },
]

export function categoryColor(name) {
  return categories.find(c => c.name === name)?.color ?? 'var(--hl-lilac)'
}
