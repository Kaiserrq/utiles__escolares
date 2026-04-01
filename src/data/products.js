// Útiles Escolares 2026 - Webcole
// Categorías: Cuadernos, Escritura, Mochilas, Papelería, Uniformes, Otros

export const products = [
  // CUADERNOS
  { id: '1', sku: 'CUD-A4-100R', title: 'Cuaderno A4 Rayado 100 hojas', brand: 'Académico', category: 'Cuadernos', price: 12, stock: 50, rating: 4.8, description: 'Cuaderno de 100 hojas rayadas, papel de calidad 80gsm. Ideal para todas las asignaturas.', images: ['/images/cuaderno-a4-rayado.svg'] },
  { id: '2', sku: 'CUD-A5-80C', title: 'Cuaderno A5 Cuadriculado 80 hojas', brand: 'Escolares Plus', category: 'Cuadernos', price: 8, stock: 60, rating: 4.7, description: 'Cuaderno compacto A5 con hojas cuadriculadas, perfecto para matemáticas.', images: ['/images/cuaderno-a5-cuad.svg'] },
  { id: '3', sku: 'CUD-ESPI-120', title: 'Cuaderno Espiral 120 hojas A4', brand: 'Nexo', category: 'Cuadernos', price: 15, stock: 35, rating: 4.6, description: 'Cuaderno con espiral de metal, hojas rayadas, fácil de portar.', images: ['/images/cuaderno-espiral.svg'] },
  { id: '4', sku: 'CUD-DIBUJO-A4', title: 'Cuaderno de Dibujo A4', brand: 'Creativo', category: 'Cuadernos', price: 14, stock: 40, rating: 4.8, description: 'Papel liso 160gsm para dibujo y diseño artístico. 60 hojas.', images: ['/images/cuaderno-dibujo.svg'] },
  { id: '5', sku: 'LIBRETA-50', title: 'Libreta de Notas 50 hojas', brand: 'Memo', category: 'Cuadernos', price: 6, stock: 70, rating: 4.5, description: 'Pequeña libreta para apuntes rápidos y recordatorios.', images: ['/images/libreta-notas.svg'] },
  { id: '6', sku: 'CUD-DURA-A4', title: 'Cuaderno Tapa Dura A4', brand: 'Premium', category: 'Cuadernos', price: 18, stock: 25, rating: 4.9, description: 'Cuaderno con tapa dura plastificada, 200 hojas rayadas.', images: ['/images/cuaderno-duro.svg'] },

  // ESCRITURA
  { id: '7', sku: 'LAP-BORRABLES-12', title: 'Lápices Borrables x12', brand: 'Faber-Castell', category: 'Escritura', price: 18, stock: 40, rating: 4.9, description: 'Caja con 12 lápices HB con gomas borrador incluidas. Trazo suave.', images: ['/images/lapices-borrables.svg'] },
  { id: '8', sku: 'BOL-GEL-10', title: 'Bolígrafos Gel Azules x10', brand: 'Bic', category: 'Escritura', price: 10, stock: 80, rating: 4.7, description: 'Pack de 10 bolígrafos de gel azul, tinta fluida y secado rápido.', images: ['/images/boligrafos-gel.svg'] },
  { id: '9', sku: 'MAR-PERM-24', title: 'Marcadores Permanentes x24', brand: 'Staedtler', category: 'Escritura', price: 32, stock: 20, rating: 4.8, description: 'Estuche con 24 colores vibrantes de marcadores permanentes.', images: ['/images/marcadores-24.svg'] },
  { id: '10', sku: 'LAP-COLOR-48', title: 'Lápices de Color x48', brand: 'Prismacolor', category: 'Escritura', price: 28, stock: 30, rating: 4.9, description: 'Set de 48 lápices de color profesional con pigmento rico.', images: ['/images/lapices-color.svg'] },
  { id: '11', sku: 'BOL-NEGRA-50', title: 'Bolígrafos Negros x50', brand: 'Bic', category: 'Escritura', price: 20, stock: 100, rating: 4.6, description: 'Pack económico de 50 bolígrafos negros para exámenes.', images: ['/images/boligrafos-negros.svg'] },
  { id: '12', sku: 'MECANICOs-PAQ', title: 'Lápices Mecánicos Set', brand: 'Rotring', category: 'Escritura', price: 22, stock: 25, rating: 4.8, description: 'Set con lápices mecánicos 0.5mm y minas incluidas.', images: ['/images/lapices-mecanicos.svg'] },
  { id: '13', sku: 'BORRADOR-PACK', title: 'Borradores Escuela x6', brand: 'Staedtler', category: 'Escritura', price: 8, stock: 90, rating: 4.7, description: 'Pack de 6 pequeños borradores rosados para lápiz.', images: ['/images/borradores.svg'] },

  // MOCHILAS
  { id: '14', sku: 'MOC-ESCOLAR-AZUL', title: 'Mochila Escolar Azul', brand: 'SwissPack', category: 'Mochilas', price: 65, stock: 15, rating: 4.9, description: 'Mochila ergonómica con múltiples compartimentos y respaldo acolchado para soporte.', images: ['/images/mochila-azul.svg'] },
  { id: '15', sku: 'MOC-DEPORTIVA', title: 'Mochila Deportiva', brand: 'Nike', category: 'Mochilas', price: 85, stock: 12, rating: 4.8, description: 'Mochila deportiva con diseño moderno, correas ajustables y bolsillos laterales.', images: ['/images/mochila-deportiva.svg'] },
  { id: '16', sku: 'MOC-RUEDAS-2026', title: 'Mochila con Ruedas', brand: 'Trolley', category: 'Mochilas', price: 95, stock: 10, rating: 4.9, description: 'Mochila con ruedas telescópicas y asa de remolque. Ideal para primaria.', images: ['/images/mochila-ruedas.svg'] },
  { id: '17', sku: 'MOC-MINI-PRIMA', title: 'Mochila Mini Primaria', brand: 'Infantil', category: 'Mochilas', price: 45, stock: 20, rating: 4.7, description: 'Mochila tamaño reducido con estampados coloridos para niños pequeños.', images: ['/images/mochila-mini.svg'] },
  { id: '18', sku: 'MOC-EXPANDIBLE', title: 'Mochila Expandible 40L', brand: 'Venture', category: 'Mochilas', price: 75, stock: 18, rating: 4.8, description: 'Mochila de gran capacidad con expandibles, ideal para secundaria.', images: ['/images/mochila-expandible.svg'] },

  // PAPELERÍA
  { id: '19', sku: 'PAP-ADHESIVA-50m', title: 'Cinta Adhesiva 50m', brand: 'Scotch', category: 'Papelería', price: 5, stock: 100, rating: 4.6, description: 'Rollo de cinta adhesiva transparente de 50 metros, perfecta para proyectos.', images: ['/images/cinta-adhesiva.svg'] },
  { id: '20', sku: 'PAP-PEGAMENTO-250', title: 'Pegamento Blanco 250ml', brand: 'Vinilo', category: 'Papelería', price: 6, stock: 75, rating: 4.7, description: 'Pegamento blanco polidispersor para papier mâché y manualidades.', images: ['/images/pegamento.svg'] },
  { id: '21', sku: 'PAP-RESALTADORES-6', title: 'Resaltadores Fluorescentes x6', brand: 'Cra-Z-Art', category: 'Papelería', price: 11, stock: 45, rating: 4.8, description: 'Set de 6 resaltadores en colores neón de alta intensidad.', images: ['/images/resaltadores.svg'] },
  { id: '22', sku: 'PAP-CLIPS-100', title: 'Clips de Metal x100', brand: 'Office Max', category: 'Papelería', price: 4, stock: 150, rating: 4.5, description: 'Caja con 100 clips metálicos #1 para organizar documentos.', images: ['/images/clips.svg'] },
  { id: '23', sku: 'PAP-POSIT-COLORES', title: 'Post-it Colores Variados', brand: '3M', category: 'Papelería', price: 9, stock: 60, rating: 4.8, description: 'Paquete de notas adhesivas en 5 colores vibrantes.', images: ['/images/posit.svg'] },
  { id: '24', sku: 'PAP-LIGAS-COLORES', title: 'Ligas de Colores 100pz', brand: 'Elástica', category: 'Papelería', price: 3, stock: 200, rating: 4.6, description: 'Paquete de 100 ligas elásticas en varios colores.', images: ['/images/ligas.svg'] },
  { id: '25', sku: 'PAP-SEPARADORES', title: 'Separadores de Cartulina x10', brand: 'Académico', category: 'Papelería', price: 7, stock: 80, rating: 4.7, description: 'Set de 10 separadores/pestañas de cartulina coloreada para organizar materia.', images: ['/images/separadores.svg'] },

  // UNIFORMES Y ACCESORIOS
  { id: '26', sku: 'UNI-DELANTAL', title: 'Delantal Escolar', brand: 'Uniforme Co', category: 'Uniformes', price: 35, stock: 30, rating: 4.7, description: 'Delantal escolar de algodón azul marino con bolsillos. Talla única.', images: ['/images/delantal.svg'] },
  { id: '27', sku: 'UNI-CALZONETA', title: 'Calzoneta Escolar', brand: 'Sport', category: 'Uniformes', price: 28, stock: 40, rating: 4.6, description: 'Calzoneta deportiva escolar en azul o blanco. Tallas S-XXL.', images: ['/images/calzoneta.svg'] },
  { id: '28', sku: 'UNI-CALCETINES', title: 'Calcetines Uniformados x6 Pares', brand: 'Comfort', category: 'Uniformes', price: 18, stock: 50, rating: 4.7, description: '6 pares de calcetines blancos escolares con logo bordado.', images: ['/images/calcetines.svg'] },
  { id: '29', sku: 'UNI-CORBATA', title: 'Corbata Escolar', brand: 'Formal', category: 'Uniformes', price: 12, stock: 60, rating: 4.5, description: 'Corbata escolar de poliéster en color azul marino con nudo pre-hecho.', images: ['/images/corbata.svg'] },

  // OTROS
  { id: '30', sku: 'OTR-TIJERAS', title: 'Tijeras de Precisión', brand: 'Fiskars', category: 'Otros', price: 14, stock: 30, rating: 4.7, description: 'Tijeras ergonómicas con filo de acero inoxidable, perfectas para manualidades.', images: ['/images/tijeras.svg'] },
  { id: '31', sku: 'OTR-REGLA-30', title: 'Regla Metálica 30cm', brand: 'Staedtler', category: 'Otros', price: 8, stock: 60, rating: 4.6, description: 'Regla de aluminio anodizado con borde seguro para medir.', images: ['/images/regla.svg'] },
  { id: '32', sku: 'OTR-COMPAS', title: 'Compás Profesional', brand: 'Maped', category: 'Otros', price: 16, stock: 25, rating: 4.8, description: 'Compás de metal con puntas intercambiables para geometría.', images: ['/images/compas.svg'] },
  { id: '33', sku: 'OTR-TRANSPORT', title: 'Transportador', brand: 'Geometry', category: 'Otros', price: 5, stock: 80, rating: 4.6, description: 'Transportador semicircular de 180 grados, plástico transparente.', images: ['/images/transportador.svg'] },
  { id: '34', sku: 'OTR-CARTUCHERA', title: 'Cartuchera de Tela', brand: 'Organiza', category: 'Otros', price: 16, stock: 45, rating: 4.8, description: 'Cartuchera de tela grande con compartimentos para lápices y útiles.', images: ['/images/cartuchera.svg'] },
  { id: '35', sku: 'OTR-CARPETA-PLAST', title: 'Carpeta Plástica A4', brand: 'Office', category: 'Otros', price: 4, stock: 120, rating: 4.5, description: 'Carpeta plástica con broche para guardar documentos escolares.', images: ['/images/carpeta.svg'] },
  { id: '36', sku: 'OTR-DICCIONARIO', title: 'Diccionario Escolar', brand: 'Larousse', category: 'Otros', price: 25, stock: 20, rating: 4.9, description: 'Diccionario de bolsillo con 15,000 palabras y ejemplos de uso.', images: ['/images/diccionario.svg'] },
  { id: '37', sku: 'OTR-ATLAS', title: 'Atlas Geográfico', brand: 'Mapas Mundi', category: 'Otros', price: 45, stock: 15, rating: 4.8, description: 'Atlas con mapas políticos y físicos de todos los países.', images: ['/images/atlas.svg'] }
]
