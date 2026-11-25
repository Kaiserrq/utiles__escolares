import LegalPage from './LegalPage.jsx'

const sections = [
  { id: 'uso', title: 'Uso del sitio', body: [
    'Al navegar y comprar en Webcole aceptas estos términos. Debes ser mayor de edad o contar con la autorización de tu padre, madre o tutor para realizar compras.',
    'Nos reservamos el derecho de actualizar el catálogo, los precios y estos términos. La versión vigente es la publicada en esta página.',
  ] },
  { id: 'precios', title: 'Precios e IGV', body: [
    'Todos los precios están expresados en soles (S/) e incluyen el IGV (18 %). El comprobante detalla la operación gravada y el impuesto.',
    'Si detectamos un error evidente de precio, te avisaremos antes de procesar el pedido.',
  ] },
  { id: 'pagos', title: 'Pagos (simulados)', body: [
    'En esta demostración los pagos son simulados: no se cobra nada ni se guardan datos de tarjetas ni de billeteras. En la web real se aceptarían Yape, Plin, tarjetas Visa y Mastercard, PagoEfectivo y transferencia bancaria.',
    'Después de pagar se emitiría una boleta o factura electrónica con los datos que indiques.',
  ] },
  { id: 'envios', title: 'Envíos', body: [
    'El envío es gratis en compras desde S/ 50. Por debajo de ese monto se muestra el costo antes de confirmar el pedido.',
    'Los plazos dependen de tu distrito y del stock disponible; te informaremos la fecha estimada al confirmar la compra.',
  ] },
  { id: 'devoluciones', title: 'Cambios y devoluciones', body: [
    'Puedes solicitar un cambio o devolución dentro de los 7 días posteriores a la entrega, siempre que el producto esté sin uso y en su empaque original.',
    'Para iniciar el trámite escríbenos con tu número de comprobante.',
  ] },
  { id: 'reclamaciones', title: 'Libro de reclamaciones', body: [
    'Una tienda real en Perú debe contar con un Libro de Reclamaciones (físico o virtual) y exhibirlo de forma visible. Esta demostración no lo incluye, pero en la web real aparecería un acceso directo en el pie de página.',
  ] },
  { id: 'contacto', title: 'Contacto', body: [
    'Si tienes dudas sobre estos términos, escríbenos desde la página de Contacto. Responderemos lo antes posible.',
  ] },
]

export default function Terms() {
  return <LegalPage title="Términos y condiciones" subtitle="Las reglas básicas para comprar con tranquilidad." sections={sections} />
}
