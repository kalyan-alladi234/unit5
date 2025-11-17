const express = require("express");
const getFileInfo = require("./fileinfo");
const parseURL = require("./urlparser");

const app = express();

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// File Info Route
app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;
  if (!filepath) return res.send("Please provide a filepath query parameter");

  const result = getFileInfo(filepath);
  res.json(result);
});

// URL Parsing Route
app.get("/parseurl", (req, res) => {
  const { url } = req.query;
  if (!url) return res.send("Please provide a url query parameter");

  const result = parseURL(url);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
