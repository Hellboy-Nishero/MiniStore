import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import ModalWindow from '../components/ModalWindow/ModalWindow'
import Footer from '../components/Footer/Footer'
import Subscription from '../components/Subscription/Subscription'

const Contact = () => {
  return (
    <div className='container'>
        <Navbar active={"contact"} />
        <Header active={"Contact"} />
        <main className="main-content">
            <ModalWindow />

            <section className='subscription-section'>
                <Subscription />
            </section>
        </main>

        <Footer />

    </div>
  )
}

export default Contact