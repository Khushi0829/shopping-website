const express = require('express');
const multer = require('multer');
const Clothing = require('../models/clothing');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newItem = new Clothing({
      name: req.body.name,
      price: req.body.price,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
