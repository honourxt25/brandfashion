// routes/wishlist.js
import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// ➕ Add to wishlist
router.post("/add", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      alert("please log in");
      return res.status(404).json({ message: "User not found" });
     
    }

    const alreadySaved = user.wishlist.find(item =>
      item.productId.toString() === productId.toString()
    );

    if (alreadySaved) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push({ productId });
    await user.save();

    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ Remove from wishlist
router.post("/remove", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(item => {
      const id = typeof item.productId === "object" ? item.productId._id?.toString() : item.productId?.toString();
      return id !== productId.toString();
    });

    await user.save();

    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📄 Get wishlist
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("wishlist.productId");
    res.json({ wishlist: user.wishlist });
    if(!user) {
      alert("please log in");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
