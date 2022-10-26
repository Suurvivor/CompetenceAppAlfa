const express = require('express');

//Get control methods
const { register, login, getMe, logout } = require('../controllers/Auth');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;