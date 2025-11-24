// index.js
// Main server file for Express App

const express = require("express");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Rate limiter for /api/limited route only
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit 5 requests per window per client
  message: { error: "Too many requests, please try again later." },
});

// Use routes
app.use("/api", apiRoutes(limiter));

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
