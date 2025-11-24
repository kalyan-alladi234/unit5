// index.js
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/tasks", taskRoutes);

// Undefined Route Handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
