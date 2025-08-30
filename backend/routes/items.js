// routes/items.js

import express from "express";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import Item from "../models/Item.js"; // your Mongoose model


const router = express.Router();

// Multer: temporary file storage
const upload = multer({ dest: "uploads/" });



// Cloudinary config (reads from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------------
// 1) Add product with image upload
// -------------------------
router.post("/items-with-image", upload.single("image"), async (req, res) => {
  try {
    // upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "shop" // optional folder name
    });
    
    // delete temp file
    await fs.promises.unlink(req.file.path);

    // save new product in MongoDB
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url, // store Cloudinary URL
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// -------------------------
// 2) Add product with existing URL (manual)
// -------------------------
router.post("/items", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image, // URL pasted directly
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------
// 3) Get all items
// -------------------------
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

export default router;



