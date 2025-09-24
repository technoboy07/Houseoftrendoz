const express = require('express');
const router = express.Router();
const { protect } = require('../middlewear/authMiddleware');
const {
  createRazorpayOrder,
  verifyPayment,
  getPaymentKey
} = require('../controllers/paymentController');

// Public route for getting payment key
router.get('/key', getPaymentKey);

// Protected routes
router.use(protect);

router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPayment);

module.exports = router;
