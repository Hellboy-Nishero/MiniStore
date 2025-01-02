import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { ShoppingCart } from 'lucide-react';
import {Link, useLocation} from 'react-router';
import storage from'../../data/storage'

const Navbar = ({active, count}) => {

    const [activeLink, setActiveLink] = useState("");

    const changeActiveLink = () => {
        setActiveLink(active);
    }

    useEffect(() => {
        changeActiveLink();
        window.scrollTo(0, 0);
    }, [active]);

    useEffect(() => {
        // storage.count = count;
    }, [count])
    
  return (
    <nav className='navbar'>
        <h1 className='logo'>MiniStore.</h1>
        <div className="nav__right">
            <div className="links">
                <Link className={`${activeLink === "home" ? "active" : ""}`} to={"/"}>home</Link>
                <Link className={`${activeLink === "about" ? "active" : ""}`}  to={"/about"}>about</Link>
                <Link className={`${activeLink === "blogs" ? "active" : ""}`} to={"/blogs"}>blogs</Link>
                <Link className={`${activeLink === "contact" ? "active" : ""}`}  to={"/contact"}>contact</Link>
            </div>
            <div className="icons">
                <a href="">
                    <Search className='search' size={15} />
                </a>
                <a href="">
                    <User className='user' size={15} />
                </a>
                <Link className='cart' to={"/cart"}>
                    <ShoppingCart className='shopping-cart' size={15} />
                    <p className='counter'>({storage.getItem("count")})</p>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar