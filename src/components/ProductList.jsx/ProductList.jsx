import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import Shop from '../../pages/Shop';


const ProductList = ({title, source, incrementCount}) => {



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
                            <button onClick={incrementCount} className='btn btn-primary'>add to cart <ShoppingCart size={14} className='shopping-cart' /></button>
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