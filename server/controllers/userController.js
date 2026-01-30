const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 400, 'User already exists with this email');
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Return user details (without password)
        successResponse(res, 201, 'User registered successfully', {
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        successResponse(res, 200, 'Login successful', {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
