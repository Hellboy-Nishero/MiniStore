import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Subscription from '../components/Subscription/Subscription'
import Footer from '../components/Footer/Footer'
import ModalWindow from '../components/ModalWindow/ModalWindow'

const Blogs = () => {
  return (
    <div className='container'>
        <Navbar active={"blogs"} />
        <Header active={"Blogs"} />
        <ModalWindow />
        <main className="main-content">
            <section className="subscription-section">
                <Subscription />
            </section>
        </main>

        <Footer />
    </div>    
  )
}

export default Blogs