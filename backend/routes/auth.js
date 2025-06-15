import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import authenticate from "../middleware/authMiddleware.js"; // Middleware for protected routes

dotenv.config();

const router = express.Router();

// Generate Access & Refresh Tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};


router.post('/signup', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password.toString().trim(), 10);
      user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
      console.log(err);
  }
});

// 🟢 **User Login Route**

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Ensure password is string and compare with hashed password
    const isMatch = await bcrypt.compare(password.toString().trim(), user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in HttpOnly Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      // sameSite: "Strict",
      sameSite: "None",        // allows cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      // sameSite: "Strict",
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({ userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔐 **Protected Route Example**
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    console.log('user: ', user);
    res.json(user);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔄 **Refresh Access Token Route**
// router.post("/refresh", (req, res) => {
//   console.log('req.headers.cookie: ', req.headers.cookie.refreshToken);
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.status(401).json({ msg: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
//     const newAccessToken = generateAccessToken(decoded.userId);
//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     res.status(403).json({ msg: "Invalid refresh token" });
//   }
// });

// 🚪 **Logout Route**
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ msg: "Logged out successfully" });
});

export default router;
