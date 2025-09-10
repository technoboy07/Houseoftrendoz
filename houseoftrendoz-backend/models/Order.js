const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }, // Price at time of purchase
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        // Add postalCode, country etc.
    },
    totalAmount: { type: Number, required: true, default: 0.0 },
    orderStatus: { type: String, required: true, default: 'Pending' },
    // Add payment info/status
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);