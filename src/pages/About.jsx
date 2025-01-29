import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import "../index.scss";
import Advantages from '../components/Advantages/Advantages';
import Reviews from '../components/Reviews/Reviews';
import reviews from '../data/reviews';
import Subscription from '../components/Subscription/Subscription';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Play } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className='container'>
        <Navbar active={"about"} />

        <Header active={"About Us"} />

        <main className="main-content">

            <section className='advantages-section'>
                <Advantages />
            </section>

            <section className='about-section'>
                <div className="about-container">
                    <div className="about-left">
                        <img src="/video.svg" alt="" />
                        <div className="overlay">
                            <button className="play"><Play size={24} /></button>
                        </div>
                    </div>
                    <div className="about-right">
                        <h3 className="about__title">How was Ministore Found?</h3>
                        <div className="about__text">
                            <p>Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Quam libero etiam et in ac at quis.</p>
                            <p>Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in ac at quis. Risus augue curabitur diam senectus congue velit et. </p>
                        </div>
                        <Link to={"/shop"} className='btn btn-primary'>shop our store</Link>
                    </div>
                </div>
            </section>
            
            <section className='reviews-section'>
                <Reviews source={reviews} />
            </section>
            
            <section className="subscription-section">
                <Subscription />
            </section>

        </main>

        <Footer></Footer>

    </div>
  )
}

export default About