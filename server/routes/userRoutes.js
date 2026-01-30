const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, register);

// @route   POST /api/users/login
// @desc    Login user and get token
// @access  Public
router.post('/login', validateLogin, login);

module.exports = router;
