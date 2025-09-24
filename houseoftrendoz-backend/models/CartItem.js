const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('CartItem', CartItemSchema);


