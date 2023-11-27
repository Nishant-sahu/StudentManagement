const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { csrfProtection } = require('../middleware/csrfMiddleware');


router.post('/login' , login);


module.exports = router;
