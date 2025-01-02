import React from 'react'
import { Facebook } from 'lucide-react'
import { Instagram } from 'lucide-react'
import { Twitter } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import { Youtube } from 'lucide-react'
import { Link } from 'react-router'

const footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-content">
            <div className="social-media">
                <h3 className="logo">MiniStore.</h3>
                <p className="footer__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, placeat.</p>
                <div className="social-media__list">
                    <a href='#'><Facebook className='icon' size={21}/></a>
                    <a href="#"><Instagram className='icon' size={21}/></a>
                    <a href="#"> <Twitter className='icon' size={21}/> </a>
                    <a href="#"><Linkedin className='icon' size={21}/></a>
                    <a href="#"><Youtube className='icon' size={21}/></a>
                </div>
            </div>

            <div className="quick-links">
                <h3 className='footer__header'>quick links</h3>
                <Link to={"/"}>home</Link>
                <Link to={"/about"}>about</Link>
                <Link to={"/blogs"}>blogs</Link>
                <Link to={"/contact"}>contact</Link>
            </div>

            <div className="help-info">
                <h3 className='footer__header'>help & info</h3>
                <a href="#">track your order</a>
                <a href="#">return policies</a>
                <a href="#">shipping + delivery</a>
                <a href="#">contact us</a>
                <a href="#">faqs</a>
            </div>

            <div className="contact">
                <h3 className='footer__header'>contact us</h3>
                <p className="footer__text">Do you have any queries or suggestions? <a href='mailto:yourinfo@gmail.com'> yourinfo@gmail.com </a></p>
                <p className="footer__text">If you need support, just give us a call. <br></br>
                <a href='tel:+55 111 222 333 44'>+55 111 222 333 44</a>
                </p>
            </div>
        </div>
        <div className="footer-footer">
            <div className="footer-left">
                <span className='shipment'>We ship with: <img src='/dhl.svg'></img></span>
                <span className='payment'>Payment options: 
                    <img src='/visa.svg'></img> 
                    <img src='/masterCard.svg'></img> 
                    <img src='/paypal.svg'></img>
                </span>
            </div>
            <div className="footer-right">
                <span className='copyright'>© Copyright 2023 MiniStore. Design by <span className='designer'>TemplatesJungle</span></span>
            </div>
        </div>
    </footer>
  )
}

export default footer