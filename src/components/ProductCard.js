import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { 
  HeartIcon, 
  EyeIcon, 
  StarIcon,
  PlusIcon 
} from '../assets/Icons';

const ProductCard = ({ product, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || product.image,
      category: product.category
    }));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} filled={true} className="w-3 h-3" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" filled={true} className="w-3 h-3 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} filled={false} className="w-3 h-3" />);
    }

    return stars;
  };

  if (variant === 'compact') {
    return (
      <Link 
        to={`/products/${product._id || product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="aspect-square relative">
            <img
              src={product.imageUrl || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={handleWishlist}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <HeartIcon 
                  filled={isWishlisted} 
                  className="w-4 h-4" 
                />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-light">{formatPrice(product.price)}</span>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id || product.id}`}>
        <div className="card-luxury rounded-lg overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.imageUrl || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay Actions */}
            <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex space-x-2">
                <button
                  onClick={handleWishlist}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <HeartIcon 
                    filled={isWishlisted} 
                    className="w-5 h-5" 
                  />
                </button>
                <Link
                  to={`/products/${product._id || product.id}`}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <EyeIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Quick Add Button */}
            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Sale Badge */}
            {product.sale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                SALE
              </div>
            )}

            {/* New Badge */}
            {product.isNew && (
              <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-black px-2 py-1 text-xs font-medium rounded">
                NEW
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-luxury-gray ml-1">({product.rating})</span>
              </div>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-luxury-gold transition-colors">
              {product.name}
            </h3>

            {/* Category */}
            {product.category && (
              <p className="text-sm text-luxury-gray mb-2 capitalize">
                {product.category}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-light text-luxury-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-luxury-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colors/Sizes Preview */}
            {product.variants && (
              <div className="mt-3 flex items-center space-x-2">
                {product.variants.colors && product.variants.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.variants.colors && product.variants.colors.length > 4 && (
                  <span className="text-xs text-luxury-gray">
                    +{product.variants.colors.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
