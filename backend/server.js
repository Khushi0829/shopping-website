import dotenv from 'dotenv';

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// Set up CORS to allow requests from your Vercel frontend
app.use(cors({
  origin: "https://shopping-website-kappa-three.vercel.app" // Your Vercel domain
}));




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// // backend/server.js
// const cors = require('cors');
// const allowed = [
//   'http://localhost:3000',                 // dev
//   'https://<your-netlify-site>.netlify.app' // update after Netlify URL is known
// ];
// app.use(cors({ origin: allowed, credentials: true }));


// Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: [String],
  category: String
});

const Product = mongoose.model("Product", productSchema);


// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Get all products
app.get("/api/items", async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add product
app.post("/api/items", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));