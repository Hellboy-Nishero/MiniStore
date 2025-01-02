import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import products from './data/products'
import blogs from './data/blogs'
import reviews from './data/reviews'
import Navbar from './components/Navbar/Navbar'
import Advantages from './components/Advantages/Advantages'
import ProductList from './components/ProductList.jsx/ProductList'
import BlogList from './components/BlogList/BlogList'
import Reviews from './components/Reviews/Reviews'
import Footer from './components/Footer/Footer'
import Subscription from './components/Subscription/Subscription'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import Cart from './pages/Cart'


function App() {

  const [filter, setFilter] = useState("");


  //shows filtered list of products
  const showProducts = (filter) => {
    if(filter === "smartphones") return products.filter(item => item.category === "smartphones");
    if(filter === "smartwatches") return products.filter(item => item.category === "smartwatches");
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
