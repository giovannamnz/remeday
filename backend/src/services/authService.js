// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'remeday_token';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Envia todos os campos do formulário de registro
 * @param {{ name:string, email:string, password:string, confirmPassword:string, dateOfBirth:string, termsAccepted:boolean }} data 
 */
export async function registerLocal(data) {
  const res = await api.post('/auth/register', data);
  // grava token e retorna dados
  localStorage.setItem(TOKEN_KEY, res.data.token);
  return res.data;
}

export async function loginLocal(email, password) { /* ... */ }
export function logout() { /* ... */ }
export function isAuthenticated() { /* ... */ }
export function getGoogleAuthUrl() { /* ... */ }
export function getAppleAuthUrl() { /* ... */ }

export default api;
