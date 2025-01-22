import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Subscription from '../components/Subscription/Subscription'
import { ProductContext } from '../context/ProductContext'
import { Link } from 'react-router'


const Cart = () => {


  const {addedProducts, setAddedProducts, setCount, total, setTotal} = useContext(ProductContext);


  const handleAddClick = (productId) => {
    let foundProduct = addedProducts.find(product => product.id === productId);

    if (foundProduct.quantity < foundProduct.stock){
      setAddedProducts(prevProducts => {
        let newProducts = prevProducts.map(product =>{
          if(product.id === productId){
            return {...product, quantity: product.quantity + 1, subtotal: (product.quantity + 1) * product.price}
          }
          return product;
        }
        )
        return newProducts
      });
    }
  }


  const handleSubstractClick = (productId) => {
    let foundProduct = addedProducts.find(product => product.id === productId);
    if (foundProduct.quantity > 1){
      setAddedProducts(prevProducts => {
        let newProducts = prevProducts.map(product =>{
          if(product.id === productId){
            return {...product, quantity: product.quantity - 1, subtotal: (product.quantity - 1) * product.price}
          }
          return product;
        }
        )
        return newProducts
      });
    }
  }


  const handleRemoveClick = (productId) => {
    let filteredProducts = addedProducts.filter (product => product.id !== productId);
    setAddedProducts(filteredProducts);
    setCount(prevCount => prevCount - 1);
  }


  useEffect(() => {
    if(addedProducts.length !== 0){
      setTotal(() => {
        let newTotal = addedProducts.reduce((acc, product) => {
          acc += product.subtotal;
          return acc;
        }, 0)
        return newTotal;
      })
    } else {
      setTotal(0);
    }
  }, [addedProducts])


  return (
    <div className='container'>
        <Navbar />
        <Header active={"Cart"} />
        <main className="main-content">
            <section className="cart-section">
              <div className="cart__header">
                <h3 className="cart__product">product</h3>
                <h3 className="cart__quantity">quantity</h3>
                <h3 className="cart__subtotal">subtotal</h3>
              </div>
              {
                addedProducts.length > 0
                ? addedProducts.map(product => 
                  <div key={product.id} className="product__item">
                    <div className="product__left">
                      <img src={product.image} alt="" />
                      <div className="product__info">
                        <h6 className="product__name">{product.name}</h6>
                        <span className="product__price">${product.price}</span>
                      </div>
                    </div>
                    <div className="product__middle">
                      <button className='substract-btn' onClick={() => handleSubstractClick(product.id)}>-</button>
                      <input type='text' readOnly value={product.quantity}></input>
                      <button className='add-btn' onClick={() => handleAddClick(product.id)}>+</button>
                    </div>
                    <div className="product__right">
                      <span className="total__sum">${product.subtotal.toFixed(2)}</span>
                      <button className="remove-btn" onClick={() => handleRemoveClick(product.id)}>x</button>
                    </div>
                  </div>
                ) 
                : <p className='empty-cart'>The cart is empty</p>
              }
            </section>
            <section className='totals-section'>
              <h3 className='totals__header'>cart totals</h3>
            <div className="totals">
                <span className="total">total</span>
                <span className='total__price'>${total.toFixed(2)}</span>
            </div>
            <div className="buttons">
              <Link to={`/shop`} className='btn btn-primary'>continue shopping</Link>
              <Link to={`checkout`} className='btn btn-secondary'>proceed to checkout</Link>
            </div>
            </section>
            <section className="subscription-section">
                <Subscription />
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default Cart