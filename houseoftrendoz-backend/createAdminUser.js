const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO || process.env.MONGO_URI || 'mongodb://localhost:27017/houseoftrendoz');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@houseoftrendoz.com',
      password: 'admin123'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Updated existing user to admin role');
      }
      process.exit(0);
    }

    // Create new admin user
    const adminUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');
    console.log('Role:', adminUser.role);
    console.log('\nYou can now login to the admin panel at /admin');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
