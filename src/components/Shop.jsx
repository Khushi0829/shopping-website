// Shop.js
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import "./shop.css"

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch products from backend

    useEffect(() => {
    // axios.get("http://localhost:5000/api/items")
    axios.get("https://shopping-website-xcmq.onrender.com/api/items")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);


   // Auto–apply New Arrivals + Clothing if available
  // useEffect(() => {
  //   const hasNewClothing = products.some(
  //     (p) => p.category === "New Arrivals" || p.category === "Clothing"
  //   );
  //   if (hasNewClothing) setFilter("New Arrivals");
  // }, [products]);


  // Apply filter
  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

      const openImage = (img) => {
    setSelectedImage(img);
    document.body.classList.add("hide-bars"); // hide navbar + topbar
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.classList.remove("hide-bars"); // show navbar + topbar again
  };


  return (
    <div className="shop-page">
      <h1>Welcome, Have a Great Shopping!!</h1>
      
            {/* Shortcut Navigation */}
      <div className="nav-shortcuts">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Clothing")}>Clothing</button>
        <button onClick={() => setFilter("Sale")}>Sale</button>
        <button onClick={() => setFilter("New Arrivals")}>New Arrivals</button>
      </div>

       <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} 
                 alt={p.name}
                 onClick={() => openImage(p.image)}
                 style={{ cursor: "pointer" }} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p className="category">{p.category}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      
      {/* Modal for full image */}
      {selectedImage && (
        // <div className="modal" onClick={() => setSelectedImage(null)}>
        <div className="modal" onClick={closeImage}>
          <img
            src={selectedImage}
            alt="Full View"
            className="modal-img"
            onClick={(e) => e.stopPropagation()}
            
          />
        </div>
      )}
    </div>
  );
  };

export default Shop;
