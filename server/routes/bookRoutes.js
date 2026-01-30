const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateBook, validateBookUpdate } = require('../middleware/validationMiddleware');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getAllBooks);

// @route   GET /api/books/:id
// @desc    Get a book by ID
// @access  Public
router.get('/:id', getBookById);

// @route   POST /api/books
// @desc    Create a new book
// @access  Private
router.post('/', authMiddleware, validateBook, createBook);

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', authMiddleware, validateBookUpdate, updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
