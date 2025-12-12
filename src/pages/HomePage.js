import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/features/productSlice';
import { ArrowRightIcon, StarIcon } from '../assets/Icons';
import { formatPrice } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    // Fetch products for the homepage
    dispatch(getProducts({ limit: 3 }));
  }, [dispatch]);

  // Ensure products is always an array
  const productsArray = Array.isArray(products) ? products : [];
  
  // Get featured products (first 3 products)
  const featuredProducts = productsArray.slice(0, 3);

  const collections = [
    {
      name: "Spring Collection",
      description: "Fresh styles for the new season",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      link: "/products?category=spring"
    },
    {
      name: "Evening Wear",
      description: "Sophisticated pieces for special occasions",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop",
      link: "/products?category=evening"
    },
    {
      name: "Casual Luxury",
      description: "Effortless elegance for everyday",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
      link: "/products?category=casual"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen sm:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-4 sm:mb-6 animate-fade-in">
            House of Trendoz
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-serif font-light text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto animate-slide-up px-2">
            Discover the perfect blend of contemporary style and timeless elegance. 
            Where fashion meets sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-scale-in px-4">
            <Link to="/products" className="btn-primary text-sm sm:text-base py-3 sm:py-3 px-6 sm:px-6">
              Shop Collection
            </Link>
            <Link to="/products?category=new" className="btn-secondary border-white text-white hover:bg-white hover:text-luxury-black text-sm sm:text-base py-3 sm:py-3 px-6 sm:px-6">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light mb-3 sm:mb-4">Featured Products</h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-serif font-light text-luxury-gray max-w-2xl mx-auto px-4">
              Handpicked pieces that define luxury and style
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-80 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product._id} className="group card-luxury rounded-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(product.imageUrl)}
                      alt={product.name}
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link 
                        to={`/products/${product._id}`}
                        className="btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          filled={i < 4} 
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1" 
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-luxury-gray ml-2">(4.8)</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-xl sm:text-2xl font-light text-luxury-black">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-luxury-gray">No products available at the moment.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/products" className="btn-secondary inline-flex items-center space-x-2 text-sm sm:text-base py-3 sm:py-3 px-6 sm:px-6">
              <span>View All Products</span>
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light mb-3 sm:mb-4">Our Collections</h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-serif font-light text-luxury-gray max-w-2xl mx-auto px-4">
              Curated collections for every occasion and style
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {collections.map((collection, index) => (
              <Link 
                key={index}
                to={collection.link}
                className="group relative overflow-hidden rounded-lg h-80 sm:h-96"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-light mb-1 sm:mb-2">{collection.name}</h3>
                  <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">{collection.description}</p>
                  <div className="flex items-center space-x-2 text-white group-hover:text-luxury-gold transition-colors">
                    <span className="text-sm sm:text-base">Explore Collection</span>
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-luxury-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white mb-3 sm:mb-4">Stay in Style</h2>
          <p className="text-lg sm:text-xl lg:text-2xl font-serif font-light text-white/90 mb-6 sm:mb-8 px-4">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and fashion insights.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent text-base"
            />
            <button type="submit" className="btn-gold text-sm sm:text-base py-3 px-6">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Free Shipping</h3>
              <p className="text-sm sm:text-base text-luxury-gray">On orders over $200 worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Quality Guarantee</h3>
              <p className="text-sm sm:text-base text-luxury-gray">Premium materials and craftsmanship</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">Personal Styling</h3>
              <p className="text-sm sm:text-base text-luxury-gray">Expert advice for your perfect look</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;