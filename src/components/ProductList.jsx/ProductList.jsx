import React, { useContext } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { ProductContext } from '../../context/ProductContext';


const ProductList = ({title, source}) => {

    const {addedProducts, setAddedProducts, setCount} = useContext(ProductContext);

    const handleAddToCart = (product) => {
        let productToAdd = {...product, quantity: 1, subtotal: product.price};
        let foundProduct = addedProducts.find(product => product.id === productToAdd.id);
        if(!foundProduct){
          setAddedProducts(prevProducts => [...prevProducts, productToAdd]);
          setCount(prevCount => prevCount + 1);
        } else{
          setAddedProducts(prevProducts => {
            let newProducts = prevProducts.map (item => {
              if(item.id === productToAdd.id){
                if((item.quantity + 1) < product.stock){
                  let newQuantity = item.quantity + 1;
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


  return (
    <div className='product__list'>
        <div className="list__header">
            <h2 className='list__title'>{title}</h2>
            <Link to="shop" className='list__link'>go to shop</Link>
        </div>
            <Swiper 
            spaceBetween={16}
            slidesPerView={4}
            modules={[Pagination]}
            pagination={{clickable: true}}>
            {source && source.map(item => 
                <SwiperSlide key={item.id} className='product__item'>
                    <div className="product__img">
                        <img src={item.image}></img>
                        <div className="overlay">
                            <Link to={`/shop/${item.id}`} className='btn btn-secondary'>To product</Link>
                            <button onClick={() => handleAddToCart(item)} className='btn btn-primary'>add to cart <ShoppingCart size={14} className='shopping-cart' /></button>
                        </div>
                    </div>
                    <div className="product__footer">
                        <h3 className="product__title">{item.name}</h3>
                        <span className='product__price'>${item.price}</span>
                    </div>
                </SwiperSlide>
            )}
            </Swiper>
    </div>
  )
}

export default ProductList