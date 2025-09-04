const { readDB, writeDB } = require("../models/todoModel");

// GET all todos
function getTodos(req, res) {
  try {
    const db = readDB();
    res.status(200).json(db.todos);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST new todo
function addTodo(req, res) {
  try {
    const db = readDB();
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = {
      id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
      title,
      completed: completed || false
    };

    db.todos.push(newTodo);
    writeDB(db);

    res.status(201).json(newTodo);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET search todos
function searchTodos(req, res) {
  try {
    const db = readDB();
    const { q } = req.query;

    if (!q) return res.status(400).json({ error: "Please provide a search query" });

    const results = db.todos.filter(todo =>
      todo.title.toLowerCase().includes(q.toLowerCase())
    );

    if (results.length === 0) return res.status(404).json({ message: "No todos found" });

    res.status(200).json(results);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT update todo by ID
function updateTodo(req, res) {
  try {
    const db = readDB();
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const todoIndex = db.todos.findIndex(t => t.id === id);
    if (todoIndex === -1) return res.status(404).json({ error: "Todo not found" });

    db.todos[todoIndex] = {
      ...db.todos[todoIndex],
      title: title !== undefined ? title : db.todos[todoIndex].title,
      completed: completed !== undefined ? completed : db.todos[todoIndex].completed
    };

    writeDB(db);
    res.status(200).json(db.todos[todoIndex]);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE todo by ID
function deleteTodo(req, res) {
  try {
    const db = readDB();
    const id = parseInt(req.params.id);

    const todoIndex = db.todos.findIndex(t => t.id === id);
    if (todoIndex === -1) return res.status(404).json({ error: "Todo not found" });

    const deleted = db.todos.splice(todoIndex, 1);
    writeDB(db);

    res.status(200).json({ message: "Todo deleted", deleted: deleted[0] });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getTodos, addTodo, searchTodos, updateTodo, deleteTodo };
