const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    const { orderItems, shippingAddress, totalAmount } = req.body;
    
    // NOTE: For transactions to work, your MongoDB must be a replica set.
    // MongoDB Atlas free tier provides this by default.
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = new Order({
            user: req.user.id, // Assuming user ID is attached from auth middleware
            orderItems,
            shippingAddress,
            totalAmount
        });

        const createdOrder = await order.save({ session });

        // Update stock for each ordered item
        for (const item of order.orderItems) {
            await Product.updateOne(
                { _id: item.product },
                { $inc: { stock: -item.quantity } },
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(createdOrder);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: 'Server Error: Failed to create order' });
    }
};