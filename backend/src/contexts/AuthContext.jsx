import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(isAuthenticated());

  // Escuta mudanças no localStorage (em callbacks)
  useEffect(() => {
    const onStorage = () => setLogged(isAuthenticated());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ logged, setLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de uso fácil
export function useAuth() {
  return useContext(AuthContext);
}
