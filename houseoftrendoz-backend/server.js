const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // New
const orderRoutes = require('./routes/orderRoutes'); // New

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // New
app.use('/api/orders', orderRoutes); // New

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
}); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));