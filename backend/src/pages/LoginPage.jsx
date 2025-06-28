import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginLocal, getGoogleAuthUrl, getAppleAuthUrl } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLogged } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await loginLocal(email, password);
      setLogged(true);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao logar');
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="email" placeholder="E-mail ou nome de usuário"
          value={email} onChange={e => setEmail(e.target.value)} required
        />
        <input
          type="password" placeholder="Senha"
          value={password} onChange={e => setPassword(e.target.value)} required
        />
        <button type="submit">Fazer login</button>
      </form>

      <a href={getGoogleAuthUrl()}>
        <button className="btn-google">Continuar com Google</button>
      </a>
      <a href={getAppleAuthUrl()}>
        <button className="btn-apple">Continuar com Apple</button>
      </a>

      <p>Esqueceu a senha? <a href="/forgot-password">Clique aqui</a></p>
      <p>Não tem conta? <a href="/register">Cadastre-se</a></p>
    </div>
  );
}
