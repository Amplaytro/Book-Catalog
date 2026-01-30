const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// User registration validation
const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    handleValidationErrors,
];

// User login validation
const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors,
];

// Book validation
const validateBook = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('genre').trim().notEmpty().withMessage('Genre is required'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a number')
        .custom((value) => value >= 0)
        .withMessage('Price cannot be negative'),
    body('inStock').optional().isBoolean().withMessage('inStock must be a boolean'),
    handleValidationErrors,
];

// Book update validation (all fields optional)
const validateBookUpdate = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().trim().notEmpty().withMessage('Author cannot be empty'),
    body('genre').optional().trim().notEmpty().withMessage('Genre cannot be empty'),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number')
        .custom((value) => value >= 0)
        .withMessage('Price cannot be negative'),
    body('inStock').optional().isBoolean().withMessage('inStock must be a boolean'),
    handleValidationErrors,
];

module.exports = {
    validateRegister,
    validateLogin,
    validateBook,
    validateBookUpdate,
};
