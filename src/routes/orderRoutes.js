const express = require('express');
const { createOrder } = require('../controllers/orderController');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/orders', rateLimiter, createOrder);

module.exports = router;
