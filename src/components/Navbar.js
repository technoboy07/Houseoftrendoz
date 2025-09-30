import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { 
  LogoIcon, 
  SearchIcon, 
  UserIcon, 
  HeartIcon, 
  BagIcon, 
  MenuIcon, 
  CloseIcon, 
  ChevronDownIcon 
} from '../assets/Icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get all needed state in one selector to prevent multiple re-renders
  const { isAuthenticated, user, cartItems, totalItems } = useSelector(state => ({
    isAuthenticated: state.auth?.isAuthenticated || false,
    user: state.auth?.user,
    cartItems: state.cart?.items || [],
    totalItems: state.cart?.totalItems || 0
  }));
  
  const cartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cartItems]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setShowUserMenu(false); // Close user menu on route change
  }, [location]);

  const navigationItems = [
    { name: 'Women', href: '/products?category=women', hasDropdown: true },
    { name: 'Men', href: '/products?category=men', hasDropdown: true },
    { name: 'Accessories', href: '/products?category=accessories', hasDropdown: true },
    { name: 'New Arrivals', href: '/products?category=new', hasDropdown: false },
    { name: 'Sale', href: '/products?category=sale', hasDropdown: false },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-luxury-black text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $200 • New collection now available</p>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Section - Menu & Search */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
              
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden lg:flex items-center space-x-2 text-sm font-medium tracking-wider hover:text-luxury-gold transition-colors"
              >
                <SearchIcon />
                <span>SEARCH</span>
              </button>
            </div>

            {/* Center Section - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="flex items-center">
                <LogoIcon className="w-12 h-12" />
              </Link>
            </div>

            {/* Right Section - User Actions */}
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hidden lg:block p-2 hover:bg-gray-100 rounded-md transition-colors">
                    <UserIcon />
                  </Link>
                </>
              ) : (
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <UserIcon />
                    <span className="text-sm">{user?.firstName || 'User'}</span>
                    <ChevronDownIcon className="w-3 h-3" />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-luxury-gray hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-luxury-gray hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-luxury-gray hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Wishlist
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-luxury-gray hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-luxury-gray hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Link to="/wishlist" className="hidden lg:block p-2 hover:bg-gray-100 rounded-md transition-colors">
                <HeartIcon />
              </Link>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
                <BagIcon itemCount={totalItems || cartItemCount()} />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center justify-center space-x-12 py-4 border-t border-gray-200">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="text-sm font-medium tracking-wider text-luxury-black hover:text-luxury-gold transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDownIcon />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
                    <div className="py-4">
                      <div className="px-6 py-2 text-xs font-semibold text-luxury-gray uppercase tracking-wider">
                        {item.name}
                      </div>
                      <div className="space-y-2">
                        <Link to={`${item.href}&subcategory=dresses`} className="block px-6 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Dresses
                        </Link>
                        <Link to={`${item.href}&subcategory=tops`} className="block px-6 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Tops
                        </Link>
                        <Link to={`${item.href}&subcategory=bottoms`} className="block px-6 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Bottoms
                        </Link>
                        <Link to={`${item.href}&subcategory=outerwear`} className="block px-6 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Outerwear
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white max-h-screen overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="mb-6">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-luxury-gold focus:border-transparent text-base"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </form>
              </div>

              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-lg font-medium text-luxury-black hover:text-luxury-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* User Actions */}
              <div className="pt-4 border-t border-gray-200 space-y-4">
                {!isAuthenticated ? (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-3 text-luxury-black hover:text-luxury-gold transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="text-lg">Sign In</span>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-luxury-black py-2">
                      <UserIcon className="w-5 h-5" />
                      <span className="text-lg">Welcome, {user?.firstName || 'User'}</span>
                    </div>
                    <div className="ml-8 space-y-2">
                      <Link 
                        to="/profile" 
                        className="block text-base text-luxury-gray hover:text-luxury-gold transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block text-base text-luxury-gray hover:text-luxury-gold transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block text-base text-luxury-gray hover:text-luxury-gold transition-colors py-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
                
                <Link 
                  to="/wishlist" 
                  className="flex items-center space-x-3 text-luxury-black hover:text-luxury-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HeartIcon className="w-5 h-5" />
                  <span className="text-lg">Wishlist</span>
                </Link>
                
                <Link 
                  to="/cart" 
                  className="flex items-center space-x-3 text-luxury-black hover:text-luxury-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BagIcon itemCount={totalItems || cartItemCount()} className="w-5 h-5" />
                  <span className="text-lg">Cart ({totalItems || cartItemCount()})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
    </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-32 lg:h-40"></div>
    </>
  );
};

export default Navbar;
