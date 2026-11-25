import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductPage from './pages/Product.jsx'
import CartPage from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import Categories from './pages/Categories.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className="app-root">
      <ScrollToTop />
      <Header onOpenCart={openDrawer} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/acerca" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/privacidad" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  )
}

export default App
