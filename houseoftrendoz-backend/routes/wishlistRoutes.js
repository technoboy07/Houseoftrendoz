const express = require('express');
const router = express.Router();
const { protect } = require('../middlewear/authMiddleware');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist
} = require('../controllers/wishlistController');

// All routes are protected (require authentication)
router.use(protect);

router.route('/')
  .get(getWishlist)
  .post(addToWishlist);

router.route('/check/:productId')
  .get(checkWishlist);

router.route('/:productId')
  .delete(removeFromWishlist);

module.exports = router;
