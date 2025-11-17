const express = require("express");

const app = express();

// Home Route
app.get("/home", (req, res) => {
  res.send("This is home page");
});

// Contact Route
app.get("/contactus", (req, res) => {
  res.send("Contact us at contact@contact.com");
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
