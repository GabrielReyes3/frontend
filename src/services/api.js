import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/auth', // Asegúrate de que la URL sea la correcta
    headers: { 'Content-Type': 'application/json' }
});

export default api;
