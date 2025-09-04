const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

// Fetch all tickets
router.get("/", ticketController.getAll);

// Fetch by ID
router.get("/:id", ticketController.getById);

// Create ticket (validation middleware)
router.post("/", dataCheckMiddleware, ticketController.createTicket);

// Update ticket
router.put("/:id", ticketController.updateTicket);

// Delete ticket
router.delete("/:id", ticketController.deleteTicket);

// Resolve ticket
router.patch("/:id/resolve", ticketController.resolveTicket);

module.exports = router;
