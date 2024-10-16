import axios from 'axios';

// Create an instance of axios with base configuration
const api = axios.create({
  baseURL: 'https://api.perksmania.com/api/v1/',  // Your base URL
  timeout: 10000,  // Optional timeout
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers you want
  },
});

export const likesByCustomer = async (id) => {
  try {
    const response = await api.get('likes/customer/+id');
    return response.data.rows;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};