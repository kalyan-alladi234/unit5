const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
