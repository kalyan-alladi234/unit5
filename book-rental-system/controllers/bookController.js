const Book = require('../models/Book');
const User = require('../models/User');

// Add Book
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = new Book({ title, author, genre });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Book Renters
exports.getBookRenters = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate('rentedBy');
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book.rentedBy);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        // Remove book from all users rentedBooks
        await User.updateMany(
            { rentedBooks: book._id },
            { $pull: { rentedBooks: book._id } }
        );

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
