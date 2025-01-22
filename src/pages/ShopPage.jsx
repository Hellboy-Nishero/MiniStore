import React, { useContext, useEffect, useState } from 'react'
import { useParams  } from 'react-router'
import products from '../data/products';
import Navbar from '../components/Navbar/Navbar';
import Subscription from '../components/Subscription/Subscription';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router';

const ShopPage = () => {
    const {id} = useParams();

    const {addedProducts, setAddedProducts, count, setCount} = useContext(ProductContext);

    let product = products.find(product => product.id === parseInt(id)); 

    const [amount, setAmount] = useState(1);

    const navigate = useNavigate();

    const handleAddClick = () => {
      if (amount < product.stock){
        setAmount(prevAmount => prevAmount + 1);
      }
    }


    const handleSubstracktClick = () => {
      if(amount > 1){
        setAmount(prevAmount => prevAmount - 1)
      }
    }

    
    const handleAddToCart = () => {
      let productToAdd = {...product, quantity: amount, subtotal: amount * product.price};
      let foundProduct = addedProducts.find(product => product.id === productToAdd.id);
      if(!foundProduct){
        setAddedProducts(prevProducts => [...prevProducts, productToAdd]);
        setCount(prevCount => prevCount + 1);
      } else{
        setAddedProducts(prevProducts => {
          let newProducts = prevProducts.map (item => {
            if(item.id === productToAdd.id){
              if((item.quantity + amount) < product.stock){
                let newQuantity = item.quantity + amount;
                return {...item, quantity: newQuantity, subtotal: item.price * newQuantity};
              } else {
                return {...item, quantity: product.stock, subtotal: item.price * product.stock}
              }
            } else {
              return item;
            }
          })
          return newProducts;
        }
        );
      }
    }


    useEffect(() => {
    }, [addedProducts])

  return (
    <div className='container'>
        <Navbar active={`shop`} />
        <main className="main-content">
          <div className="product-section">
              <img className='product__img' src={product.image}></img>
              <div className="product__right">
                  <h3 className="product__title">{product.name}</h3>
                  <span className='product__price'>${product.price.toFixed(2)}</span>
                  <p className='product__descr'>{product.description}</p>
                  <div className="count">
                    <span className='product__in-stock'>{product.stock} in stock</span>
                    <div className="count__settings">
                      <button className='substract-btn' onClick={handleSubstracktClick}>-</button>
                      <input type='text' value={amount} readOnly></input>
                      <button className='add-btn' onClick={handleAddClick}>+</button>
                    </div>
                    <div className="buttons">
                      <Link to={"/cart"} className="btn btn-secondary" onClick={handleAddToCart}>buy now</Link>
                      <button className="btn btn-primary" onClick={handleAddToCart}>add to cart</button>
                    </div>
                  </div>
              </div>
          </div>
          <section className="subscription-section">
            <Subscription></Subscription>
          </section>
        </main>
      <Footer />
    </div>
  )
}

export default ShopPage