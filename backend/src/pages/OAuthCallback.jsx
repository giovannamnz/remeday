// src/pages/OAuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from '../contexts/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setLogged } = useAuth();
  const { search } = useLocation();

  useEffect(() => {
    const { token } = queryString.parse(search);
    if (token) {
      localStorage.setItem('remeday_token', token);
      setLogged(true);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [search, setLogged, navigate]);

  return <p>Finalizando autenticação…</p>;
}
