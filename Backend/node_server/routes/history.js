const express = require("express");
const router = express.Router();
const User = require("../models/User");

console.log("🔥 History routes loaded");

// ✅ TEST ROUTE (keep this)
router.get("/test", (req, res) => {
  res.send("History route working");
});

// ✅ ADD HISTORY
router.post("/add", async (req, res) => {
  const { userId, emotion, audioUrl } = req.body;
console.log("Incoming Data:", req.body);
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        history: { emotion, audioUrl }
      }
    });

    res.json({ message: "History saved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ GET HISTORY
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
console.log("History route loaded");

module.exports = router;