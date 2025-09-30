// Test script to verify image utility functions
const { getImageUrl, getProductImages } = require('./src/utils/imageUtils');

console.log('Testing image utility functions:');
console.log('');

// Test external URL
const externalUrl = 'https://images.unsplash.com/photo-123.jpg';
console.log('External URL:', externalUrl);
console.log('Result:', getImageUrl(externalUrl));
console.log('');

// Test uploaded image
const uploadedUrl = '/uploads/products/product-123.jpg';
console.log('Uploaded URL:', uploadedUrl);
console.log('Result:', getImageUrl(uploadedUrl));
console.log('');

// Test empty/null
console.log('Empty URL:', '');
console.log('Result:', getImageUrl(''));
console.log('');

// Test product images array
console.log('Product images array:');
console.log('Result:', getProductImages('/uploads/products/product-123.jpg', 3));
