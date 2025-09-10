import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, setFilters, clearFilters } from '../redux/features/productSlice';
import { 
  FilterIcon, 
  SortAscIcon, 
  SortDescIcon, 
  GridIcon,
  ChevronDownIcon 
} from '../assets/Icons';

const ProductPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const { products, loading, error, filters } = useSelector(state => state.products);

  // Get URL parameters
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    // Set filters from URL parameters
    const urlFilters = {};
    if (category) urlFilters.category = category;
    if (search) urlFilters.search = search;
    
    if (Object.keys(urlFilters).length > 0) {
      dispatch(setFilters(urlFilters));
    }
    
    // Fetch products with current filters
    dispatch(getProducts(filters));
  }, [dispatch, category, search]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    dispatch(setFilters(newFilters));
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(filterType, value);
    } else {
      newSearchParams.delete(filterType);
    }
    setSearchParams(newSearchParams);
    
    // Fetch products with new filters
    dispatch(getProducts(newFilters));
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    handleFilterChange('sort', newSortOrder);
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setSearchParams({});
    dispatch(getProducts({}));
  };

  const categories = ['women', 'men', 'accessories', 'new', 'sale'];

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-black"></div>
            <span className="ml-4 text-luxury-gray">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-luxury-black mb-4">Error Loading Products</h2>
            <p className="text-luxury-gray mb-8">{error}</p>
            <button 
              onClick={() => dispatch(getProducts(filters))}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-luxury mb-4">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : 'All Products'}
          </h1>
          <p className="text-luxury-subtitle">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 btn-secondary"
            >
              <FilterIcon />
              <span>Filters</span>
              <ChevronDownIcon className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-luxury-gray">Category:</span>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-luxury w-40"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-luxury-gray">Search:</span>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="input-luxury w-64"
                />
              </div>

              {(filters.category || filters.search) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-luxury-gray hover:text-luxury-black transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSort}
                className="flex items-center space-x-2 btn-secondary"
              >
                {sortOrder === 'asc' ? <SortAscIcon /> : <SortDescIcon />}
                <span>Sort by Price</span>
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-luxury-gray mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-luxury w-full"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-gray mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="input-luxury w-full"
                  />
                </div>

                {(filters.category || filters.search) && (
                  <button
                    onClick={clearAllFilters}
                    className="w-full btn-secondary"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <GridIcon className="w-16 h-16 text-luxury-gray mx-auto mb-4" />
            <h3 className="text-xl font-medium text-luxury-black mb-2">No Products Found</h3>
            <p className="text-luxury-gray mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-primary"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
