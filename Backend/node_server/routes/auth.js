const express = require("express");
const router = express.Router();
const User = require("../models/User");


// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;