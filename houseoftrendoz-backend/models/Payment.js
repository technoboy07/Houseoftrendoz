const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, enum: ['card', 'UPI', 'PayPal', 'COD'], required: true },
  transactionId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paymentStatus: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);


