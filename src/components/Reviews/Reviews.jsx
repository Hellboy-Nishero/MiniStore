import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import Stars from './Stars';


const Reviews = ({source}) => {
    const preventSwiperFromSwiping = (e) => {
        e.stopPropogation();
    }
  return (
    <div className='reviews'>
        <div className="reviews__header">
            <img src='../public/Vector.png'></img>
        </div>
        <Swiper 
        className='slider-container'
        modules={[Navigation]}
        navigation
        slidesPerView={1}>
            {
                source && source.map((item, index) =>
                    index < 5 ?
                    <SwiperSlide key={index} className='review__item swiper-no-swiping'>
                        <p className='review__text'>"{item.comment}"</p>
                        <Stars rating={item.rating} />
                        <span className='review__author'>{item.user}</span>
                    </SwiperSlide>
                    : null
                )
            }
        </Swiper>
    </div>
  )
}

export default Reviews