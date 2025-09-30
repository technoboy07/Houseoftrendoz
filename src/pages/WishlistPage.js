import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWishlist, removeFromWishlist } from '../redux/features/wishlistSlice';
import { addToCart } from '../redux/features/cartSlice';
import ProductCard from '../components/ProductCard';
import { HeartIcon, BagIcon } from '../assets/Icons';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector(state => state.wishlist);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      quantity: 1
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <HeartIcon className="w-16 h-16 text-luxury-gray mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-luxury-black mb-4">Sign In Required</h2>
            <p className="text-luxury-gray mb-8">Please sign in to view your wishlist.</p>
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-black"></div>
            <span className="ml-4 text-luxury-gray">Loading wishlist...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4">My Wishlist</h1>
          <p className="text-base sm:text-lg lg:text-xl font-serif font-light text-luxury-gray">
            {products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <HeartIcon className="w-12 h-12 sm:w-16 sm:h-16 text-luxury-gray mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-luxury-black mb-2">Your wishlist is empty</h3>
            <p className="text-luxury-gray mb-6 text-sm sm:text-base">Add some products to your wishlist to see them here</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary text-sm sm:text-base py-3 px-6"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map(product => (
              <div key={product._id} className="relative group">
                <ProductCard product={product} />
                {/* Mobile: Always visible remove button */}
                <div className="absolute top-2 right-2 sm:hidden">
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors touch-manipulation"
                    title="Remove from wishlist"
                  >
                    <HeartIcon filled={true} className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                {/* Desktop: Show on hover */}
                <div className="absolute top-2 right-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    title="Remove from wishlist"
                  >
                    <HeartIcon filled={true} className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                {/* Mobile: Always visible add to cart button */}
                <div className="absolute bottom-2 left-2 right-2 sm:hidden">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary flex items-center justify-center space-x-2 text-sm py-2 touch-manipulation"
                  >
                    <BagIcon className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
                {/* Desktop: Show on hover */}
                <div className="absolute bottom-2 left-2 right-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <BagIcon className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
