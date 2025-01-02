import React, { useEffect } from 'react'
import { useState } from 'react'

const Header = ({active}) => {
    const [activePage, setActivePage] = useState("");

    const changeactivePage = () => {
        setActivePage(active);
    }

    useEffect(() => {
        changeactivePage();
    }, [active]);

  return (
    <header className='header'>
        <h2 className="header__title">{activePage}</h2>
        <div className="breadcrumbs">
            <span className="home">Home</span>
            <span className='next-page'>></span>
            <span className='current-page'>{activePage}</span>
        </div>
    </header>
  )
}

export default Header