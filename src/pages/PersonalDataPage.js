import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PersonalDataPage.css';
import perfilIcone from '../assets/images/perfil_icone.png';

function PaginaDadosPessoais() {
  const navegacao = useNavigate();
  const localizacao = useLocation();

  const dadosIniciais = localizacao.state?.usuario || {
    nome: 'Nome Exemplo',
    email: 'exemplo@email.com',
    dataNascimento: '01/01/2000',
    sexo: 'Masculino',
    senha: '*******',
  };

  const [dadosUsuario, setDadosUsuario] = useState(dadosIniciais);

  const alterarCampo = (campo) => {
    const novoValor = prompt(`Digite o novo valor para ${campo}:`, dadosUsuario[campo]);
    if (novoValor !== null && novoValor.trim() !== '') {
      setDadosUsuario({ ...dadosUsuario, [campo]: novoValor });
    }
  };

  return (
    <div className="container-dados-pessoais">
      <span className="botao-voltar" onClick={() => navegacao('/perfil')}>←</span>
      <h2>Dados Pessoais</h2>

      <img src={perfilIcone} alt="Foto de Perfil" className="foto-perfil" />
      <h3 className="nome-usuario">{dadosUsuario.nome}</h3>

      <div className="lista-campos">
        <div className="campo" onClick={() => alterarCampo('nome')}>
          <span>Nome</span>
          <span>{dadosUsuario.nome}</span>
        </div>

        <div className="campo" onClick={() => alterarCampo('email')}>
          <span>Email</span>
          <span>{dadosUsuario.email}</span>
        </div>

        <div className="campo" onClick={() => alterarCampo('dataNascimento')}>
          <span>Data de Nascimento</span>
          <span>{dadosUsuario.dataNascimento}</span>
        </div>

        <div className="campo" onClick={() => alterarCampo('sexo')}>
          <span>Sexo</span>
          <span>{dadosUsuario.sexo}</span>
        </div>

        <div className="campo" onClick={() => alterarCampo('senha')}>
          <span>Senha</span>
          <span>{dadosUsuario.senha}</span>
        </div>
      </div>
    </div>
  );
}

export default PaginaDadosPessoais;
