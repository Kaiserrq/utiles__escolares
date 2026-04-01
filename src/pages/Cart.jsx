import { useCart } from '../context/CartContext.jsx'

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()

  if (cart.length === 0) return <div className="app-root"><h2>Carrito</h2><p className="muted">Carrito vacío</p></div>

  return (
    <div className="app-root">
      <h2>Carrito</h2>
      <div className="sidebar">
        <ul>
          {cart.map(item => (
            <li key={item.id} style={{display:'flex', gap:12, alignItems:'center', marginBottom:10}}>
              <img src={(item.images && item.images[0]) || '/vite.svg'} alt={item.title} style={{width:64, height:48, objectFit:'cover', borderRadius:6}} />
              <div style={{flex:1}}>
                <div>{item.title} <span className="muted">x {item.qty}</span></div>
                <div className="muted">${item.price} c/u</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div>${item.price * item.qty}</div>
                <button onClick={() => removeFromCart(item.id)}>Quitar</button>
              </div>
            </li>
          ))}
        </ul>
        <p><strong>Total: ${totalPrice}</strong></p>
        <div style={{display:'flex', gap:8}}>
          <button className="glow" onClick={() => alert('Checkout simulado')}>Pagar</button>
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      </div>
    </div>
  )
}
