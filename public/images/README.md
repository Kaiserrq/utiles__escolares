Carpeta `public/images` - Webcole
===================================

Coloca aquí las imágenes de los útiles escolares para Webcole. Cualquier archivo que metas en esta carpeta estará disponible con la ruta `/images/<nombre-de-archivo>`.

Recomendaciones:
- Nombres sin espacios, preferiblemente `kebab-case`: `smartphone-x1.jpg`, `laptop-pro-14.png`.
- Formatos recomendados: `.jpg`, `.png`, `.webp`, o `.svg`.
- Tamaño sugerido para imágenes de producto: 1200×800 px (se escalarán para miniaturas).

Ejemplo de uso en `src/data/products.js`:

```js
images: ['/images/smartphone-x1.jpg', '/images/smartphone-x1-2.jpg']
```

Pasos después de agregar/actualizar imágenes:
1. Guarda los archivos en `public/images`.
2. Actualiza las rutas en `src/data/products.js` si usas nombres diferentes.
3. Para ver los cambios en producción local, vuelve a generar la build:

```bash
npm run build
npm run preview
```

Nota: no modifiques la carpeta `dist/` manualmente; `dist` se sobrescribe cada vez que ejecutas `npm run build`.
