// models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    default: "pending"
  },
  dueDate: {
    type: Date
  }
});

module.exports = mongoose.model("Task", TaskSchema);
