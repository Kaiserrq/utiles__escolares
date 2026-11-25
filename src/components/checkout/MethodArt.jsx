// Logos y QR de muestra propios (no son marcas oficiales ni QR reales).
export function MethodLogo({ id }) {
  const common = { viewBox: '0 0 56 36', width: 56, height: 36, 'aria-hidden': true, focusable: 'false', className: 'co-logo' }
  switch (id) {
    case 'yape':
      return (
        <svg {...common}>
          <rect width="56" height="36" rx="9" fill="#742284" />
          <text x="28" y="24" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="inherit">yape</text>
        </svg>
      )
    case 'plin':
      return (
        <svg {...common}>
          <rect width="56" height="36" rx="9" fill="#00c9b7" />
          <text x="28" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0b2b3a" fontFamily="inherit">plin</text>
        </svg>
      )
    case 'card':
      return (
        <svg {...common}>
          <rect width="56" height="36" rx="9" fill="#fff" stroke="#c9cdf0" />
          <text x="4" y="15" fontSize="10" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="inherit">VISA</text>
          <circle cx="36" cy="24" r="7" fill="#eb001b" />
          <circle cx="44" cy="24" r="7" fill="#f79e1b" fillOpacity="0.9" />
        </svg>
      )
    case 'cash':
      return (
        <svg {...common}>
          <rect width="56" height="36" rx="9" fill="#ffd400" />
          <text x="28" y="15" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#1a1a1a" fontFamily="inherit">Pago</text>
          <text x="28" y="28" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1a1a1a" fontFamily="inherit">Efectivo</text>
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect width="56" height="36" rx="9" fill="#e9ecff" stroke="#8f9cff" />
          <path d="M28 7 L44 14 H12 Z M15 16 V25 M22 16 V25 M34 16 V25 M41 16 V25 M11 28 H45" fill="#1a2bd6" stroke="#1a2bd6" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      )
  }
}

// Patrón pseudoaleatorio de cuadros con 3 marcadores de esquina. No es un QR real.
function makeCells(seed) {
  let s = seed
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
  const N = 25
  const cells = []
  const inFinder = (x, y) => (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8)
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inFinder(x, y) && rnd() > 0.52) cells.push([x, y])
  return { N, cells }
}

export function SampleQr({ seed = 7, color = '#000' }) {
  const { N, cells } = makeCells(seed)
  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill={color} />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill={color} />
    </g>
  )
  return (
    <svg className="co-qr" viewBox={`-1 -1 ${N + 2} ${N + 2}`} role="img" aria-label="Código QR de muestra, no escaneable" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />)}
      {finder(0, 0)}{finder(N - 7, 0)}{finder(0, N - 7)}
    </svg>
  )
}
