// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { logged } = useAuth();
  return logged ? <Outlet /> : <Navigate to="/login" replace />;
}
