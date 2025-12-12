// API Configuration
// Uses environment variable REACT_APP_API_URL if available, otherwise defaults to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default API_URL;

