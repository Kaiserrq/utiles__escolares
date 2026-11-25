import { useSyncExternalStore } from 'react'

const KEY = 'theme'
const MODES = ['light', 'dark', 'auto']
const mq = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

const listeners = new Set()

function readPreference() {
  try {
    const v = localStorage.getItem(KEY)
    return MODES.includes(v) ? v : 'auto'
  } catch {
    return 'auto'
  }
}

let preference = readPreference()

function resolve(pref) {
  if (pref === 'auto') return mq && mq.matches ? 'dark' : 'light'
  return pref
}

function apply() {
  const resolved = resolve(preference)
  const root = document.documentElement
  root.dataset.theme = resolved
  root.style.colorScheme = resolved
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0c0f2e' : '#f7f9ff')
}

// Snapshot "pref|resolved" (string primitivo, estable entre renders)
let snapshot = `${preference}|${resolve(preference)}`
function emit() {
  apply()
  snapshot = `${preference}|${resolve(preference)}`
  listeners.forEach(l => l())
}

if (mq) mq.addEventListener('change', () => { if (preference === 'auto') emit() })
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) { preference = readPreference(); emit() }
  })
  apply()
}

function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function setPreference(next) {
  if (!MODES.includes(next)) return
  preference = next
  try { localStorage.setItem(KEY, next) } catch { /* sin almacenamiento */ }
  emit()
}

export function useTheme() {
  const snap = useSyncExternalStore(subscribe, () => snapshot, () => 'auto|light')
  const [pref, resolved] = snap.split('|')
  return { preference: pref, setPreference, resolved }
}
