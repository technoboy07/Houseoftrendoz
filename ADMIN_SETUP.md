# Admin Panel Setup Guide

## Overview
This guide will help you set up and use the Admin Monitoring Page for the House of Trendoz e-commerce platform.

## Features

### 🎯 Dashboard
- **Real-time Statistics**: Total users, products, orders, and revenue
- **Recent Orders**: Latest customer orders with status tracking
- **Low Stock Alerts**: Products running low on inventory
- **Monthly Revenue Charts**: Revenue trends over time

### 📦 Order Management
- **View All Orders**: Paginated list with filtering options
- **Update Order Status**: Processing → Shipped → Delivered
- **Track Packages**: Add tracking numbers and courier services
- **Order Filtering**: By status, payment status, and date range

### 🛍️ Product Management
- **CRUD Operations**: Create, read, update, and delete products
- **Inventory Tracking**: Monitor stock levels with low stock alerts
- **Product Search**: Search by name, brand, or description
- **Category Management**: Organize products by categories

### 👥 User Management
- **User Overview**: View all registered users
- **Role Management**: Assign admin, customer, or vendor roles
- **User Statistics**: Track user registrations by role
- **User Search**: Find users by name or email

## Setup Instructions

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd houseoftrendoz-backend
   ```

2. **Create an admin user:**
   ```bash
   npm run create-admin
   ```
   
   This will create an admin user with:
   - Email: `admin@houseoftrendoz.com`
   - Password: `admin123`
   - Role: `admin`

3. **Start the backend server:**
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd .. (back to root)
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```

### 3. Access the Admin Panel

1. **Login with admin credentials:**
   - Go to `http://localhost:3000/login`
   - Email: `admin@houseoftrendoz.com`
   - Password: `admin123`

2. **Access the admin panel:**
   - After login, click on your profile menu
   - Select "Admin Panel" (only visible to admin users)
   - Or navigate directly to `http://localhost:3000/admin`

## API Endpoints

### Admin Routes (Protected - Admin Only)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/orders` - Get all orders with pagination
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/products` - Get all products with pagination
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - Get all users with pagination
- `PUT /api/admin/users/:id/role` - Update user role

### Authentication
All admin routes are protected by the `adminAuth` middleware which:
- Verifies JWT token
- Checks if user has admin role
- Returns 403 error for non-admin users

## Security Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication
- **Role-based Access Control**: Only admin users can access admin panel
- **Protected Routes**: All admin endpoints require admin authentication
- **Session Management**: Automatic logout on token expiration

### 🛡️ Input Validation
- **Server-side Validation**: All inputs validated on backend
- **Error Handling**: Comprehensive error messages and handling
- **Data Sanitization**: Input sanitization to prevent injection attacks

## Usage Guide

### Managing Orders

1. **View Orders:**
   - Go to the "Orders" tab in the admin panel
   - Use filters to find specific orders
   - Click on order details to view more information

2. **Update Order Status:**
   - Click the edit icon next to any order
   - Select new status (Processing, Shipped, Delivered, etc.)
   - Add tracking number and courier service if needed
   - Click "Update" to save changes

3. **Track Packages:**
   - Update order status to "Shipped"
   - Add tracking number provided by courier
   - Specify courier service (FedEx, UPS, DHL, etc.)

### Managing Products

1. **Add New Product:**
   - Go to the "Products" tab
   - Click "Add Product" button
   - Fill in product details (name, price, stock, etc.)
   - Click "Create Product"

2. **Edit Product:**
   - Find the product in the list
   - Click the edit icon
   - Modify product details
   - Click "Update Product"

3. **Monitor Inventory:**
   - Check the dashboard for low stock alerts
   - Use "Low Stock Only" filter in products page
   - Update stock quantities as needed

### Managing Users

1. **View Users:**
   - Go to the "Users" tab
   - Use search and filters to find specific users
   - View user statistics at the top

2. **Change User Roles:**
   - Click the edit icon next to any user
   - Select new role (Customer, Admin, Vendor)
   - Click "Update Role"

## Performance Optimization

### 🚀 Scalability Features
- **Pagination**: All lists use pagination for better performance
- **Lazy Loading**: Components load data only when needed
- **Efficient Queries**: Optimized database queries with proper indexing
- **Caching**: Redux state management for efficient data caching

### 📊 Database Optimization
- **Indexed Fields**: Database indexes on frequently queried fields
- **Aggregation Pipelines**: Efficient data aggregation for statistics
- **Connection Pooling**: Optimized database connections

## Troubleshooting

### Common Issues

1. **Cannot Access Admin Panel:**
   - Ensure you're logged in with an admin account
   - Check that the user role is set to 'admin'
   - Verify JWT token is valid

2. **API Errors:**
   - Check backend server is running
   - Verify database connection
   - Check network connectivity

3. **Data Not Loading:**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check Redux store state

### Support

For additional support or questions:
1. Check the browser console for error messages
2. Verify backend logs for server errors
3. Ensure all dependencies are installed
4. Check database connection status

## Development Notes

### File Structure
```
src/
├── pages/
│   └── AdminPage.js              # Main admin page
├── components/admin/
│   ├── AdminHeader.js            # Admin header with navigation
│   ├── AdminSidebar.js           # Sidebar navigation
│   ├── AdminDashboard.js         # Dashboard with statistics
│   ├── AdminOrders.js            # Order management
│   ├── AdminProducts.js          # Product management
│   └── AdminUsers.js             # User management
└── redux/features/
    └── adminSlice.js             # Admin state management
```

### Backend Structure
```
houseoftrendoz-backend/
├── controllers/
│   └── adminController.js        # Admin business logic
├── routes/
│   └── adminRoutes.js            # Admin API routes
├── middlewear/
│   └── adminMiddleware.js        # Admin authentication
└── createAdminUser.js            # Admin user creation script
```

This admin panel provides a comprehensive solution for managing your e-commerce platform with a modern, responsive interface and robust backend functionality.
