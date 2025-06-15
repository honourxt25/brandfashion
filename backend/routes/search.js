// routes/search.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { attire_type: { $regex: query, $options: 'i' } },
        { clothing_type: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(results); // return JSON instead of rendering
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
