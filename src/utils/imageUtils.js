/**
 * Utility function to get the full image URL
 * Handles both external URLs and uploaded images
 * @param {string} imageUrl - The image URL from the product data
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If it's already a full URL (starts with http), return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative path (starts with /uploads), prepend backend URL
  if (imageUrl.startsWith('/uploads')) {
    return `http://localhost:5000${imageUrl}`;
  }
  
  // For any other case, return as-is
  return imageUrl;
};

/**
 * Get multiple image URLs for product galleries
 * @param {string} imageUrl - The main image URL
 * @param {number} count - Number of images to return (default: 3)
 * @returns {string[]} - Array of image URLs
 */
export const getProductImages = (imageUrl, count = 3) => {
  const fullImageUrl = getImageUrl(imageUrl);
  return Array(count).fill(fullImageUrl);
};
