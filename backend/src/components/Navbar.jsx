// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();            // limpa token e atualiza contexto
    navigate('/login');  // redireciona para a página de login
  }

  return (
    <nav className="navbar">
      {/* outros links/menu */}
      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>
    </nav>
  );
}
