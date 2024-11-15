// import { useState, useEffect } from "react";
// import axios from "axios";

// export const fetchAllPerks = (endpoint, query) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://api.perksmania.com/${endpoint}`,
//     headers: {},
//     params: { ...query },
//   };


//   const fetchData = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.request(options);

//       // const data = await response.json();
//       setData(response.data.rows);
//       setIsLoading(false);
//     } catch (error) {496
//       setError(error);
//       console.log(error)
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => fetchData();

//   return { data, isLoading, error, refetch };
// };

// export const fetchPerkById = (endpoint, query) => {
//   const [data, setData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://api.perksmania.com/api/v1/perks/${endpoint}`,
//     headers: {},
//     params: { ...query },
//   };

//   const fetchData = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.request(options);

//       setData(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error);
//       console.log(error)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => fetchData();

//   return { data, isLoading, error, refetch };
// };

// api.js
import axios from 'axios';

const apiUrl = process.env.API_URL;

console.log(apiUrl)

// Create an instance of axios with base configuration
const api = axios.create({
  baseURL: apiUrl,  // Your base URL
  timeout: 10000,  // Optional timeout
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers you want
  },
});

export const fetchAllPerks = async () => {
  try {
    const response = await api.get('/perks');
    return response.data.rows;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};

// Function to make GET request by id
export const fetchPerkById = async (id) => {
  try {
    const response = await api.get('/perks/'+id);
    return response.data;

  } catch (error) {
    throw error;  // Propagate error to the caller
  }

};

// Function to make GET perks by merchant
export const fetchPerksByMerchantId = async (id) => {
  try {
    const response = await api.get('/perks/bymerchant/'+id);
    return response.data;
  } catch (error) {
    throw error;  // Propagate error to the caller
  }
};