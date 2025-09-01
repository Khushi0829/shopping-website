// Home.js
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import indianStyle from "../assets/indianstyle.jpeg"
import shirtview from "../assets/shirtview.jpeg"
import Sharara from "../assets/Sharara.jpeg"
import img1 from "../assets/img1.jpeg"
import img2 from "../assets/img2.jpeg"
import img3 from "../assets/img3.jpeg"
import img4 from "../assets/img4.jpeg"
import img5 from "../assets/img5.jpeg"
import img6 from "../assets/img6.jpeg"


const Home = () => {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState(""); // ✅ new state for search
    const navigate = useNavigate();   // ✅ hook inside component

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setProducts(res.data || []))
      .catch(err => console.log("Failed to fetch products:",err));
  }, []);

    const handleSearch = () => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`); // ✅ send query to Shop
    } else {
      navigate("/shop"); // if empty, just go to Shop
    }
  };

  // choose first 3 products as featured (if available)
  const featured = products.slice(0, 3);

  // small placeholder if item has no image
  const placeholder = "https://via.placeholder.com/300x350?text=Image";

  return (
    <div className="home">

         {/* Search Bar */}
            <div className="search-bar">
         <input
          type="text"
          placeholder="Search for clothing, categories..."
          value={query} // ✅ controlled input
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <button>Search</button> */}
        <button onClick={handleSearch}>Search</button>
      </div>


      {/* Offer Banner */}
      <section className="banner">
        <h2>🔥 Summer Sale is Live!</h2>
        <p>Buy 2, Get 10% Off on the 3rd</p>
        <div className='summersale'>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />
         </div>
        {/* <button className='shp-now'>Shop Now</button> */}
        <p> Explore brand new sales</p>
        {/* <button className='view-more'>View More</button> */}
        
      <button className='shp-now'>  <Link to="/shop">Shop Now</Link>  </button>
        <button className='view-more'> <Link to="/shop">View More</Link> </button>

      </section>


     

        {/* Collections Section */}
      {/* <section className="collections">
        <h2>🧵 Our Collections</h2>
        <div className="collection-grid">
          <div className="collection-card">
            <img src="/img/men.jpg" alt="Men" />
            <p>Men</p>
          </div>
          <div className="collection-card">
            <img src="/img/women.jpg" alt="Women" />
            <p>Women</p>
          </div>
          <div className="collection-card">
            <img src="/img/kids.jpg" alt="Kids" />
            <p>Kids</p>
          </div>
        </div>
      </section> */}


      {/* Featured Products */}
      <section className="featured">
        <h2>⭐ Featured Products</h2>
        
         <div className="product-grid">
          {featured.length === 0 ? (
            // fallback local assets while DB empty
            <>
              <div className="product-card">
                <img src={indianStyle} alt="Kurti" />
                <p>Stylish Kurti - ₹799</p>
              </div>
              <div className="product-card">
                <img src={shirtview} alt="Shirt view" />
                <p>Men's Shirt - ₹999</p>
              </div>
              <div className="product-card">
                <img src={Sharara} alt="Sharara" />
                <p>Ethnic Set - ₹1299</p>
              </div>
            </>
          ) : (
            // render featured products from DB (product.image should be Cloudinary URL)
            featured.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image ? product.image : placeholder}
                  alt={product.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
                />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <p className="category">{product.category}</p>
                <Link to={`/product/${product._id}`} className="view-more-link">View</Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
