import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearCurrentProduct } from '../redux/features/productSlice';
import { addToCart } from '../redux/features/cartSlice';
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  PlusIcon, 
  MinusIcon,
  StarIcon,
  TruckIcon,
  ShieldIcon,
  CheckIcon
} from '../assets/Icons';
import { formatPrice } from '../services/api';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { currentProduct, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({
        id: currentProduct._id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.imageUrl,
        category: currentProduct.category,
        quantity: quantity
      }));
      
      // Show success message (you could add a toast notification here)
      alert(`${quantity} ${currentProduct.name}(s) added to cart!`);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (currentProduct?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically make an API call to save/remove from wishlist
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-black"></div>
            <span className="ml-4 text-luxury-gray">Loading product...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-luxury-black mb-4">Product Not Found</h2>
            <p className="text-luxury-gray mb-8">{error || 'The product you are looking for does not exist.'}</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mock images array (in real app, this would come from the product data)
  const productImages = [
    currentProduct.imageUrl,
    currentProduct.imageUrl, // You would have multiple images
    currentProduct.imageUrl,
  ];

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-luxury-gray hover:text-luxury-black transition-colors mb-8"
        >
          <ArrowLeftIcon />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={productImages[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-luxury-black' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            
            {/* Product Title and Category */}
            <div>
              <p className="text-sm text-luxury-gray uppercase tracking-wider mb-2">
                {currentProduct.category}
              </p>
              <h1 className="text-3xl font-serif font-light text-luxury-black mb-4">
                {currentProduct.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    filled={i < 4} 
                    className="w-4 h-4" 
                  />
                ))}
                <span className="text-sm text-luxury-gray">(4.8) • 24 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-light text-luxury-black">
              {formatPrice(currentProduct.price)}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-luxury-black mb-2">Description</h3>
              <p className="text-luxury-gray leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-luxury-gray">
                {currentProduct.stock > 0 ? `In Stock (${currentProduct.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-luxury-gray">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= currentProduct.stock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={currentProduct.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className="p-3 border-2 border-luxury-black hover:bg-luxury-black hover:text-white transition-colors"
              >
                <HeartIcon filled={isWishlisted} className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <TruckIcon className="w-5 h-5 text-luxury-gray" />
                  <div>
                    <p className="text-sm font-medium text-luxury-black">Free Shipping</p>
                    <p className="text-xs text-luxury-gray">On orders over $200</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldIcon className="w-5 h-5 text-luxury-gray" />
                  <div>
                    <p className="text-sm font-medium text-luxury-black">Quality Guarantee</p>
                    <p className="text-xs text-luxury-gray">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-luxury-gray" />
                  <div>
                    <p className="text-sm font-medium text-luxury-black">Easy Returns</p>
                    <p className="text-xs text-luxury-gray">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;