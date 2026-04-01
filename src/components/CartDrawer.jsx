import { useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart()

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer-panel">
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Tu carrito</h3>
          <div style={{display:'flex', gap:8}}>
            <button onClick={clearCart}>Vaciar</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </header>

        <div style={{marginTop:12}}>
          {cart.length === 0 ? <p className="muted">Carrito vacío</p> : (
            <ul style={{display:'grid', gap:10}}>
              {cart.map(item => (
                <li key={item.id} style={{display:'flex', gap:10, alignItems:'center'}}>
                  <img src={(item.images && item.images[0]) || '/vite.svg'} alt={item.title} style={{width:64, height:48, objectFit:'cover', borderRadius:6}} />
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600}}>{item.title}</div>
                    <div className="muted">${item.price} · <small className="muted">SKU: {item.sku}</small></div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6}}>
                    <div style={{display:'flex', gap:6, alignItems:'center'}}>
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <div style={{minWidth:28, textAlign:'center'}}>{item.qty}</div>
                      <button onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{fontSize:12}}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer style={{marginTop:14}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="muted">Total</div>
            <div style={{fontWeight:700}}>${totalPrice}</div>
          </div>
          <div style={{marginTop:10, display:'flex', gap:8}}>
            <button className="glow" onClick={() => alert('Checkout simulado')}>Pagar</button>
            <button onClick={onClose}>Seguir comprando</button>
          </div>
        </footer>
      </aside>
    </div>
  )
}
