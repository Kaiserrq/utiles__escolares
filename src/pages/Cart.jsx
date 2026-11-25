import { useCart } from '../context/CartContext.jsx'
import CartItem from '../components/CartItem.jsx'
import CartSummary from '../components/CartSummary.jsx'
import EmptyList from '../components/EmptyList.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function CartPage() {
  const { cart, totalItems } = useCart()
  return (
    <>
      <PageHeader title="Mi lista" subtitle={`${totalItems} ${totalItems === 1 ? 'útil' : 'útiles'} en tu lista.`} />
      <section className="container cart-page">
        {cart.length === 0 ? (
          <div className="paper cart-empty-paper"><EmptyList /></div>
        ) : (
          <div className="cart-layout">
            <ul className="paper cart-list">
              {cart.map(item => <CartItem key={item.id} item={item} />)}
            </ul>
            <aside className="cart-aside">
              <CartSummary />
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
