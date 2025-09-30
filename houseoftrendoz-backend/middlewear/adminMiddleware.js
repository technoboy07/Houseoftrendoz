const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Protect routes - Admin only
// @access  Private
const adminAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Check if user is admin
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { adminAuth };
