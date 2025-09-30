import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart 
} from '../redux/features/cartSlice';
import { 
  MinusIcon, 
  PlusIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  BagIcon,
  CheckIcon
} from '../assets/Icons';
import { formatPrice } from '../services/api';
import { createRazorpayOrder, verifyPayment, getPaymentKey } from '../services/api';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const { items, totalAmount, totalItems, loading } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate shipping address
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.phone) {
      alert('Please fill in all shipping address fields');
      return;
    }

    setIsCheckingOut(true);

    try {
      // Get Razorpay key
      const { key } = await getPaymentKey();

      // Create Razorpay order
      const { orderId, amount } = await createRazorpayOrder(shippingAddress);

      // Configure Razorpay options
      const options = {
        key: key,
        amount: amount,
        currency: 'INR',
        name: 'House of Trendoz',
        description: 'Payment for your order',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingAddress
            });

            alert('Payment successful! Order placed successfully.');
            navigate('/orders');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.firstName + ' ' + user?.lastName,
          email: user?.email,
          contact: shippingAddress.phone
        },
        notes: {
          address: shippingAddress.address
        },
        theme: {
          color: '#1a1a1a'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-black"></div>
            <span className="ml-4 text-luxury-gray">Loading cart...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <BagIcon className="w-16 h-16 text-luxury-gray mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-luxury-black mb-4">Sign In Required</h2>
            <p className="text-luxury-gray mb-8">Please sign in to view your cart and checkout.</p>
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

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-luxury-gray hover:text-luxury-black transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Continue Shopping</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light">Shopping Cart</h1>
          {items.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="text-sm text-red-500 hover:text-red-700 transition-colors self-start sm:self-auto"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <BagIcon className="w-12 h-12 sm:w-16 sm:h-16 text-luxury-gray mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-luxury-black mb-2">Your cart is empty</h3>
            <p className="text-luxury-gray mb-6 text-sm sm:text-base">Add some products to get started</p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary text-sm sm:text-base py-3 px-6"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-medium text-luxury-black mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-luxury-gray text-xs sm:text-sm mb-2">
                        {item.variant && `${item.variant.size} • ${item.variant.color}`}
                      </p>
                      <p className="text-lg sm:text-xl font-light text-luxury-black">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 touch-manipulation"
                        >
                          <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 touch-manipulation"
                        >
                          <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors touch-manipulation"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm lg:sticky lg:top-8">
                <h3 className="text-lg sm:text-xl font-medium text-luxury-black mb-4 sm:mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-luxury-gray">Items ({totalItems})</span>
                    <span className="text-sm sm:text-base text-luxury-black">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-luxury-gray">Shipping</span>
                    <span className="text-sm sm:text-base text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base sm:text-lg font-medium text-luxury-black">Total</span>
                      <span className="text-base sm:text-lg font-medium text-luxury-black">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Form */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-medium text-luxury-black mb-3 sm:mb-4">Shipping Address</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="input-luxury text-sm sm:text-base py-2 sm:py-2"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="input-luxury text-sm sm:text-base py-2 sm:py-2"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="input-luxury text-sm sm:text-base py-2 sm:py-2"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                        className="input-luxury text-sm sm:text-base py-2 sm:py-2"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="input-luxury text-sm sm:text-base py-2 sm:py-2"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base py-3 touch-manipulation"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-luxury-gray text-center mt-3 sm:mt-4">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;