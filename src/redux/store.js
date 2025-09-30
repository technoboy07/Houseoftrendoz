import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productReducer from './features/productSlice';
import authReducer from './features/authSlice';
import wishlistReducer from './features/wishlistSlice';
import adminReducer from './features/adminSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});