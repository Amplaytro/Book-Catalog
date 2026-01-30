const Book = require('../models/Book');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res, next) => {
    try {
        const { title, author, genre, price, inStock } = req.body;

        const book = await Book.create({
            title,
            author,
            genre,
            price,
            inStock,
        });

        successResponse(res, 201, 'Book created successfully', book);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        successResponse(res, 200, 'Books retrieved successfully', books);
    } catch (error) {
        next(error);
    }
};

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return errorResponse(res, 404, 'Book not found');
        }

        successResponse(res, 200, 'Book retrieved successfully', book);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res, next) => {
    try {
        const { title, author, genre, price, inStock } = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return errorResponse(res, 404, 'Book not found');
        }

        // Update fields if provided
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (genre !== undefined) book.genre = genre;
        if (price !== undefined) book.price = price;
        if (inStock !== undefined) book.inStock = inStock;

        const updatedBook = await book.save();

        successResponse(res, 200, 'Book updated successfully', updatedBook);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return errorResponse(res, 404, 'Book not found');
        }

        await book.deleteOne();

        successResponse(res, 200, 'Book deleted successfully', { _id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
