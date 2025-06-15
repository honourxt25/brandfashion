import express from "express";
import Product from '../models/Product.js'


const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query
  let products
  if (category) {
    products = await Product.find({ category }); // Filter by category if provided
  } else {
    products = await Product.find(); // Return all products if no category is given
  }
  res.json(products);
})

export default router;
