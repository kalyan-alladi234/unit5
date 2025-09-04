const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to read DB
function readDB() {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
}

// Helper function to write DB
function writeDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// POST /dishes → Add new dish
app.post("/dishes", (req, res) => {
  try {
    const db = readDB();
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "All fields are required: name, price, category" });
    }

    const newDish = {
      id: db.dishes.length ? db.dishes[db.dishes.length - 1].id + 1 : 1,
      name,
      price,
      category
    };

    db.dishes.push(newDish);
    writeDB(db);

    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /dishes → Retrieve all dishes
app.get("/dishes", (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.dishes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /dishes/:id → Retrieve dish by ID
app.get("/dishes/:id", (req, res) => {
  try {
    const db = readDB();
    const dish = db.dishes.find(d => d.id === parseInt(req.params.id));

    if (!dish) return res.status(404).json({ error: "Dish not found" });

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /dishes/:id → Update dish by ID
app.put("/dishes/:id", (req, res) => {
  try {
    const db = readDB();
    const dishIndex = db.dishes.findIndex(d => d.id === parseInt(req.params.id));

    if (dishIndex === -1) return res.status(404).json({ error: "Dish not found" });

    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: "All fields are required: name, price, category" });
    }

    db.dishes[dishIndex] = { id: parseInt(req.params.id), name, price, category };
    writeDB(db);

    res.status(200).json(db.dishes[dishIndex]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /dishes/:id → Delete dish by ID
app.delete("/dishes/:id", (req, res) => {
  try {
    const db = readDB();
    const dishIndex = db.dishes.findIndex(d => d.id === parseInt(req.params.id));

    if (dishIndex === -1) return res.status(404).json({ error: "Dish not found" });

    const deletedDish = db.dishes.splice(dishIndex, 1);
    writeDB(db);

    res.status(200).json({ message: "Dish deleted successfully", deleted: deletedDish[0] });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /dishes/get?name=<dish_name> → Search by name (partial allowed)
app.get("/dishes/get", (req, res) => {
  try {
    const db = readDB();
    const { name } = req.query;

    if (!name) return res.status(400).json({ error: "Please provide a dish name to search" });

    const results = db.dishes.filter(d =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );

    if (results.length === 0) return res.status(404).json({ message: "No dishes found" });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
