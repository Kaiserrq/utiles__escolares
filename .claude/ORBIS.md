# Orbis: Webcole (tienda de útiles escolares)

## Qué es
SPA React 19 + Vite 7 + react-router-dom 6. Catálogo de 37 productos (src/data/products.js), carrito "Mi lista" en localStorage, checkout simulado.

## Cómo correr
- `npm run dev` (desarrollo), `npm run build`, `npm run lint` (deben quedar sin errores).

## Estructura
- src/index.css: tokens (:root), base, foco, reduced-motion. src/App.css: estilos de todos los componentes.
- src/data/: products.js, categories.js (color por categoría + producto representativo).
- src/components/: Header (menú hamburguesa <1024), HeroScene (escena 3D CSS con tilt), ProductArt (arte SVG),
  ProductCard, CartDrawer, CartItem, CartSummary, EmptyList, PageHeader, Footer, Logo.
- src/pages/: Home (hero, cinta, catálogo con pestañas, ?category= y ?q= con useSearchParams), Product, Categories (mosaico), Cart, About, Contact, FAQ.
- src/hooks/: tilt.js (createTilt, inclinación 3D por puntero), useScrollLock.js.
- src/context/CartContext.jsx: addToCart(product, qty), updateQty, removeFromCart, clearCart.

## Decisiones de diseño
- Concepto "cuaderno cuadriculado + resaltador": fondo cuadriculado 24px, piezas tipo sticker (borde ink 2px + sombra dura), pestañas de carpeta, carrito en papel rayado con margen rojo.
- Tokens: ink #1a2bd6, ink-deep #0e1766, paper #f7f9ff, resaltadores (yellow, pink, green, orange, lilac, sky). Color por categoría en categories.js.
- Tema Claro/Oscuro/Auto: useTheme.js (store global, localStorage 'theme', data-theme en <html>, script anti-parpadeo en index.html), ThemeSwitch.jsx (header >=1024 y menú móvil, que además lista chips de categorías).
- Tokens semánticos en index.css (por tema): --surface, --paper, --grid, --line (bordes/sombra sticker/links), --text-strong, --graphite, --muted, --primary(-hover), --footer-bg, --overlay, --hl-bar, --art-mix, --info-mix. --on-hl (#0e1766 fijo) SIEMPRE para texto sobre resaltadores. No usar --ink/--ink-deep fuera de la escena 3D (stickers).
- Moneda: S/ (PEN) con src/utils/money.js (formatPEN, formatPENAmount); en tarjetas "S/" en span .cur.
- Fuentes: Bricolage Grotesque (todo) + Caveat (solo notas a mano), vía Google Fonts en index.html.
- Las imágenes de public/images están VACÍAS (0 bytes): el arte de producto se dibuja en código en ProductArt.jsx según palabras del título.
- Tilt 3D solo con ratón y sin prefers-reduced-motion; animaciones con transform/opacity.
- Breakpoints: <640 móvil, 640-1023 tablet, >=1024 laptop.

## Pendientes
- Imágenes reales de producto (reemplazar ProductArt si se desea).
- Checkout real (hoy es mensaje simulado).
- Términos y Privacidad son anclas vacías.
