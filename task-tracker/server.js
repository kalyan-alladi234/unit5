const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = "tasks.json";

app.use(express.json());

// Utility: read DB
function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (err) {
    return { tasks: [] };
  }
}

// Utility: write DB
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET /tasks → all tasks
app.get("/tasks", (req, res) => {
  const db = readDB();
  res.status(200).json(db.tasks);
});

// GET /tasks/filter?tag=frontend
app.get("/tasks/filter", (req, res) => {
  const db = readDB();
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Tag query parameter is required" });
  }

  const filtered = db.tasks.filter(t => 
    t.tag.toLowerCase() === tag.toLowerCase()
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No tasks found with given tag" });
  }

  res.status(200).json(filtered);
});

// POST /tasks → add task
app.post("/tasks", (req, res) => {
  const db = readDB();
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newTask = {
    id: db.tasks.length ? db.tasks[db.tasks.length - 1].id + 1 : 1,
    title,
    description,
    tag,
    priority,
    status
  };

  db.tasks.push(newTask);
  writeDB(db);

  res.status(201).json(newTask);
});

// PUT /tasks/:id → update task
app.put("/tasks/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const taskIndex = db.tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
  writeDB(db);

  res.status(200).json(db.tasks[taskIndex]);
});

// DELETE /tasks/:id → delete task
app.delete("/tasks/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = db.tasks.splice(index, 1)[0];
  writeDB(db);

  res.status(200).json({ message: "Task deleted", deleted });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task Tracker running at http://localhost:${PORT}`);
});
