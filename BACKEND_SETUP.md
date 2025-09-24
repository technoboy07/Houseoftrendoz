# Backend Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Setup Steps

### 1. Backend Environment Setup
Create a `.env` file in the `houseoftrendoz-backend` directory with the following content:

```env
# MongoDB Connection String
MONGO=mongodb://localhost:27017/houseoftrendoz

# JWT Secret for authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 2. Install Backend Dependencies
```bash
cd houseoftrendoz-backend
npm install
```

### 3. Start the Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

### 4. Seed Sample Data (Optional)
To populate your database with sample products:
```bash
npm run seed
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin only)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cart
- `GET /api/cart` - Get user's cart (requires authentication)
- `POST /api/cart` - Add item to cart (requires authentication)
- `PUT /api/cart/:itemId` - Update cart item quantity (requires authentication)
- `DELETE /api/cart/:itemId` - Remove item from cart (requires authentication)
- `DELETE /api/cart` - Clear entire cart (requires authentication)

### Wishlist
- `GET /api/wishlist` - Get user's wishlist (requires authentication)
- `POST /api/wishlist` - Add product to wishlist (requires authentication)
- `DELETE /api/wishlist/:productId` - Remove product from wishlist (requires authentication)
- `GET /api/wishlist/check/:productId` - Check if product is in wishlist (requires authentication)

### Payments
- `GET /api/payments/key` - Get Razorpay key (public)
- `POST /api/payments/create-order` - Create Razorpay order (requires authentication)
- `POST /api/payments/verify` - Verify payment (requires authentication)

### Orders
- `POST /api/orders` - Create new order (requires authentication)

## Database Models

### Product
- name: String (required)
- description: String (required)
- price: Number (required)
- category: String (required)
- imageUrl: String (required)
- stock: Number (default: 0)

### User
- firstName: String (required)
- lastName: String (required)
- email: String (required, unique)
- password: String (required, hashed)

### Order
- user: ObjectId (ref: User)
- orderItems: Array of items
- shippingAddress: Object
- totalAmount: Number
- orderStatus: String (default: 'Pending')

## Frontend Integration

The frontend is configured to connect to the backend at `http://localhost:5000/api`. Make sure both servers are running:

1. Backend: `http://localhost:5000`
2. Frontend: `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check your connection string in the `.env` file
- Verify the database name matches your MongoDB setup

### CORS Issues
- The backend has CORS enabled for all origins
- If you encounter CORS issues, check the CORS configuration in `server.js`

### Authentication Issues
- Ensure JWT_SECRET is set in your `.env` file
- Check that the token is being sent in the Authorization header
- Verify the token format: `Bearer <token>`
