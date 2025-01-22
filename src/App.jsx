import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Blogs from './pages/Blogs'
import BlogPage from './pages/BlogPage'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import ShopPage from './pages/ShopPage'
import { ProductProvider } from './context/ProductContext'
import Checkout from './pages/Checkout';



function App() {


  return (
    <ProductProvider> {/* sets/unsets cart items and also increases/decreases item-counter shown in navbar */}
      <Router>
        <Routes>
            <Route path='/' element= {<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ShopPage />} />
            <Route path="/blogs/" element={<Blogs />} />
            <Route path='/blogs/:id' element={<BlogPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/checkout' element={<Checkout />} />
        </Routes>
      </Router>
    </ProductProvider>
  )
}

export default App
