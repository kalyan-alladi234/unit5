const express = require("express");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

// Create Redis client
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

// Fake DB (Array acts as database)
let itemsDB = [
  { id: 1, name: "Pen" },
  { id: 2, name: "Notebook" },
];

// Redis cache key
const ITEMS_CACHE_KEY = "items:all";

// ==========================
// GET /items
// ==========================
app.get("/items", async (req, res) => {
  try {
    // Check cache
    const cachedData = await redis.get(ITEMS_CACHE_KEY);

    if (cachedData) {
      console.log("📌 Cache Hit — Data served from Redis");
      return res.json(JSON.parse(cachedData));
    }

    console.log("⚡ Cache Miss — Fetching from DB...");

    // Fetch from DB
    const data = itemsDB;

    // Store in Redis with TTL of 1 minute
    await redis.set(ITEMS_CACHE_KEY, JSON.stringify(data), "EX", 60);

    return res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================
// POST /items -> Add new item
// ==========================
app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name required" });

    const newItem = { id: Date.now(), name };
    itemsDB.push(newItem);

    console.log("✔ New item added:", newItem);

    // Invalidate cache
    await redis.del(ITEMS_CACHE_KEY);
    console.log("🗑 Cache invalidated!");

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================
// PUT /items/:id -> Update item
// ==========================
app.put("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const item = itemsDB.find((i) => i.id === id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name || item.name;

    console.log("✔ Item updated:", item);

    // Invalidate cache
    await redis.del(ITEMS_CACHE_KEY);
    console.log("🗑 Cache invalidated!");

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================
// DELETE /items/:id -> Delete item
// ==========================
app.delete("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = itemsDB.findIndex((i) => i.id === id);
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    const deleted = itemsDB.splice(index, 1);

    console.log("✔ Item deleted:", deleted);

    // Invalidate cache
    await redis.del(ITEMS_CACHE_KEY);
    console.log("🗑 Cache invalidated!");

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================
// START SERVER
// ==========================
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
