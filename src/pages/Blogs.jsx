import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Subscription from '../components/Subscription/Subscription'
import Footer from '../components/Footer/Footer'
import blogs from '../data/blogs'
import { Search } from 'lucide-react'
import { Link } from 'react-router'

const Blogs = () => {

  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);

  const [activeTag, setActiveTag] = useState("all");

  const [latestPosts, setLatestPosts] = useState(blogs.slice(-3));

  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const [currentPage, setCurrentPage] = useState(1);

  
  //PAGINATION
  let postsPerPage = 6;
  let totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  let currentBlogs = filteredBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  let startIndex = (currentPage - 1) * postsPerPage + 1;
  let endIndex = Math.min(postsPerPage * currentPage, filteredBlogs.length);

  let pageElements = [];

  for(let i = 0; i < totalPages; i++){
    pageElements.push(<span className={(i+1) === currentPage ? "active": ""} key={i}>{i+1}</span>)
  }


  const searchItems = (e) => {
    let input;
    input = e.target.value;
    setSearch(input);

    if(e.keyCode === 13){
        e.target.value = "";
        setFilteredBlogs(blogs.filter(item => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())));
        setActiveTag("");
        setCurrentPage(1);
    } else if(e.type === "click") {
        if(search === ""){
            setFilteredBlogs(blogs);
        } else {
            document.querySelector("input[type='search']").value = "";
            setFilteredBlogs(blogs.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
            setActiveTag("");
            setSearch("");
            setCurrentPage(1);
        }
    }
}


  const addTags = () => {
    setTags(prevTags => {
      let newTags = blogs.reduce((acc, item) => {
          if(!acc.includes(item.tags[0])){
            acc.push(item.tags[0]);
          }
          return acc;
      }, [...prevTags])
      return newTags;
    })
  }


  const filterBlogs = (tag) => {
    setActiveTag(tag);
    if(tag !== "all"){
      setFilteredBlogs(blogs.filter(item => item.tags[0] === tag));
    } else {
      setFilteredBlogs(blogs);
    }
    setCurrentPage(1);
  }


    const showPrevPage = () => {
      setCurrentPage(prevPage => prevPage - 1);
  } 


  const showNextPage = () => {
      setCurrentPage(prevPage => prevPage + 1);
  } 


  const formatDate = (dateString) => {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const [year, month, day] = dateString.split("-");
    
    return (`${months[(parseInt(month) - 1)]} ${parseInt(day)}, ${parseInt(year)}`)
  }



  useEffect(() => {
    addTags();
    filterBlogs("all");
  }, [blogs])

  return (
    <div className='container'>
        <Navbar active={"blogs"} />
        <Header active={"Blogs"} />
        <main className="main-content">

          <section className="post-section">
            <div className="blogs-header">
              <span className="results">Showing {startIndex} – {endIndex} of {blogs.length} results</span>
            </div>

            <div className="posts">
              <aside className="filters">
                <div className="filters-header">
                  <input onKeyDown={searchItems} onChange={(e) => setSearch(e.target.value)} type="search" placeholder='Search' />
                  <button onClick={searchItems} className='btn btn-primary'><Search /></button>
                </div>
                <div className="tags">
                  <h4 className="tags__title">tags</h4>
                  <a className={`${activeTag === "all" ? "active" : ""}`} onClick={() => filterBlogs("all")}>all</a>
                    {
                      tags && tags.map((item, index) => 
                        <a className={`${activeTag === item ? "active" : ""}`} onClick={() => filterBlogs(item)} key={index}>{item}</a> 
                      )
                    }
                </div>
                <div className="latest-posts">
                  <h4 className="latest-posts__title">latest posts</h4>
                  <div className="latest-posts-list">
                      {
                        latestPosts && latestPosts.map(item => 
                          <Link to={`/blogs/${item.id}`} key={item.id} className="post__item">
                            <img src={item.image} alt="" />
                            <p className="post__title">{item.title}</p>
                          </Link>
                        )
                      }
                  </div>
                </div>
              </aside>

              <div className="blog-list">
                {
                  filteredBlogs.length === 0 ? <p className='no-result'>No blogs was found</p>
                  :
                  blogs && currentBlogs.map(item => 
                    <div key={item.id} className="blog__item">
                    <div className="blog__img">
                        <img src={item.image} alt="" />
                        <div className="overlay">
                            <Link to={`/blogs/${item.id}`} className='btn btn-primary'>read blog</Link>
                        </div>
                    </div>
                    <span className="info__blog">{formatDate(item.date)} - {item.tags[0]}</span>
                    <h3 className='blog__title'>{item.title}</h3>
                </div>
                  )
                }
              </div>
            </div>

            <div className="pagination">
                <div className={`swiper-button-prev ${currentPage === 1 ? "swiper-button-disabled" : ""}`} onClick={() => showPrevPage()}></div>
                <div className="pages">
                    {
                        pageElements.length === 0 ? <a>1</a>
                        :
                        pageElements.map(item => item)
                    }
                </div>
                <div className={`swiper-button-next ${filteredBlogs.length < 1 || currentPage === totalPages ? "swiper-button-disabled" : ""}`} onClick={() => showNextPage()}></div>
            </div>
          </section>

          <section className="subscription-section">
              <Subscription />
          </section>
        </main>

        <Footer />
    </div>    
  )
}

export default Blogs