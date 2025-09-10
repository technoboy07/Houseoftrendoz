const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Elegant Evening Dress",
    description: "A stunning evening dress perfect for special occasions. Made with premium silk fabric and featuring intricate beadwork details.",
    price: 299,
    category: "women",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    stock: 15
  },
  {
    name: "Classic Tailored Suit",
    description: "A sophisticated men's suit crafted from fine wool blend. Perfect for business meetings and formal events.",
    price: 599,
    category: "men",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    stock: 8
  },
  {
    name: "Luxury Leather Handbag",
    description: "Handcrafted leather handbag with gold hardware. Spacious interior with multiple compartments for organization.",
    price: 199,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    stock: 12
  },
  {
    name: "Designer Blouse",
    description: "Elegant blouse with unique pattern and comfortable fit. Made from high-quality cotton blend.",
    price: 89,
    category: "women",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
    stock: 20
  },
  {
    name: "Premium Denim Jacket",
    description: "Classic denim jacket with modern fit. Made from premium denim with attention to detail.",
    price: 149,
    category: "men",
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop",
    stock: 10
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with beautiful print. Perfect accessory for any outfit.",
    price: 79,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1601925260369-1c0b2b0b0b0b?w=500&h=600&fit=crop",
    stock: 25
  },
  {
    name: "Cocktail Dress",
    description: "Chic cocktail dress perfect for evening events. Features elegant silhouette and premium fabric.",
    price: 249,
    category: "women",
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
    stock: 6
  },
  {
    name: "Business Shirt",
    description: "Professional business shirt with crisp collar and perfect fit. Made from premium cotton.",
    price: 69,
    category: "men",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
    stock: 18
  },
  {
    name: "Statement Necklace",
    description: "Bold statement necklace with unique design. Perfect for adding glamour to any outfit.",
    price: 129,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
    stock: 14
  },
  {
    name: "Maxi Dress",
    description: "Flowing maxi dress perfect for summer. Made from lightweight, breathable fabric.",
    price: 179,
    category: "women",
    imageUrl: "https://images.unsplash.com/photo-1566479179817-c0d9d2b3b3b3?w=500&h=600&fit=crop",
    stock: 9
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
