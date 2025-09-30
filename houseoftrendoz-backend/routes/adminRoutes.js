const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllUsers,
    updateUserRole
} = require('../controllers/adminController');
const { adminAuth } = require('../middlewear/adminMiddleware');
const { uploadSingle } = require('../middlewear/uploadMiddleware');
const multer = require('multer');

// Apply admin authentication to all routes
router.use(adminAuth);

// Dashboard routes
router.route('/dashboard').get(getDashboardStats);

// Order management routes
router.route('/orders').get(getAllOrders);
router.route('/orders/:id/status').put(updateOrderStatus);

// Product management routes
router.route('/products')
    .get(getAllProducts)
    .post(uploadSingle, (err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
            }
        }
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    }, createProduct);

router.route('/products/:id')
    .put(uploadSingle, (err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
            }
        }
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    }, updateProduct)
    .delete(deleteProduct);

// User management routes
router.route('/users').get(getAllUsers);
router.route('/users/:id/role').put(updateUserRole);

module.exports = router;
