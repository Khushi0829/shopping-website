// Shop.js
import React from 'react';

const Shop = () => {
  return (
    <div>
      <h1>Welcome to the Shop</h1>
      {/* Display products here */}
            {/* Shortcut Navigation */}
      <div className="nav-shortcuts">
        <button>Shop</button>
        <button>Categories</button>
        <button>Sale</button>
        <button>New Arrivals</button>
      </div>
    </div>
  );
};

export default Shop;
