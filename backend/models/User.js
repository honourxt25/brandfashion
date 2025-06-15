import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  cartTotal: { type: Number, default: 0 }, // ✅ Store total price of cart
  pastOrders: [
    {
      orderId: String,
      amount: Number,
      date: Date,
    }
  ],
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    }
  ]
});

const User = mongoose.model("User", UserSchema);
export default User;
