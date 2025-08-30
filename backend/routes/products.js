const express = require('express');
const router = express.Router();
// const Product = require('../models/Product');

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;
    const product = new Product({ name, price, category, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;