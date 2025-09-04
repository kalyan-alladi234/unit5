const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function: read DB
function readDB() {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
}

// Helper function: write DB
function writeDB(data) {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// 📌 POST /books → Add a new book
app.post("/books", (req, res) => {
  try {
    const db = readDB();
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({ error: "All fields are required: title, author, year" });
    }

    const newBook = {
      id: db.books.length ? db.books[db.books.length - 1].id + 1 : 1,
      title,
      author,
      year
    };

    db.books.push(newBook);
    writeDB(db);

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 GET /books → Retrieve all books
app.get("/books", (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 GET /books/:id → Retrieve a book by ID
app.get("/books/:id", (req, res) => {
  try {
    const db = readDB();
    const book = db.books.find(b => b.id === parseInt(req.params.id));

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 PUT /books/:id → Update a book by ID
app.put("/books/:id", (req, res) => {
  try {
    const db = readDB();
    const bookIndex = db.books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res.status(400).json({ error: "All fields are required: title, author, year" });
    }

    db.books[bookIndex] = { id: parseInt(req.params.id), title, author, year };
    writeDB(db);

    res.status(200).json(db.books[bookIndex]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 DELETE /books/:id → Delete a book by ID
app.delete("/books/:id", (req, res) => {
  try {
    const db = readDB();
    const bookIndex = db.books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    const deletedBook = db.books.splice(bookIndex, 1);
    writeDB(db);

    res.status(200).json({ message: "Book deleted successfully", deleted: deletedBook[0] });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 GET /books/search → Search by author or title
app.get("/books/search", (req, res) => {
  try {
    const db = readDB();
    const { author, title } = req.query;

    if (!author && !title) {
      return res.status(400).json({ error: "Please provide 'author' or 'title' as query parameter" });
    }

    let results = db.books;

    if (author) {
      results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }

    if (title) {
      results = results.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
