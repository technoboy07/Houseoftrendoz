const Razorpay = require('razorpay');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

// Initialize Razorpay with fallback for development
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn('⚠️  Razorpay credentials not found. Payment functionality will be disabled.');
}

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        message: 'Payment service is currently unavailable. Please contact support.' 
      });
    }

    const { shippingAddress } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product')
      .populate('items.variant');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock availability
    for (const item of cart.items) {
      const product = item.product;
      let availableStock = product.stock;
      
      if (item.variant) {
        const variant = await ProductVariant.findById(item.variant._id);
        availableStock = variant.stockQuantity;
      }

      if (availableStock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(cart.totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId: req.user.id,
        cartId: cart._id,
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Verify payment and create order
// @route   POST /api/payments/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress } = req.body;

    // Verify payment signature
    const crypto = require('crypto');
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product')
      .populate('items.variant');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order items
    const orderItems = cart.items.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      product: item.product._id,
      variant: item.variant?._id,
    }));

    // Create order
    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalAmount: cart.totalAmount,
      paymentId: razorpay_payment_id,
      orderStatus: 'Confirmed',
    });

    await order.save();

    // Update stock
    for (const item of cart.items) {
      if (item.variant) {
        await ProductVariant.updateOne(
          { _id: item.variant._id },
          { $inc: { stockQuantity: -item.quantity } }
        );
      } else {
        await Product.updateOne(
          { _id: item.product._id },
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: 'Payment verified and order created successfully',
      orderId: order._id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get payment key for frontend
// @route   GET /api/payments/key
// @access  Public
exports.getPaymentKey = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID) {
      return res.status(503).json({ 
        message: 'Payment service is currently unavailable.' 
      });
    }
    
    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error getting payment key:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
