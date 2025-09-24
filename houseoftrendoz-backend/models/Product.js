const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  brand: { type: String },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  discountPrice: { type: Number },
  currency: { type: String, default: 'USD' },
  material: { type: String },
  fit: { type: String },
  careInstructions: { type: String },
  slug: { type: String, unique: true, sparse: true },
  // Backward-compat fields for existing frontend
  imageUrl: { type: String },
  price: { type: Number },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);