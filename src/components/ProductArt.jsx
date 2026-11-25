// Arte vectorial de los productos (las imágenes de /public/images están vacías).
// Formas planas, trazo de tinta, brillo blanco y sombra elíptica.

const INK = '#0e1766'
const PAPER = '#f7f9ff'
const SILVER = '#d9deff'
const WOOD = '#f6d7a8'

const PALETTE = [
  ['#ff4fa3', '#c4177a'],
  ['#7d8cff', '#3f4fd6'],
  ['#3ff2a0', '#14b36f'],
  ['#ff9d2e', '#d46a00'],
  ['#b78cff', '#7a49d9'],
  ['#fff04a', '#e0c600'],
]
const NAVY = ['#2a3cd8', '#1a2bd6']
const FAN_COLORS = ['#ff4fa3', '#fff04a', '#3ff2a0', '#7d8cff', '#ff9d2e', '#b78cff']

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function detectKind(product) {
  const t = norm(product.title)
  const has = (...w) => w.some(x => t.includes(x))
  if (has('libreta')) return 'libreta'
  if (has('cuaderno')) return 'cuaderno'
  if (has('mochila')) return 'mochila'
  if (has('lapices', 'lapiz')) return 'lapices'
  if (has('boligrafo')) return 'boligrafos'
  if (has('marcador')) return 'marcadores'
  if (has('resaltador')) return 'resaltadores'
  if (has('borrador')) return 'borrador'
  if (has('cinta')) return 'cinta'
  if (has('pegamento')) return 'pegamento'
  if (has('clips')) return 'clips'
  if (has('post-it')) return 'postit'
  if (has('ligas')) return 'ligas'
  if (has('separadores')) return 'separadores'
  if (has('delantal')) return 'delantal'
  if (has('calzoneta')) return 'calzoneta'
  if (has('calcetines')) return 'calcetines'
  if (has('corbata')) return 'corbata'
  if (has('tijeras')) return 'tijeras'
  if (has('regla')) return 'regla'
  if (has('compas')) return 'compas'
  if (has('transportador')) return 'transportador'
  if (has('cartuchera')) return 'cartuchera'
  if (has('carpeta')) return 'carpeta'
  if (has('diccionario')) return 'diccionario'
  if (has('atlas')) return 'atlas'
  return 'cuaderno'
}

function Shadow({ rx = 62 }) {
  return <ellipse cx="100" cy="148" rx={rx} ry="6" fill="rgba(14,23,102,.16)" stroke="none" />
}

function Gloss(props) {
  return <rect fill="#fff" opacity=".32" stroke="none" {...props} />
}

/* ---------- Cuadernos ---------- */
function Notebook({ c, t, small }) {
  const [a, b] = c
  const spiral = t.includes('espiral')
  const grid = t.includes('cuadricul')
  const draw = t.includes('dibujo')
  const hard = t.includes('tapa dura')
  const x = small ? 62 : 50
  const y = small ? 30 : 16
  const w = small ? 76 : 100
  const h = small ? 104 : 126
  const ys = []
  for (let i = y + 14; i < y + h - 8; i += 14) ys.push(i)
  return (
    <g>
      <Shadow />
      {/* hojas */}
      <rect x={x + 6} y={y + 4} width={w} height={h} rx="8" fill={PAPER} />
      <rect x={x} y={y} width={w} height={h} rx="8" fill={a} />
      <rect x={x} y={y} width={small ? 12 : 18} height={h} rx="8" fill={b} />
      {small
        ? [0, 1, 2, 3].map(i => <path key={i} d={`M${x + 12 + i * 16} ${y - 6} v14`} strokeWidth="5" />)
        : spiral
          ? ys.map(i => <path key={i} d={`M${x - 8} ${i} h22`} strokeWidth="5" />)
          : <path d={`M${x + 24} ${y + 8} V${y + h - 8}`} strokeDasharray="5 6" strokeWidth="2" />}
      {small ? (
        <rect x={x + 12} y={y + 24} width={w - 24} height="46" rx="4" fill={PAPER} />
      ) : (
        <rect x={x + 32} y={y + 28} width={w - 46} height="46" rx="4" fill={PAPER} />
      )}
      {draw ? (
        <g strokeWidth="2.5" fill="none">
          <circle cx={small ? 100 : 112} cy={y + 44} r="8" fill="#fff04a" />
          <path d={`M${small ? 80 : 92} ${y + 66} q10 -14 18 -4 q8 8 16 -6`} />
        </g>
      ) : grid ? (
        <g strokeWidth="1.6" opacity=".7">
          {[0, 1, 2].map(i => <path key={i} d={`M${x + 36 + i * 16} ${y + 32} v38 M${x + 36} ${y + 38 + i * 12} h${w - 54}`} />)}
        </g>
      ) : (
        <g strokeWidth="2.2" opacity=".75">
          {[0, 1, 2].map(i => <path key={i} d={`M${x + (small ? 20 : 40)} ${y + 40 + i * 11} h${w - (small ? 40 : 62)}`} />)}
        </g>
      )}
      {hard && <path d={`M${x + w - 18} ${y} v18 h18`} fill={b} />}
      <Gloss x={x + w - 14} y={y + 8} width="5" height={h - 16} rx="2.5" />
    </g>
  )
}

/* ---------- Escritura ---------- */
function Pencil({ angle, color, tipInk = INK }) {
  return (
    <g transform={`translate(100 148) rotate(${angle})`}>
      <rect x="-8" y="-8" width="16" height="10" rx="3" fill="#ff8fc4" />
      <rect x="-8" y="-20" width="16" height="12" fill={SILVER} />
      <path d="M-4 -20v12M4 -20v12" strokeWidth="1.8" />
      <rect x="-8" y="-104" width="16" height="84" fill={color} />
      <path d="M-8 -104 L0 -128 L8 -104 Z" fill={WOOD} />
      <path d="M-2.7 -118 L0 -128 L2.7 -118 Z" fill={tipInk} strokeWidth="1.5" />
      <rect x="-4" y="-100" width="3.5" height="76" fill="#fff" opacity=".35" stroke="none" />
    </g>
  )
}

function Pencils({ n, c }) {
  const angles = n === 5 ? [-36, -18, 0, 18, 36] : [-24, 0, 24]
  const order = n === 5 ? [0, 4, 1, 3, 2] : [0, 2, 1]
  const off = PALETTE.indexOf(c)
  return (
    <g>
      <Shadow rx={52} />
      {order.map(i => (
        <Pencil key={i} angle={angles[i]} color={FAN_COLORS[(i + off) % FAN_COLORS.length]} />
      ))}
    </g>
  )
}

function Pen({ angle, color, dark }) {
  return (
    <g transform={`translate(100 146) rotate(${angle})`}>
      <path d="M-6 -36 L-2.5 -4 H2.5 L6 -36 Z" fill={SILVER} />
      <rect x="-7" y="-102" width="14" height="68" rx="5" fill={color} />
      <rect x="-7" y="-124" width="14" height="26" rx="5" fill={dark} />
      <path d="M9 -118 v18" strokeWidth="3" />
      <rect x="-3.5" y="-96" width="3.5" height="54" fill="#fff" opacity=".4" stroke="none" />
    </g>
  )
}

function Pens({ c, dark }) {
  const base = dark ? ['#3a4be0', '#2b2f45', '#3a4be0'] : [c[0], '#7d8cff', c[0]]
  return (
    <g>
      <Shadow rx={46} />
      <Pen angle={-22} color={base[0]} dark={c[1]} />
      <Pen angle={22} color={base[2]} dark={c[1]} />
      <Pen angle={0} color={base[1]} dark={c[1]} />
    </g>
  )
}

function Marker({ angle, color }) {
  return (
    <g transform={`translate(100 146) rotate(${angle})`}>
      <path d="M-5 -6 L-3 -2 H3 L5 -6 Z" fill={INK} />
      <rect x="-10" y="-44" width="20" height="40" rx="4" fill={color} />
      <rect x="-10" y="-98" width="20" height="56" rx="4" fill={PAPER} />
      <rect x="-10" y="-80" width="20" height="14" fill={color} />
      <rect x="-5" y="-94" width="3.5" height="44" fill="#fff" opacity=".5" stroke="none" />
    </g>
  )
}

function Markers({ c }) {
  return (
    <g>
      <Shadow rx={52} />
      <Marker angle={-26} color="#ff4fa3" />
      <Marker angle={26} color="#3ff2a0" />
      <Marker angle={-6} color={c[0]} />
      <Marker angle={10} color="#7d8cff" />
    </g>
  )
}

function Highlighter({ angle, color }) {
  return (
    <g transform={`translate(100 146) rotate(${angle})`}>
      <path d="M-8 -20 L-4 -4 H4 L8 -20 Z" fill={color} />
      <path d="M-12 -44 L-8 -20 H8 L12 -44 Z" fill={INK} />
      <rect x="-12" y="-104" width="24" height="60" rx="5" fill={color} />
      <rect x="-12" y="-82" width="24" height="16" fill={PAPER} />
      <rect x="-7" y="-100" width="4" height="50" fill="#fff" opacity=".45" stroke="none" />
    </g>
  )
}

function Highlighters() {
  return (
    <g>
      <Shadow rx={52} />
      <Highlighter angle={-28} color="#fff04a" />
      <Highlighter angle={28} color="#3ff2a0" />
      <Highlighter angle={0} color="#ff4fa3" />
    </g>
  )
}

function Eraser({ c }) {
  return (
    <g>
      <Shadow />
      <g transform="rotate(-14 100 90)">
        <rect x="70" y="40" width="68" height="34" rx="8" fill={c[0]} />
      </g>
      <g transform="rotate(10 100 100)">
        <rect x="56" y="76" width="88" height="46" rx="10" fill={PAPER} />
        <rect x="56" y="76" width="64" height="46" rx="10" fill={c[0]} />
        <path d="M120 76 v46" />
        <path d="M70 92 h38 M70 104 h26" strokeWidth="2.4" opacity=".6" />
        <Gloss x="62" y="80" width="40" height="5" rx="2.5" />
      </g>
    </g>
  )
}

/* ---------- Mochilas ---------- */
function Backpack({ c, wheels, mini }) {
  const [a, b] = c
  const top = mini ? 50 : 34
  const h = mini ? 90 : 106
  return (
    <g>
      <Shadow />
      {wheels && (
        <g>
          <rect x="92" y="2" width="16" height="30" rx="3" fill={SILVER} />
          <rect x="86" y="0" width="28" height="8" rx="4" fill={INK} />
        </g>
      )}
      <path d={`M88 ${top} q0 -18 12 -18 q12 0 12 18`} fill="none" strokeWidth="5" />
      <ellipse cx="54" cy={top + 56} rx="8" ry="24" fill={b} />
      <ellipse cx="146" cy={top + 56} rx="8" ry="24" fill={b} />
      <rect x="56" y={top} width="88" height={h} rx="30" fill={a} />
      <path d={`M62 ${top + 28} q38 26 76 0`} fill="none" />
      <rect x="70" y={top + h - 52} width="60" height="42" rx="14" fill={b} />
      <path d={`M70 ${top + h - 38} h60`} />
      <circle cx="100" cy={top + h - 38} r="4.5" fill={PAPER} strokeWidth="2.5" />
      <path d={`M100 ${top + 8} v14`} strokeWidth="2.5" />
      <Gloss x="64" y={top + 8} width="6" height={h - 24} rx="3" />
      {wheels && (
        <g>
          <circle cx="76" cy="146" r="8" fill={INK} />
          <circle cx="124" cy="146" r="8" fill={INK} />
        </g>
      )}
    </g>
  )
}

/* ---------- Papelería ---------- */
function Tape({ c }) {
  return (
    <g>
      <Shadow />
      <path d="M128 112 L172 122 L166 138 L118 126 Z" fill={c[0]} opacity=".9" />
      <circle cx="96" cy="84" r="52" fill={c[0]} />
      <circle cx="96" cy="84" r="26" fill={PAPER} />
      <circle cx="96" cy="84" r="36" fill="none" strokeWidth="1.8" opacity=".5" />
      <path d="M62 56 A44 44 0 0 1 96 40" fill="none" stroke="#fff" strokeWidth="5" opacity=".5" />
    </g>
  )
}

function Glue({ c }) {
  return (
    <g>
      <Shadow rx={46} />
      <path d="M92 44 L97 14 H103 L108 44 Z" fill="#ff9d2e" />
      <rect x="88" y="42" width="24" height="22" rx="4" fill={PAPER} />
      <path d="M72 64 q0 -8 10 -8 h36 q10 0 10 8 v64 q0 14 -14 14 H86 q-14 0 -14 -14 Z" fill={PAPER} />
      <rect x="72" y="80" width="56" height="40" fill={c[0]} />
      <path d="M100 88 q-9 12 0 20 q9 -8 0 -20Z" fill={PAPER} strokeWidth="2.5" />
      <Gloss x="78" y="66" width="5" height="64" rx="2.5" />
    </g>
  )
}

function Clips() {
  const clip = (x, y, rot, col) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} fill="none" strokeLinecap="round">
      <path d="M0 0 v54 a10 10 0 0 0 20 0 V10 a6 6 0 0 0 -12 0 v40" stroke={INK} strokeWidth="9" />
      <path d="M0 0 v54 a10 10 0 0 0 20 0 V10 a6 6 0 0 0 -12 0 v40" stroke={col} strokeWidth="4" />
    </g>
  )
  return (
    <g>
      <Shadow rx={50} />
      {clip(52, 40, -18, '#ff4fa3')}
      {clip(112, 30, 14, '#7d8cff')}
      {clip(84, 46, -2, '#3ff2a0')}
      {clip(140, 52, 24, '#ff9d2e')}
    </g>
  )
}

function PostIt() {
  const sheet = (x, y, rot, col, lines) => (
    <g transform={`rotate(${rot} ${x + 34} ${y + 34})`}>
      <rect x={x} y={y} width="68" height="68" rx="4" fill={col} />
      <path d={`M${x + 50} ${y + 68} q0 -14 18 -18 v14 q0 4 -4 4Z`} fill="#fff" opacity=".55" strokeWidth="2" />
      {lines && <path d={`M${x + 12} ${y + 20} h40 M${x + 12} ${y + 32} h30 M${x + 12} ${y + 44} h34`} strokeWidth="2.4" opacity=".6" />}
    </g>
  )
  return (
    <g>
      <Shadow />
      {sheet(40, 60, -10, '#ff4fa3')}
      {sheet(90, 56, 12, '#3ff2a0')}
      {sheet(62, 20, -2, '#fff04a', true)}
    </g>
  )
}

function Bands() {
  const ring = (cx, cy, rx, ry, rot, col) => (
    <g transform={`rotate(${rot} ${cx} ${cy})`} fill="none">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={INK} strokeWidth="13" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={col} strokeWidth="6" />
    </g>
  )
  return (
    <g>
      <Shadow rx={54} />
      {ring(100, 86, 52, 28, -16, '#ff4fa3')}
      {ring(100, 86, 52, 28, 28, '#fff04a')}
      {ring(100, 86, 52, 28, 74, '#3ff2a0')}
      {ring(100, 86, 46, 22, 118, '#7d8cff')}
    </g>
  )
}

function Dividers({ c }) {
  const cols = [c[0], '#fff04a', '#3ff2a0', '#ff9d2e']
  return (
    <g>
      <Shadow />
      {cols.map((col, i) => (
        <g key={i} transform={`rotate(${(i - 1.5) * 5} 100 100)`}>
          <rect x="52" y="30" width="86" height="104" rx="5" fill={col} />
          <rect x={136} y={42 + i * 22} width="16" height="18" rx="4" fill={col} />
        </g>
      ))}
      <rect x="58" y="44" width="60" height="6" rx="3" fill="#fff" opacity=".5" stroke="none" />
    </g>
  )
}

/* ---------- Uniformes ---------- */
function Smock() {
  return (
    <g>
      <Shadow />
      <path d="M74 26 L126 26 L156 54 L146 92 L134 84 L136 142 H64 L66 84 L54 92 L44 54 Z" fill={NAVY[0]} />
      <path d="M74 26 L100 54 L126 26" fill={PAPER} />
      <path d="M100 54 V142" strokeWidth="2.5" />
      <circle cx="108" cy="82" r="3" fill={PAPER} strokeWidth="2" />
      <circle cx="108" cy="104" r="3" fill={PAPER} strokeWidth="2" />
      <circle cx="108" cy="126" r="3" fill={PAPER} strokeWidth="2" />
      <rect x="70" y="100" width="22" height="22" rx="3" fill={NAVY[1]} />
      <Gloss x="60" y="60" width="5" height="60" rx="2.5" />
    </g>
  )
}

function Shorts() {
  return (
    <g>
      <Shadow />
      <path d="M54 36 H146 L156 134 H108 L100 84 L92 134 H44 Z" fill={NAVY[0]} />
      <rect x="54" y="36" width="92" height="16" fill={NAVY[1]} />
      <path d="M100 40 v10 M92 52 q8 14 16 0" fill="none" stroke={PAPER} strokeWidth="2.5" />
      <path d="M52 56 L46 134 M148 56 L154 134" stroke="#fff04a" strokeWidth="5" />
      <Gloss x="62" y="58" width="5" height="52" rx="2.5" />
    </g>
  )
}

function Socks() {
  const sock = (rot, x) => (
    <g transform={`translate(${x} 0) rotate(${rot} 100 90)`}>
      <path d="M70 18 H108 V84 Q108 98 126 104 Q150 114 148 134 Q146 148 128 148 H92 Q70 148 70 126 Z" fill={PAPER} />
      <rect x="70" y="18" width="38" height="12" fill="#2a3cd8" />
      <rect x="70" y="36" width="38" height="8" fill="#ff4fa3" />
      <path d="M92 148 Q70 148 70 126 V110" fill="none" stroke="none" />
      <Gloss x="76" y="48" width="5" height="40" rx="2.5" />
    </g>
  )
  return (
    <g>
      <Shadow />
      {sock(-8, -22)}
      {sock(6, 6)}
    </g>
  )
}

function Tie() {
  return (
    <g>
      <Shadow rx={46} />
      <path d="M84 40 H116 L130 130 L100 148 L70 130 Z" fill="#c62828" />
      <path d="M86 18 H114 L118 42 H82 Z" fill="#a81f1f" />
      <path d="M82 72 L118 64 M78 98 L122 90 M74 124 L126 116" fill="none" stroke="#fff04a" strokeWidth="5" strokeLinecap="butt" />
      <Gloss x="92" y="48" width="5" height="70" rx="2.5" />
    </g>
  )
}

/* ---------- Otros ---------- */
function Scissors({ c }) {
  return (
    <g>
      <Shadow />
      <path d="M88 108 L128 20 L136 26 L98 112 Z" fill={SILVER} />
      <path d="M118 108 L76 20 L68 26 L108 112 Z" fill="#eef0ff" />
      <circle cx="84" cy="128" r="16" fill={c[0]} />
      <circle cx="84" cy="128" r="7" fill={PAPER} />
      <circle cx="122" cy="128" r="16" fill={c[0]} />
      <circle cx="122" cy="128" r="7" fill={PAPER} />
      <circle cx="103" cy="82" r="4" fill={INK} />
    </g>
  )
}

function Ruler({ c }) {
  const ticks = []
  for (let i = 0; i < 16; i++) ticks.push(<path key={i} d={`M${34 + i * 9.4} 62 v${i % 5 === 0 ? 16 : 9}`} strokeWidth="2" />)
  return (
    <g>
      <Shadow />
      <g transform="rotate(-18 100 80)">
        <rect x="14" y="62" width="172" height="38" rx="5" fill={c[0]} />
        {ticks}
        <circle cx="168" cy="86" r="4" fill={PAPER} strokeWidth="2" />
        <Gloss x="20" y="90" width="150" height="4" rx="2" />
      </g>
    </g>
  )
}

function Compass() {
  return (
    <g>
      <Shadow rx={48} />
      <g strokeLinecap="round" fill="none">
        <path d="M100 30 L66 136" stroke={INK} strokeWidth="13" />
        <path d="M100 30 L66 136" stroke={SILVER} strokeWidth="7" />
        <path d="M100 30 L136 136" stroke={INK} strokeWidth="13" />
        <path d="M100 30 L136 136" stroke="#ff9d2e" strokeWidth="7" />
      </g>
      <path d="M62 136 L66 148 L70 136 Z" fill={INK} />
      <path d="M132 136 L136 148 L140 136 Z" fill={INK} />
      <path d="M82 92 Q100 104 118 92" fill="none" strokeWidth="4" />
      <rect x="92" y="10" width="16" height="22" rx="6" fill="#b78cff" />
      <circle cx="100" cy="34" r="6" fill={SILVER} />
    </g>
  )
}

function Protractor({ c }) {
  const ticks = []
  for (let d = 0; d <= 180; d += 10) {
    const r = (d * Math.PI) / 180
    const r1 = d % 30 === 0 ? 50 : 56
    ticks.push(<path key={d} d={`M${100 - Math.cos(r) * 64} ${130 - Math.sin(r) * 64} L${100 - Math.cos(r) * r1} ${130 - Math.sin(r) * r1}`} strokeWidth="2" />)
  }
  return (
    <g>
      <Shadow />
      <path d="M26 132 A74 74 0 0 1 174 132 Z" fill={c[0]} fillOpacity=".55" />
      <path d="M68 132 A32 32 0 0 1 132 132" fill="none" strokeWidth="2.5" />
      {ticks}
      <circle cx="100" cy="132" r="4" fill={INK} />
      <path d="M100 132 L100 92" strokeWidth="2" opacity=".5" />
    </g>
  )
}

function PencilCase({ c }) {
  return (
    <g>
      <Shadow />
      <g transform="rotate(-12 70 70)">
        <rect x="60" y="30" width="12" height="46" rx="2" fill="#fff04a" />
        <path d="M60 30 L66 14 L72 30Z" fill={WOOD} />
      </g>
      <g transform="rotate(10 130 70)">
        <rect x="124" y="30" width="12" height="46" rx="2" fill="#ff4fa3" />
        <path d="M124 30 L130 14 L136 30Z" fill={WOOD} />
      </g>
      <rect x="32" y="62" width="136" height="68" rx="32" fill={c[0]} />
      <path d="M52 82 H148" strokeDasharray="4 5" />
      <rect x="92" y="76" width="16" height="12" rx="4" fill={PAPER} strokeWidth="2.5" />
      <rect x="46" y="98" width="40" height="18" rx="9" fill={c[1]} />
      <Gloss x="52" y="68" width="60" height="4" rx="2" />
    </g>
  )
}

function Folder({ c }) {
  return (
    <g>
      <Shadow />
      <rect x="44" y="26" width="114" height="114" rx="6" fill={c[1]} />
      <rect x="44" y="34" width="114" height="106" rx="6" fill={c[0]} />
      <rect x="88" y="14" width="26" height="24" rx="4" fill={SILVER} />
      <circle cx="101" cy="26" r="4" fill={PAPER} strokeWidth="2.5" />
      <rect x="64" y="72" width="74" height="36" rx="4" fill={PAPER} />
      <path d="M74 84 h50 M74 96 h34" strokeWidth="2.4" opacity=".6" />
      <Gloss x="50" y="44" width="5" height="86" rx="2.5" />
    </g>
  )
}

function Book({ c, atlas }) {
  return (
    <g>
      <Shadow />
      <rect x="62" y="22" width="86" height="122" rx="6" fill={PAPER} />
      <path d="M72 138 H150 M72 132 H150" strokeWidth="2" opacity=".5" />
      <rect x="54" y="18" width="88" height="122" rx="6" fill={c[0]} />
      <rect x="54" y="18" width="16" height="122" rx="6" fill={c[1]} />
      {atlas ? (
        <g>
          <circle cx="104" cy="82" r="28" fill="#7d8cff" />
          <path d="M92 66 q8 -6 14 2 q4 8 -4 10 q-8 2 -6 10 q-8 -4 -6 -14 Z M110 92 q10 -2 12 6 q-6 8 -12 2 Z" fill="#3ff2a0" strokeWidth="2" />
          <ellipse cx="104" cy="82" rx="12" ry="28" fill="none" strokeWidth="2" opacity=".5" />
          <path d="M76 82 H132" strokeWidth="2" opacity=".5" />
          <path d="M80 130 h48" strokeWidth="3" />
        </g>
      ) : (
        <g>
          <rect x="80" y="36" width="50" height="34" rx="4" fill={PAPER} />
          <text x="105" y="62" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontWeight="800" fontSize="24" fill={INK} stroke="none">Aa</text>
          <path d="M80 90 h50 M80 102 h38 M80 114 h44" strokeWidth="2.6" opacity=".6" />
        </g>
      )}
      <Gloss x="136" y="26" width="4" height="104" rx="2" />
    </g>
  )
}

/* ---------- Selector ---------- */
function pickShape(kind, product, c) {
  const t = norm(product.title)
  switch (kind) {
    case 'cuaderno': return <Notebook c={c} t={t} />
    case 'libreta': return <Notebook c={c} t={t} small />
    case 'mochila': return <Backpack c={c} wheels={t.includes('ruedas')} mini={t.includes('mini')} />
    case 'lapices': return <Pencils n={t.includes('x12') || t.includes('x48') ? 5 : 3} c={c} />
    case 'boligrafos': return <Pens c={c} dark={t.includes('negros')} />
    case 'marcadores': return <Markers c={c} />
    case 'resaltadores': return <Highlighters />
    case 'borrador': return <Eraser c={c} />
    case 'cinta': return <Tape c={c} />
    case 'pegamento': return <Glue c={c} />
    case 'clips': return <Clips />
    case 'postit': return <PostIt />
    case 'ligas': return <Bands />
    case 'separadores': return <Dividers c={c} />
    case 'delantal': return <Smock />
    case 'calzoneta': return <Shorts />
    case 'calcetines': return <Socks />
    case 'corbata': return <Tie />
    case 'tijeras': return <Scissors c={c} />
    case 'regla': return <Ruler c={c} />
    case 'compas': return <Compass />
    case 'transportador': return <Protractor c={c} />
    case 'cartuchera': return <PencilCase c={c} />
    case 'carpeta': return <Folder c={c} />
    case 'diccionario': return <Book c={c} />
    case 'atlas': return <Book c={c} atlas />
    default: return <Notebook c={c} t={t} />
  }
}

export default function ProductArt({ product, size, className = '' }) {
  const kind = detectKind(product)
  const named = /azul/i.test(product.title) ? PALETTE[1] : /negr/i.test(product.title) ? ['#3a3f5c', '#1e2233'] : null
  const c = named || PALETTE[(Number(product.id) * 5 + 1) % PALETTE.length]
  const style = size ? { width: size, height: size * 0.8 } : undefined
  return (
    <span className={`product-art ${className}`} role="img" aria-label={product.title} style={style}>
      <svg viewBox="0 0 200 160" aria-hidden="true" focusable="false">
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {pickShape(kind, product, c)}
        </g>
      </svg>
    </span>
  )
}
