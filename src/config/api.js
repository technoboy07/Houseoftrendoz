// API Configuration
// Uses environment variable REACT_APP_API_URL if available, otherwise defaults to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log API URL in development (helps debug deployment issues)
if (process.env.NODE_ENV === 'development') {
  console.log('API URL:', API_URL);
}

// Also log in production if API URL is not set (helps catch deployment issues)
if (!process.env.REACT_APP_API_URL && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ REACT_APP_API_URL is not set! Using default localhost URL. This will not work in production.');
}

export default API_URL;

