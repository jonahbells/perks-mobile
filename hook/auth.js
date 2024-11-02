import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

// Create an instance of axios with base configuration
const api = axios.create({
    baseURL: API_URL,  // Your base URL
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
        console.log(token)
        return token ? JSON.parse(token) : null;
    } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
        return null;
    }
};

export const signOut = async () => {
    AsyncStorage.multiRemove(['token'])
};

// Sign In Function using AES Encryption
export const signIn = async (email, password) => {
    const passphraseEmail = 'L#G@LR#GYSTRY';
    const passphrasePass = 'L#G@LR#GYSTRY!!!';
    const encryptEmail = CryptoJS.AES.encrypt(email, passphraseEmail).toString();
    const encryptPass = CryptoJS.AES.encrypt(password, passphrasePass).toString();
    
    try {
        const response = await api.post('/customers/login', {
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

// Sign In Function using AES Encryption
export const signUp = async (form) => {
    console.log('Form before encryption:', form);

    const passphrase = 'L#G@LR#GYSTRY';

    // Convert the form object to a JSON string before encryption
    const formString = JSON.stringify(form);

    // Encrypt the JSON string
    const encryptForm = CryptoJS.AES.encrypt(formString, passphrase).toString();

    console.log('Encrypted form:', encryptForm);
    
    try {
        // Send the encrypted form as part of the request
        const response = await api.post('customers', {
            aparam: encryptForm
        });
        
        console.log('Server response:', response);
        return response;
    } catch (error) {
        console.error('Error during sign-up:', error.response?.data || error.message);
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
        const response = await api.get('/customers/getuser', {
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

// Sign In Function using AES Encryption
export const signWithGoogle = async (session) => {
    console.log('session:', session);
    
    try {
        // Send the encrypted form as part of the request
        const response = await api.post('gmail', {
            sessionToken: session
        });
        
        console.log('Server response:', response);
        return response;
    } catch (error) {
        console.error('Error during sign-up:', error.response?.data || error.message);
        throw error;  // Propagate error to the caller
    }
};


