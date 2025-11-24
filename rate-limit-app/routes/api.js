// routes/api.js
// Handles all API routing logic

const express = require("express");

function apiRoutes(limiter) {
  const router = express.Router();

  // Public endpoint - No rate limiting
  router.get("/public", (req, res) => {
    res.json({ message: "This is a public endpoint!" });
  });

  // Limited endpoint - Apply rate limiter
  router.get("/limited", limiter, (req, res) => {
    res.json({ message: "You have access to this limited endpoint!" });
  });

  return router;
}

module.exports = apiRoutes;
