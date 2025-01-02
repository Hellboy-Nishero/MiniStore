import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ModalWindow from '../components/ModalWindow/ModalWindow'
import Subscription from '../components/Subscription/Subscription'


const Cart = () => {
  return (
    <div className='container'>
        <Navbar />
        <Header active={"Cart"} />
        <main className="main-content">
            <ModalWindow />
            <section className="subscription-section">
                <Subscription />
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default Cart