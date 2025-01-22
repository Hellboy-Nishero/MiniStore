import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Subscription from '../components/Subscription/Subscription';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import Comments from '../components/Comments/Comments';
import { createContext } from 'react';
import blogs from '../data/blogs';

export const BlogContext = createContext();

const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(blogs.find(blog => blog.id === parseInt(id)));
    let blog_index = blogs.findIndex(blog => blog.id === parseInt(id));
    let next_blog = blogs[blog_index + 1];
    let prev_blog = blogs[blog_index - 1];


    const formatDate = () => {
      const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
      ];

      const [year, month, day] = blog.date.split("-");

      return (`${months[parseInt(month) - 1]} ${parseInt(day)}, ${parseInt(year)}`)
    } 

    useEffect(() => {
      const foundBlog = blogs.find(blog => blog.id === parseInt(id));
      setBlog(foundBlog);
    }, [id])

  return (
    <div className='container'>
      <Navbar active="blogs"></Navbar>
      <main className="main-content">
        <section className="blog-section">
          <span className="post-info">{formatDate()} - {blog.tags[0]}</span>
          <h2 className="blog__title">{blog.title}</h2>
          <img className='blog__img' src={blog.image} alt="" />
          <p className="blog__excerpt">{blog.excerpt}</p>
          <p className="blog__content">{blog.content}</p>
          <div className="share-links">
            <span className="share-text">Share: </span>
            <a href='#'><Facebook className='icon' size={21}/></a>
            <a href="#"><Instagram className='icon' size={21}/></a>
            <a href="#"> <Twitter className='icon' size={21}/> </a>
            <a href="#"><Linkedin className='icon' size={21}/></a>
            <a href="#"><Youtube className='icon' size={21}/></a>
          </div>
          <div className={`pagination ${prev_blog === undefined || next_blog === undefined ? "last" : ""}`}>
            {
              prev_blog !== undefined ?
              <Link className="prev__link" to={`/blogs/${prev_blog.id}`} onClick={() => setBlog(prev_blog)}><div className={`swiper-button-prev`}></div><span>{prev_blog.title}</span></Link>:
              null
            }
            {
              next_blog !== undefined ?
              <Link className='next__link' to={`/blogs/${next_blog.id}`} onClick={() => setBlog(next_blog)}><span>{next_blog.title}</span><div className={`swiper-button-next`}></div></Link> :
              null
            }    
          </div>
        </section>
        <BlogContext.Provider value={{blog, setBlog}}>
          <Comments />
        </BlogContext.Provider>
        
        <section className="subscription-section">
          <Subscription />
        </section>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BlogPage