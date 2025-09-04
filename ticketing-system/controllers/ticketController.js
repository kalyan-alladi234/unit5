const ticketModel = require("../models/ticketModel");

// GET /tickets
function getAll(req, res) {
  try {
    const tickets = ticketModel.getAllTickets();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /tickets/:id
function getById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const ticket = ticketModel.getTicketById(id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST /tickets
function createTicket(req, res) {
  try {
    // dataCheckMiddleware ensures required fields present
    const { title, description, priority, user } = req.body;
    const now = new Date().toISOString();
    const ticketObj = {
      title,
      description,
      priority,
      user,
      status: "pending", // default status
      createdAt: now,
      updatedAt: now
    };
    const newTicket = ticketModel.addTicket(ticketObj);
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /tickets/:id
function updateTicket(req, res) {
  try {
    const id = parseInt(req.params.id);
    const exists = ticketModel.getTicketById(id);
    if (!exists) return res.status(404).json({ error: "Ticket not found" });

    // Only allow updating these fields (title, description, priority)
    const updates = {};
    const allowed = ["title", "description", "priority"];
    allowed.forEach(k => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    updates.updatedAt = new Date().toISOString();

    const updated = ticketModel.updateTicketById(id, updates);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE /tickets/:id
function deleteTicket(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deleted = ticketModel.deleteTicketById(id);
    if (!deleted) return res.status(404).json({ error: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// PATCH /tickets/:id/resolve
function resolveTicket(req, res) {
  try {
    const id = parseInt(req.params.id);
    const ticket = ticketModel.getTicketById(id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (ticket.status === "resolved") {
      return res.status(400).json({ message: "Ticket already resolved" });
    }

    const updated = ticketModel.updateTicketById(id, {
      status: "resolved",
      updatedAt: new Date().toISOString()
    });

    res.status(200).json({ message: "Ticket resolved", ticket: updated });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAll,
  getById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};
