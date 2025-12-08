const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
    status: { type: String, default: "Order Received" },
    assignedChef: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Order", orderSchema);
