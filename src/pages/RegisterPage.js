// -----Importações------
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoTexto from '../components/InputField';
import BotaoPrincipal from '../components/Button';
import BotaoSocial from '../components/SocialButton';
import '../styles/RegisterPage.css';
import imagemLogo from '../assets/images/logo.png';

// -----Página de Cadastro------
function PaginaCadastro({ setUsuario }) {
  const navegacao = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [aceiteTermos, setAceiteTermos] = useState(false);

  // -----Função de cadastro------
  const aoClicarEmCadastrar = (e) => {
    e.preventDefault();
    if (!nome || !email || !senha || !confirmacaoSenha || !dataNascimento) {
      alert('Preencha todos os campos');
      return;
    }
    if (senha !== confirmacaoSenha) {
      alert('Senhas não coincidem');
      return;
    }
    if (!aceiteTermos) {
      alert('Aceite os termos');
      return;
    }
    setUsuario({ nome });
    navegacao('/home', { state: { nomeUsuario: nome } });
  };

  return (
    <div className="container-cadastro">
      <img src={imagemLogo} alt="Logo Remeday" className="logo-cadastro" />
      <h2 className="titulo-cadastro">Remeday</h2>
      <form className="formulario-cadastro" onSubmit={aoClicarEmCadastrar}>
        <CampoTexto tipo="text" placeholder="Qual o seu nome?" valor={nome} aoAlterar={(e) => setNome(e.target.value)} />
        <CampoTexto tipo="email" placeholder="E-mail" valor={email} aoAlterar={(e) => setEmail(e.target.value)} />
        <CampoTexto tipo="password" placeholder="Senha" valor={senha} aoAlterar={(e) => setSenha(e.target.value)} />
        <CampoTexto tipo="password" placeholder="Confirme sua senha" valor={confirmacaoSenha} aoAlterar={(e) => setConfirmacaoSenha(e.target.value)} />
        <CampoTexto tipo="date" placeholder="Data de nascimento" valor={dataNascimento} aoAlterar={(e) => setDataNascimento(e.target.value)} />

        <div className="checkbox-termos">
          <input type="checkbox" id="aceiteTermos" checked={aceiteTermos} onChange={(e) => setAceiteTermos(e.target.checked)} />
          <label htmlFor="aceiteTermos">Eu concordo com os termos e políticas do REMEDAY</label>
        </div>

        <div className="divisor"><hr /><span>ou</span><hr /></div>
        <BotaoSocial plataforma="google" texto="Continuar com Google" aoClicar={() => {}} />
        <BotaoSocial plataforma="apple" texto="Continuar com Apple" aoClicar={() => {}} />
        <BotaoPrincipal texto="Cadastrar-se" />
      </form>

      <p className="link-login">
        Já tem conta? <Link to="/">Faça o login</Link>
      </p>
    </div>
  );
}

export default PaginaCadastro;