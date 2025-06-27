// -----Importações------
// Importa React, useState, useNavigate e os componentes usados na página de Login
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoTexto from '../components/InputField';
import BotaoPrincipal from '../components/Button';
import BotaoSocial from '../components/SocialButton';
import '../styles/LoginPage.css';
import imagemLogo from '../assets/images/logo.png';

// -----Componente da Página de Login------
function PaginaLogin({ setUsuario }) {
  const navegacao = useNavigate();
  const [emailOuUsuario, setEmailOuUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // -----Função para lidar com o login------
  const aoClicarEmLogin = (e) => {
    e.preventDefault();

    if (!emailOuUsuario || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    setUsuario({ nome: emailOuUsuario });
    navegacao('/home', { state: { nomeUsuario: emailOuUsuario } });
  };

  // -----Renderização da página------
  return (
    <div className="login-container">
      <img src={imagemLogo} alt="Logo" className="login-logo" />
      <h2 className="login-title">Remeday</h2>

      <form className="login-form" onSubmit={aoClicarEmLogin}>
        <CampoTexto tipo="text" placeholder="E-mail ou nome de usuário" valor={emailOuUsuario} aoAlterar={(e) => setEmailOuUsuario(e.target.value)} />
        <CampoTexto tipo="password" placeholder="Senha" valor={senha} aoAlterar={(e) => setSenha(e.target.value)} />
        <Link to="#" className="forgot-password">Esqueceu a senha?</Link>

        {/* Botões sociais e principal */}
        <BotaoSocial plataforma="google" texto="Continuar com Google" aoClicar={() => {}} />
        <BotaoSocial plataforma="apple" texto="Continuar com Apple" aoClicar={() => {}} />
        <BotaoPrincipal texto="Fazer login" />
      </form>

      <p className="signup-link">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default PaginaLogin;
