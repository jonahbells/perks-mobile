import axios from 'axios';
import { API_URL } from '@env';

// Create an instance of axios with base configuration
const api = axios.create({
  baseURL: API_URL,  // Your base URL
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

export const addLikebyCustomer = async (id) => {
  try {
    const response = await api.post('likes');
    return response.data.rows;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }
};

export const unlikebyCustomer = async (id) => {
  try {
    const response = await api.delete('likes');
    return response.data.rows;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }
};