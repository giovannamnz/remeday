// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerLocal } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirm]     = useState('');
  const [dateOfBirth, setDateOfBirth]     = useState(''); // formato YYYY-MM-DD
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { setLogged } = useAuth();
  const navigate      = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // monta o payload
      const payload = {
        name,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        termsAccepted
      };

      // chama o serviço
      await registerLocal(payload);

      // atualiza contexto e vai pro dashboard
      setLogged(true);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao registrar';
      alert(msg);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text" placeholder="Qual o seu nome?"
        value={name} onChange={e => setName(e.target.value)} required
      />

      <input
        type="email" placeholder="E-mail"
        value={email} onChange={e => setEmail(e.target.value)} required
      />

      <input
        type="password" placeholder="Senha"
        value={password} onChange={e => setPassword(e.target.value)} required
      />

      <input
        type="password" placeholder="Confirme sua senha"
        value={confirmPassword}
        onChange={e => setConfirm(e.target.value)} required
      />

      <input
        type="date" placeholder="Data de nascimento"
        value={dateOfBirth}
        onChange={e => setDateOfBirth(e.target.value)} required
      />

      <label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={e => setTermsAccepted(e.target.checked)}
          required
        /> Eu concordo com os termos e políticas do REMEDAY
      </label>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
}
