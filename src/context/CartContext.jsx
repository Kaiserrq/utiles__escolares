import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {}
  }, [cart])

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function updateQty(id, delta) {
    setCart(prev => {
      return prev.map(p => {
        if (p.id !== id) return p
        const next = (p.qty || 0) + delta
        return { ...p, qty: next }
      }).filter(p => p.qty > 0)
    })
  }

  function clearCart() { setCart([]) }

  const totalItems = cart.reduce((s, p) => s + (p.qty || 0), 0)
  const totalPrice = cart.reduce((s, p) => s + (p.qty || 0) * (p.price || 0), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
