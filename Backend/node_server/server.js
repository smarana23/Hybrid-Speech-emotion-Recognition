const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const historyRoutes = require("./routes/history");

app.use("/api/history", historyRoutes);

// 🔗 MongoDB Connection
mongoose.connect("mongodb+srv://smaranavollala_db_user:Smarana%4023@externalcluster.ol702v5.mongodb.net/ser_project")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});