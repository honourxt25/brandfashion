import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';
import wishlistRoutes from "./routes/wishlist.js";
import searchRoutes from "./routes/search.js";
// import dashRoutes from "./routes/dashserver.js";

dotenv.config();

import productRoutes from "./routes/products.js";
import "./db/init.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors({
  origin: ["http://localhost:5500","https://tarundeepakjain.github.io", "http://127.0.0.1:5500", "https://sem2-project-muz1.onrender.com"],  // Make sure there's no trailing '/'
  // origin: ["http://localhost:5500", "http://127.0.0.1:5500"],  // Make sure there's no trailing '/'
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

mongoose
.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
// app.use('/api/users', userRoutes);
app.use('/cart', cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/search", searchRoutes);
// app.use("/dash", dashRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Clothing Shop API");
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
