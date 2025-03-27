/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_TMK_GATEWAY_URL });
// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401 && !window.location.href.includes('/login')) {
                window.location.pathname = '/pages/error';
            }
            console.error('Gateway Error:', {
                status: error.response.status,
                data: error.response.data,
                config: error.config
            });
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
            return Promise.reject({ message: 'No response from server. Please check your connection.' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

export default axiosServices;
