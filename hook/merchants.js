import axios from 'axios';

// Create an instance of axios with base configuration
const api = axios.create({
  baseURL: process.env.API_URL,  // Your base URL
  timeout: 10000,  // Optional timeout
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers you want
  },
});

export const fetchAllMerchants = async () => {
  try {
    const response = await api.get('merchants');
    return response.data.rows;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};

// Function to make GET request by id
export const fetchMerchantById = async (id) => {
  try {
    const response = await api.get('merchants/'+id);
    return response.data;

  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};

export const checkMerchantVerification = async (id) => {
  try {
    const response = await api.get('merchants/'+id);
    return response.data;m

  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};

// export const savedByCustomer = async (id) => {
//   try {
//     const response = await api.post('merchants/');
//     return response.data;m

//   } catch (error) {
//     throw error;  // Propagate error to the caller
//   }

// };