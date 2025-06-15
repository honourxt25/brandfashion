import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

// Tested by DJ ✅
// 🛍️ Add Item to Cart
router.post("/add", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find product to get price
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Initialize the cart array if not already present
    if (!user.cart) {
      user.cart = [];
    }

    // Find if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(item =>
      item?.productId?.toString() === productId.toString()
    );
    console.log('existingProductIndex: ', existingProductIndex);

    if (existingProductIndex !== -1) {
      // Product exists in cart, update quantity
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      user.cart.push({ productId, quantity });
    }

    // ✅ Fix: Properly calculate `cartTotal`
    let newCartTotal = 0;
    for (const item of user.cart) {
      const prod = await Product.findById(item.productId);
      if (prod) {
        newCartTotal += prod.price * item.quantity;
      }
    }
    user.cartTotal = newCartTotal;
    await user.save();
    res.status(200).json({ message: "Cart updated", cart: user.cart, cartTotal: user.cartTotal });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Tested by DJ ✅
// 🗑️ Remove Item from Cart
router.post("/remove", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is already empty" });
    }

    // Filter out the product to remove
    const initialCartLength = user.cart.length;
    user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());

    if (user.cart.length === initialCartLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    //TODO: can create calculateCartTotal() function
    // ✅ Fix: Properly calculate `cartTotal`
    let newCartTotal = 0;
    for (const item of user.cart) {
      const prod = await Product.findById(item.productId);
      if (prod) {
        newCartTotal += prod.price * item.quantity;
      }
    }
    user.cartTotal = newCartTotal;

    await user.save();
    res.json({ message: "Item removed successfully", cart: user.cart, cartTotal: user.cartTotal });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Tested by DJ ✅
// 📦 Get Cart Details
router.post(
  "/",
  authenticate,
  async (req, res) => {
    try {
      console.log('req.userId: ', req.userId);
      const user = await User.findById(req.userId).populate("cart.productId", "name price description");
      // console.log("Populated Cart:", JSON.stringify(user.cart, null, 2));

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ cart: user.cart, cartTotal: user.cartTotal });

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});

router.post('/place-order', authenticate, async (req, res) => {
  try {
      const { billingDetails } = req.body;
      const { userId } = req;
      const user = await User.findById(userId);
      const cart = user.cart
      console.log('cart: ', cart);

      if (!billingDetails || cart.length === 0) {
          return res.status(400).json({ message: 'Invalid order details' });
      }

      const newOrder = new Order({
          userId,
          billingDetails,
          items: cart,
          totalAmount: user.cartTotal
      });

      await newOrder.save();

      user.pastOrders.push(newOrder._id);
      user.cart = [];
      user.cartTotal = 0;
      await user.save();

      res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

export default router;
