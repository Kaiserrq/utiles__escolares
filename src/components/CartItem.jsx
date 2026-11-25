import { Link } from 'react-router-dom'
import ProductArt from './ProductArt.jsx'
import { useCart } from '../context/CartContext.jsx'
import { categoryColor } from '../data/categories.js'
import { formatPEN } from '../utils/money.js'

export default function CartItem({ item, onNavigate }) {
  const { updateQty, removeFromCart } = useCart()
  return (
    <li className="cart-item">
      <div className="cart-item-art" style={{ '--cat': categoryColor(item.category) }}>
        <ProductArt product={item} size={52} />
      </div>
      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-title" onClick={onNavigate}>{item.title}</Link>
        <span className="cart-item-unit">{formatPEN(item.price)} c/u</span>
        <div className="stepper" role="group" aria-label={`Cantidad de ${item.title}`}>
          <button type="button" onClick={() => updateQty(item.id, -1)} aria-label="Quitar una unidad">−</button>
          <span aria-live="polite">{item.qty}</span>
          <button type="button" onClick={() => updateQty(item.id, 1)} aria-label="Agregar una unidad">+</button>
        </div>
      </div>
      <div className="cart-item-side">
        <strong className="cart-item-sub">{formatPEN(item.price * item.qty)}</strong>
        <button type="button" className="link-btn" onClick={() => removeFromCart(item.id)}>Quitar</button>
      </div>
    </li>
  )
}
