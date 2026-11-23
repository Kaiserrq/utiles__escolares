import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductPage from './pages/Product.jsx'
import CartPage from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Categories from './pages/Categories.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { useState } from 'react'
import { useCart } from './context/CartContext.jsx'
import './App.css'

function App() {
  const { totalItems } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="app-root">
        <header className="app-header">
          <div className="brand">
            <Link to="/"><h1>Webcole</h1></Link>
            <span className="muted">TU LISTA CON CLICK</span>
          </div>
          <div className="header-actions">
            <button className="cart-button" onClick={() => setDrawerOpen(true)}>Carrito ({totalItems})</button>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(open => !open)}
            >
              <span /><span /><span />
            </button>
          </div>
          <nav className={`site-nav${menuOpen ? ' open' : ''}`} onClick={closeMenu}>
            <Link to="/">Inicio</Link>
            <Link to="/categorias">Categorías</Link>
            <Link to="/acerca">Acerca</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/acerca" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

        <Footer />
        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </>
  )
}

export default App
