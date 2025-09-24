const mongoose = require('mongoose');

const ProductImageSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  imageUrl: { type: String, required: true },
  altText: { type: String },
  isMain: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ProductImage', ProductImageSchema);