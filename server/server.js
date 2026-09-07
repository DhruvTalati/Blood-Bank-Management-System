const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

const inventoryRoutes = require("./routes/inventoryRoutes");

const userRoutes = require("./routes/userRoutes");

const requestRoutes = require("./routes/requestRoutes");

const donorRoutes = require("./routes/donorRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/users", userRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/donors", donorRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You have accessed a protected route.",
    user: req.user,
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blood Bank Management System API is running",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
