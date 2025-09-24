const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String },
  reviewMedia: { type: String },
  moderationStatus: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Review', ReviewSchema);


