const fs = require("fs");
const DB_FILE = "db.json";

function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // If file missing or corrupted, return default structure
    return { tickets: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function getAllTickets() {
  const db = readDB();
  return db.tickets;
}

function getTicketById(id) {
  const db = readDB();
  return db.tickets.find(t => t.id === id);
}

function addTicket(ticketObj) {
  const db = readDB();
  const nextId = db.tickets.length ? db.tickets[db.tickets.length - 1].id + 1 : 1;
  const newTicket = { id: nextId, ...ticketObj };
  db.tickets.push(newTicket);
  writeDB(db);
  return newTicket;
}

function updateTicketById(id, updates) {
  const db = readDB();
  const idx = db.tickets.findIndex(t => t.id === id);
  if (idx === -1) return null;
  db.tickets[idx] = { ...db.tickets[idx], ...updates };
  writeDB(db);
  return db.tickets[idx];
}

function deleteTicketById(id) {
  const db = readDB();
  const idx = db.tickets.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const deleted = db.tickets.splice(idx, 1)[0];
  writeDB(db);
  return deleted;
}

module.exports = {
  getAllTickets,
  getTicketById,
  addTicket,
  updateTicketById,
  deleteTicketById
};
