const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("author");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const saved = await book.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Book not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};