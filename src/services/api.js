import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server1-rate-limit-xrz4.onrender.com/api/auth/',
    headers: { 'Content-Type': 'application/json' }
});

export default api;
