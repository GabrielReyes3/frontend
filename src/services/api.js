import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server2-no-rate-limit.onrender.com/api/auth', // Asegúrate de que la URL sea la correcta
    headers: { 'Content-Type': 'application/json' }
});

export default api;
