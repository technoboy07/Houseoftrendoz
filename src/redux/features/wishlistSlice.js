import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getWishlist, 
  addToWishlist as addToWishlistAPI, 
  removeFromWishlist as removeFromWishlistAPI, 
  checkWishlist 
} from '../../services/api';

// Async thunks for API calls
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const wishlist = await getWishlist();
      return wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const wishlist = await addToWishlistAPI(productId);
      return wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const wishlist = await removeFromWishlistAPI(productId);
      return wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const checkWishlistStatus = createAsyncThunk(
  'wishlist/checkWishlistStatus',
  async (productId, { rejectWithValue }) => {
    try {
      const result = await checkWishlist(productId);
      return { productId, isInWishlist: result.isInWishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  products: [],
  wishlistStatus: {}, // Track wishlist status for each product
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Local wishlist actions for offline functionality
    addToWishlistLocal: (state, action) => {
      const product = action.payload;
      if (!state.products.find(p => p._id === product._id)) {
        state.products.push(product);
        state.wishlistStatus[product._id] = true;
      }
    },
    removeFromWishlistLocal: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(p => p._id !== productId);
      state.wishlistStatus[productId] = false;
    },
    setWishlistStatus: (state, action) => {
      const { productId, isInWishlist } = action.payload;
      state.wishlistStatus[productId] = isInWishlist;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        // Update wishlist status for all products
        state.products.forEach(product => {
          state.wishlistStatus[product._id] = true;
        });
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Wishlist Status
      .addCase(checkWishlistStatus.fulfilled, (state, action) => {
        const { productId, isInWishlist } = action.payload;
        state.wishlistStatus[productId] = isInWishlist;
      });
  },
});

export const { clearError, addToWishlistLocal, removeFromWishlistLocal, setWishlistStatus } = wishlistSlice.actions;
export default wishlistSlice.reducer;
