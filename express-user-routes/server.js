// Import express
const express = require("express");

// Initialize app
const app = express();

// Define port
const PORT = 3000;

// Dummy user data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Bob Smith", email: "bob@example.com" }
];

// Route: GET /users/get -> single user
app.get("/users/get", (req, res) => {
  res.status(200).json(users[0]);
});

// Route: GET /users/list -> all users
app.get("/users/list", (req, res) => {
  res.status(200).json(users);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
