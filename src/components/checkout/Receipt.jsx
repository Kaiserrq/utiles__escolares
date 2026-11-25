import { formatPEN } from '../../utils/money.js'

export default function Receipt({ data }) {
  const { type, serie, items, total, customer, methodLabel, date } = data
  const gravada = total / 1.18
  const igv = total - gravada
  const isFactura = type === 'factura'
  const when = date.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'medium' })

  return (
    <article className="receipt" aria-label="Comprobante de pago simulado">
      <div className="rc-stamp" aria-hidden="true">SIMULACIÓN · SIN VALOR TRIBUTARIO</div>
      <header className="rc-head">
        <div>
          <h3 className="rc-brand">Webcole (demo)</h3>
          <p>RUC 20000000001</p>
          <p>Av. Ficticia 123, Lima, Perú</p>
        </div>
        <div className="rc-doc">
          <p className="rc-ruc">RUC 20000000001</p>
          <p className="rc-type">{isFactura ? 'FACTURA ELECTRÓNICA' : 'BOLETA DE VENTA ELECTRÓNICA'}</p>
          <p className="rc-serie">{serie}</p>
        </div>
      </header>

      <dl className="rc-cust">
        <div><dt>Fecha de emisión</dt><dd>{when}</dd></div>
        <div><dt>{isFactura ? 'Razón social' : 'Cliente'}</dt><dd>{customer.name}</dd></div>
        <div><dt>{isFactura ? 'RUC' : 'DNI'}</dt><dd>{customer.doc}</dd></div>
        {isFactura && customer.address && <div><dt>Dirección</dt><dd>{customer.address}</dd></div>}
        <div><dt>Forma de pago</dt><dd>{methodLabel}</dd></div>
      </dl>

      <div className="rc-table-wrap">
        <table className="rc-table">
          <thead>
            <tr><th>Cant.</th><th>Descripción</th><th className="num">P. unit.</th><th className="num">Importe</th></tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.qty}</td>
                <td>{it.title || it.name}</td>
                <td className="num">{formatPEN(it.price)}</td>
                <td className="num">{formatPEN(it.price * it.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="rc-totals">
        <div><dt>Op. gravada</dt><dd>{formatPEN(gravada)}</dd></div>
        <div><dt>IGV 18%</dt><dd>{formatPEN(igv)}</dd></div>
        <div className="rc-total"><dt>Importe total</dt><dd>{formatPEN(total)}</dd></div>
      </dl>

      <footer className="rc-foot">Documento de demostración generado por la simulación de Webcole.</footer>
    </article>
  )
}
