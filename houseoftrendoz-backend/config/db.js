const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error("MongoDB connection string (MONGO) is missing in .env");
    }

    const conn = await mongoose.connect(process.env.MONGO);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
