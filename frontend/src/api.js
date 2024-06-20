// src/api.js
import axios from 'axios';

// Create an Axios instance with the base URL of your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this matches your backend's base URL
});

export default api;
