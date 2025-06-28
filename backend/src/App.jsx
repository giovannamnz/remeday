import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import OAuthCallback from './pages/OAuthCallback';
import Dashboard     from './pages/Dashboard';
import Profile       from './pages/Profile';
import PrivateRoute  from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile"   element={<Profile />} />
        {/* Adicione aqui outras páginas privadas */}
      </Route>

      {/* Catch-all: se não casar nenhuma rota, vai para /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
