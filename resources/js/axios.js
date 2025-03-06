import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        'Content-Type': 'application/json', // Default header
    },
});

// Interceptor to add the token to the headers if it's available in localStorage
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle unauthorized requests (e.g., token expired or invalid)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the token is expired or invalid, clear the token and redirect to login
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
