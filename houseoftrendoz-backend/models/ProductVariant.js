const mongoose = require('mongoose');

const ProductVariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  sku: { type: String, required: true, unique: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  stockQuantity: { type: Number, required: true, default: 0 },
  price: { type: Number }, // Optional: variant-specific pricing
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);