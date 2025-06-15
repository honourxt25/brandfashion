import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discouted_price: { type: Number, required: false },
  image: { type: String, required: true },
  color: { type: String, required: false },
  attire_type: { type: String, required: false }, // traditional/fusion/western etc..
  clothing_type: { type: String, required: true }, // sari/t-shirt etc..
  category: { type: String, required: true },
  description: { type: String, required: false },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
