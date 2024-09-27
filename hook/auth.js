import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an instance of axios with base configuration
const api = axios.create({
    baseURL: 'https://api.perksmania.com/api/v1/',  // Your base URL
    timeout: 10000,  // Optional timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to save token in AsyncStorage
const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        console.error('Error saving token to AsyncStorage:', error);
    }
};

// Function to get token from AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token ? JSON.parse(token) : null;
    } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
        return null;
    }
};

// Sign In Function using AES Encryption
export const signIn = async (email, password) => {
    const passphraseEmail = 'L#G@LR#GYSTRY';
    const passphrasePass = 'L#G@LR#GYSTRY!!!';
    const encryptEmail = CryptoJS.AES.encrypt(email, passphraseEmail).toString();
    const encryptPass = CryptoJS.AES.encrypt(password, passphrasePass).toString();
    
    try {
        const response = await api.post('customers/login', {
            client: encryptEmail,
            secret: encryptPass
        });

        const token = response.data;

        // Log the received token for debugging
        console.log('Token received:', token);

        if (token.accessToken) {
            // Save token in AsyncStorage
            await setToken(token);
        }
        return response;
    } catch (error) {
        console.error('Error during sign-in:', error.response?.data || error.message);
        throw error;  // Propagate error to the caller
    }
};

// Fetch the current user's profile after login
export const getCurrentUser = async () => {
    try {
        // Get the stored token from AsyncStorage
        const token = await getToken();
        
        if (!token || !token.accessToken) {
            throw new Error('No access token found. Please log in.');
        }

        // Use the token in the Authorization header to fetch user data
        const response = await api.get('customers/getuser', {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            },
        });

        const account = response.data;

        // Log user account info for debugging
        console.log('User account:', account);

        // Save the user account to AsyncStorage or handle it as needed
        await AsyncStorage.setItem('loginUser', JSON.stringify(account));

        return account;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        throw error;
    }
};
