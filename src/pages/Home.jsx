import React from 'react'
import { useState } from 'react'
import products from '../data/products'
import blogs from '../data/blogs'
import reviews from '../data/reviews'
import Navbar from '../components/Navbar/Navbar'
import Advantages from '../components/Advantages/Advantages'
import ProductList from '../components/ProductList.jsx/ProductList'
import BlogList from '../components/BlogList/BlogList'
import Reviews from '../components/Reviews/Reviews'
import Footer from '../components/Footer/Footer'
import Subscription from '../components/Subscription/Subscription'
import { Link } from 'react-router';
import storage from '../data/storage';

const Home = () => {

    const [count, setCount] = useState(storage.count);

    const changeCount = () => {
        let currentCount = parseInt(storage.getItem("count")) || 0;
        let newCount = currentCount + 1;
        storage.setItem("count", newCount);
        console.log(storage.getItem("count"));
        setCount(newCount);
    }

    const [filter, setFilter] = useState("");

    //shows filtered list of products
    const showProducts = (filter) => {
      if(filter === "smartphones") return products.filter(item => item.category === "smartphones");
      if(filter === "smartwatches") return products.filter(item => item.category === "smartwatches");
    }

  return (
    <div className='container'>
        <Navbar active={"home"} count={count} />
        <header className="home-header">
        <div className="home-content">
            <div className="header-left">
                <h1 className='header__title'>your products are great.</h1>
                <Link className='btn btn-primary' to={"/shop"}>shop product</Link>
            </div>
            <div className="header-right">
                <img src="../public/daniel-korpai-hbTKIbuMmBI-unsplash%20(3).svg" alt="" />
            </div>
        </div>
        </header>


        <main className="main-content">

        <section className='advantages-section'>
        <Advantages />
        </section>
        
        <section className='products-section'>
            <ProductList
            title="mobile products"
            source={showProducts("smartphones")} 
            incrementCount={changeCount}/>
        </section>

        <section className='products-section'>
            <ProductList
            title="smartwatches"
            source={showProducts("smartwatches")} 
            incrementCount={changeCount}/>
        </section>

        <section className='sales-section'>
            <div className="sales">
            <div className="sales-left">
                <p className='sale'><span className='sale-line'></span>10% off</p>
                <h2 className='sale__title'>new year sale</h2>
                <Link className='btn btn-primary' to={"/shop"}>shop sale</Link>
            </div>
            <div className="sales-right">
                <img src='../public/aram-sabah-smVUoz8CSCw-unsplash%20(1).svg'></img>
            </div>
            </div>
        </section>

        <section className='blogs-section'>
            {blogs && 
            <BlogList source={blogs} />}
        </section>

        <section className='reviews-section'>
            <Reviews source={reviews} />
        </section>

        <section className='subscription-section'>
            <Subscription />
        </section>
        </main>

        
        <Footer />
  </div>
  )
}

export default Home