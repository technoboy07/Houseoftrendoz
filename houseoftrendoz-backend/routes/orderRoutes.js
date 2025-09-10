const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const { protect } = require('../middlewear/authMiddleware');

// Any routes defined here will be prefixed with /api/orders

// POST to /api/orders/
// This route is protected. The user must be logged in.
router.route('/').post(protect, createOrder);

// You could also add a route to get a user's orders
// router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
