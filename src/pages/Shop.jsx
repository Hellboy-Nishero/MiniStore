import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Subscription from '../components/Subscription/Subscription';
import Footer from '../components/Footer/Footer';
import products from '../data/products';
import { ShoppingCart } from 'lucide-react';
import { Search } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation'
import { Link } from 'react-router';
import { ProductContext } from '../context/ProductContext';

const Shop = () => {

    const [categories, setCategories] = useState([]);

    const {addedProducts, setAddedProducts, setCount} = useContext(ProductContext);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const [activeCategory, setActiveCategory] = useState("all");

    const [activeBrand, setActiveBrand] = useState("");

    const [brands, setBrands] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    //PAGINATION
    const itemsPerPage = 6;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentProducts = filteredProducts.slice((currentPage - 1 ) * itemsPerPage, currentPage * itemsPerPage)

    const pageElements = [];
    for(let i = 0; i < totalPages; i++){
        pageElements.push(<span className={`${currentPage === (i+1) ? "active" : ""}`} key={i}>{i+1}</span>)
    }

    let startIndex = (currentPage - 1) * itemsPerPage + 1;
    let endIndex = Math.min(currentPage * itemsPerPage, filteredProducts.length);

    const handleAddToCart = (product) => {
        let productToAdd = {...product, quantity: 1, subtotal: product.price};
        let foundProduct = addedProducts.find(product => product.id === productToAdd.id);
        if(!foundProduct){
          setAddedProducts(prevProducts => [...prevProducts, productToAdd]);
          setCount(prevCount => prevCount + 1);
        } else{
          setAddedProducts(prevProducts => {
            let newProducts = prevProducts.map (item => {
              if(item.id === productToAdd.id){
                if((item.quantity + 1) < product.stock){
                  let newQuantity = item.quantity + 1;
                  return {...item, quantity: newQuantity, subtotal: item.price * newQuantity};
                } else {
                  return {...item, quantity: product.stock, subtotal: item.price * product.stock}
                }
              } else {
                return item;
              }
            })
            return newProducts;
          }
          );
        }
      }


    const searchItems = (e) => {
        let input;
        input = e.target.value;
        setSearch(input);

        if(e.keyCode === 13){
            e.target.value = "";
            setFilteredProducts(products.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())));
            setActiveCategory("");
            setCurrentPage(1);
        } else if(e.type === "click") {
            if(search === ""){
                setFilteredProducts(products);
            } else {
                document.querySelector("input[type='search']").value = "";
                setFilteredProducts(products.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
                setActiveCategory("");
                setSearch("");
                setCurrentPage(1);
            }
        }
    }



    const filterProducts = (filter) => {
        setActiveCategory(filter);
        if(filter !== "all"){
            setFilteredProducts(products.filter(item => item.category === filter));
        } else {
            setFilteredProducts(products);
        }
        setActiveBrand("");
        setCurrentPage(1);
    }


    const changeBrand = (brand) => {
        setActiveBrand(brand);
        if(activeCategory !== "all"){
            setFilteredProducts(products.filter(item => item.brand === brand && item.category === activeCategory));
        } else {
            setFilteredProducts(products.filter(item => item.brand === brand));
        }
        setCurrentPage(1);
    }


    const addBrand = () => {
        setBrands(prevBrands => {
            let newBrands = products.reduce((acc, item) => {
                if(!acc.includes(item.brand)){
                    acc.push(item.brand);
                } 
                return acc
            }, [...prevBrands])
            return newBrands;
        })
    }


    const showPrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    } 


    const showNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    } 



    const addCategory = () => {
        setCategories(prevCategories =>  {
            const newCategories = products.reduce((acc, item) => {
                if(!acc.includes(item.category)){
                    acc.push(item.category);
                }
                return acc;
            }, [...prevCategories]);
            return newCategories;
           
        
        }
    )}

    useEffect(() => {
        filterProducts("all");
        addCategory();
        addBrand();
    }, [products])

    useEffect(() => {
    }, [search]);

  return (
    <div className='container'>
        <Navbar active={"shop"} />
        <Header active={"Shop"} />

        <main className="main-content">
            <section className='shop-section'>
                <div className="shop__header">
                    <span className='results'>Showing {filteredProducts.length === 0 ? startIndex=0 : startIndex} – {endIndex} of {filteredProducts.length} results</span>
                </div>

                <div className="shop-content">
                    <div className="product__list">
                        {
                            filteredProducts.length === 0 ? <p className='no-result'>No product was found</p>
                            :
                            products && currentProducts.map(item =>
                                <div key={item.id} className="product__item">
                                    <div className="product__img">
                                        <img src={item.image}></img>
                                        <div className="overlay">
                                            <Link to={`${item.id}`} className='btn btn-secondary'>To product</Link>
                                            <button onClick={() => handleAddToCart(item)} className='btn btn-primary'>add to cart <ShoppingCart size={14} className='shopping-cart' /></button>
                                        </div>
                                    </div>
                                    <div className="product__footer">
                                        <h3 className="product__title">{item.name}</h3>
                                        <span className='product__price'>${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <aside className="filters">
                        <div className="filters-header">
                            <input onKeyUp={searchItems} type="search" placeholder='Search' />
                            <button className='btn btn-primary' onClick={searchItems}><Search /></button>
                        </div>
                        <div className="categories">
                            <h4 className='categories__title'>categories</h4>
                            <a className={activeCategory === "all" ? "active" : ""} onClick={() => filterProducts("all")}>all</a>
                            {
                                categories && categories.map((item, index) =>
                                    
                                    <a className={activeCategory === item ? "active" : ""} onClick={() => filterProducts(item)} key={index}>{item}</a>
                                )
                                
                            }
                        </div>
                        <div className="brands">
                            <h4 className="brands__title">brands</h4>
                            {
                                brands && brands.map((item, index) => 
                                <a className={activeBrand === item ? "active" : ""} onClick={() => changeBrand(item)} key={index}>{item}</a>)
                            }
                        </div>
                    </aside>
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
                    <div className={`swiper-button-next ${filteredProducts.length < 1 || currentPage === totalPages ? "swiper-button-disabled" : ""}`} onClick={() => showNextPage()}></div>
                </div>
            </section>


            <section className='subscription-section'>
                <Subscription />
            </section>

        </main>


        <Footer />
    </div>
  )
}

export default Shop