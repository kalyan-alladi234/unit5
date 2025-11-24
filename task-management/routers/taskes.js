// routes/tasks.js
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ ALL TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// FILTER BY STATUS
router.get("/status/:status", async (req, res) => {
  const tasks = await Task.find({ status: req.params.status });
  res.json(tasks);
});

// FILTER BY DUE DATE
router.get("/due/:date", async (req, res) => {
  const tasks = await Task.find({
    dueDate: { $lte: new Date(req.params.date) }
  });
  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Invalid Task ID" });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid Task ID" });
  }
});

module.exports = router;
