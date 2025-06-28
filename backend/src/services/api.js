// src/services/api.js
import axios from 'axios';

// baseURL aponta para o seu backend
const api = axios.create({
  baseURL: 'http://localhost:4000',
});

// sempre que houver token no localStorage, adiciona no header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
