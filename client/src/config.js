const isProduction = import.meta.env.MODE === 'production';

export const API_BASE_URL = isProduction
    ? '/api' // On Vercel, requests to /api are proxied to the backend
    : 'http://localhost:5000/api';
