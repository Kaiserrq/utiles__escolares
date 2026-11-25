import LegalPage from './LegalPage.jsx'

const sections = [
  { id: 'datos', title: 'Datos que se pedirían', body: [
    'En una tienda real se solicitarían tu nombre, DNI o RUC (para el comprobante), dirección de entrega, correo y teléfono. Esta demostración no envía ni almacena esos datos en ningún servidor.',
  ] },
  { id: 'finalidad', title: 'Para qué se usarían', body: [
    'Los datos servirían para procesar tu pedido, emitir el comprobante electrónico, coordinar la entrega y atender consultas o reclamos. No se usarían para fines distintos sin tu consentimiento.',
  ] },
  { id: 'ley', title: 'Ley N.º 29733', body: [
    'El tratamiento de datos personales en Perú se rige por la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento. Una tienda real debe informar el titular del banco de datos, la finalidad y los plazos de conservación.',
  ] },
  { id: 'arco', title: 'Derechos ARCO', body: [
    'Como titular de tus datos puedes ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo al contacto indicado abajo. Se atendería tu solicitud en los plazos que fija la ley.',
  ] },
  { id: 'cookies', title: 'Cookies y almacenamiento local', body: [
    'Esta demostración no usa cookies de seguimiento. Solo utiliza el almacenamiento local de tu navegador (localStorage) para recordar tu lista de útiles y el tema claro u oscuro. Puedes borrarlo desde la configuración de tu navegador.',
  ] },
  { id: 'contacto', title: 'Contacto', body: [
    'Para consultas sobre privacidad o para ejercer tus derechos, usa la página de Contacto.',
  ] },
]

export default function Privacy() {
  return <LegalPage title="Política de privacidad" subtitle="Cómo cuidaríamos tus datos." sections={sections} />
}
