const User = require('../models/User');
const Book = require('../models/Book');

// Add User
exports.addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get User Rentals
exports.getUserRentals = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('rentedBooks');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.rentedBooks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Rent Book
exports.rentBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });

        if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
        if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

        await user.save();
        await book.save();

        res.json({ message: 'Book rented successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Return Book
exports.returnBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });

        user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
        book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

        await user.save();
        await book.save();

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
