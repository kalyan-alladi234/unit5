// Import express
const express = require("express");

// Initialize express app
const app = express();

// Define PORT
const PORT = 3000;

// Route: GET /home
app.get("/home", (req, res) => {
  res.status(200).send("<h1>Welcome to Home Page</h1>");
});

// Route: GET /aboutus
app.get("/aboutus", (req, res) => {
  res.status(200).json({ message: "Welcome to About Us" });
});

// Route: GET /contactus
app.get("/contactus", (req, res) => {
  const contactDetails = {
    email: "contact@dummy.com",
    phone: "+91-9876543210",
    address: "123, MG Road, Bengaluru, India"
  };
  res.status(200).json(contactDetails);
});

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
