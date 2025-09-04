const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ticket routes
app.use("/tickets", ticketRoutes);

// Undefined routes -> 404
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Ticketing System running at http://localhost:${PORT}`);
});
