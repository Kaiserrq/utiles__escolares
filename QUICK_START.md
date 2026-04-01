# 🎯 GUÍA RÁPIDA - Webcole 2026

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
cd ugel_mobile
npm install
```

### 2. Desarrollo local
```bash
npm run dev
# Abre http://localhost:5176
```

### 3. Build para producción
```bash
npm run build
# Archivo: dist/index.html
```

---

## 📋 Estructura de URLs

| Página | URL | Descripción |
|--------|------|-------------|
| Inicio | `/` | Grid 37 productos + promo |
| Producto | `/product/:id` | Detalle individual |
| Carrito | `/cart` | Página carrito completa |
| Categorías | `/categorias` | Listar todas las categorías |
| Acerca | `/acerca` | Info Webcole + uploader |
| Contacto | `/contacto` | Formulario contacto |
| FAQ | `/faq` | 5 preguntas frecuentes |

---

## 🛒 Features del Carrito

### Vista Drawer (Sidebar derecho)
- Click en button "🛒 Carrito" en header
- Overlay oscuro para cerrar
- Tecla ESC para cerrar
- Items con +/- para ajustar qty
- Botón "Vaciar carrito"
- Total dinámico

### Vista Full-Page (/cart)
- Tabla detallada de items
- Imagen thumbnail
- Cantidad ajustable inline
- Subtotal por producto
- Total general
- Botón "Procesar compra" (simulado)

### Persistencia
- Datos guardados automáticamente en localStorage
- Se recupera al reiniciar navegador
- Sincroniza entre pestañas

---

## 🎨 Customización de Colores

Editar [src/index.css](src/index.css) sección `:root`:

```css
:root {
  --bg: #f8f9fa;              /* Cambiar fondo */
  --card: #ffffff;            /* Cambiar tarjetas */
  --accent: #3b82f6;          /* Azul primario */
  --accent-2: #10b981;        /* Verde secundario */
  --accent-3: #f59e0b;        /* Naranja/oro */
  --accent-4: #8b5cf6;        /* Púrpura */
  --surface: #f1f5f9;
  --muted: #64748b;
}
```

---

## 🖼️ Agregar Nuevos Productos

### 1. Crear SVG
```bash
# Guardar en: public/images/mi-producto.svg
```

### 2. Agregar a `src/data/products.js`
```javascript
{
  id: '38',
  sku: 'NEW-001',
  title: 'Mi Nuevo Producto',
  brand: 'Marca',
  category: 'Papelería', // o otra categoría existente
  price: 25,
  stock: 50,
  rating: 4.5,
  description: 'Descripción del producto...',
  images: ['/images/mi-producto.svg']
}
```

### 3. Compilar
```bash
npm run build
```

---

## 🔍 Búsqueda y Filtros

### Búsqueda por Nombre
```
Input: "cuaderno"
→ Filtra productos que coincidan con el título
```

### Filtro por Categoría
```
URL: /?category=Cuadernos
→ Muestra solo productos de esa categoría

URLs Categorías disponibles:
- ?category=Cuadernos
- ?category=Escritura
- ?category=Mochilas
- ?category=Papelería
- ?category=Uniformes
- ?category=Otros
```

### Búsqueda Combinada
```
URL: /?category=Escritura
Input: "lápices"
→ Filtra Escritura + nombre contiene "lápices"
```

---

## 📦 Catálogo 37 Productos

### Rango de Precios
- **Mínimo:** $3 (Ligas de colores)
- **Máximo:** $95 (Mochila con ruedas)
- **Promedio:** $24

### Top 10 Productos Más Caros
1. Mochila con Ruedas - $95
2. Mochila Deportiva - $85
3. Mochila Escolar Azul - $65
4. Mochila Expandible 40L - $75
5. Atlas Geográfico - $45
6. Mochila Mini Primaria - $45
7. Cuaderno Tapa Dura A4 - $18
8. Lápices Borrables x12 - $18
9. Lápices Mecánicos Set - $22
10. Bolígrafos Negros x50 - $20

### Stock Disponible
- Stock mínimo: 10 (Atlas, Mochilas con ruedas)
- Stock máximo: 200 (Ligas de colores)
- Promedio: ~45 items por producto

---

## ⚙️ Configuración Técnica

### Variables de Entorno
No requiere .env (dev + prod sin API externa)

### Performance
- **Build size:** 237KB JS + 6KB CSS (antes gzip)
- **Assets:** 37 SVGs (optimizados)
- **Modules:** 46 total
- **Load time:** <1 segundo

### Compatibilidad
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile (iOS 12+, Android 5+)

---

## 🐛 Troubleshooting

### Puerto 5173 en uso
```bash
# Vite intenta automáticamente otros puertos:
# 5173 → 5174 → 5175 → 5176...
# Check terminal output para ver puerto asignado
```

### Imágenes SVG no cargan
```bash
# Verificar: public/images/mi-archivo.svg
# Asegurarse que existe en products.js
npm run build && npm run preview
```

### Carrito no persiste
```bash
# Limpiar localStorage en DevTools
# localStorage.clear()
# Recargar página
```

### Build lento
```bash
# Limpiar cache
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Estructura de Datos

### Product Object
```javascript
{
  id: string,
  sku: string,              // Stock Keeping Unit único
  title: string,
  brand: string,
  category: string,         // Una de 6 categorías
  price: number,
  stock: number,
  rating: number,           // 4.5 - 4.9
  description: string,
  images: [string]          // Array de paths a SVGs
}
```

### Cart Item Object
```javascript
{
  id: string,
  qty: number,
  title: string,
  price: number,
  brand: string,
  images: [string]
}
```

---

## 🔐 Seguridad

- ✅ No almacena datos sensibles (localStorage solo = carrito)
- ✅ Inputs sanitizados (React automáticamente)
- ✅ CORS no necesario (SPA estática)
- ✅ SSL recomendado en producción

---

## 📈 Analytics (Opcional)

Para agregar Google Analytics:

```html
<!-- En public/index.html body -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 📝 Licencia

Webcole © 2026 - Todos los derechos reservados

---

**Última revisión:** 2024  
**Manual versión:** 1.0  
**Estado:** ✅ ACTIVO
