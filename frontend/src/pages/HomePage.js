import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/HomePage.css';

function PaginaInicial() {
  const navegacao = useNavigate();
  const localizacao = useLocation();
  const nomeUsuario = localizacao.state?.nomeUsuario || 'Usuário';

  const redirecionarPara = (rota) => {
    navegacao(rota);
  };

  return (
    <div className="container-home">
      <h2 className="saudacao-home">Bem-vindo(a), <span>{nomeUsuario}</span></h2>

      <div className="caixa-opcao" onClick={() => redirecionarPara('/acompanhamento')}>
        Acompanhamento
      </div>

      <div className="caixa-opcao" onClick={() => redirecionarPara('/controle-emocional')}>
        Controle Emocional
      </div>

      <div className="caixa-opcao" onClick={() => redirecionarPara('/medicamentos')}>
        Medicamentos
      </div>

      <NavigationBar nomeUsuario={nomeUsuario} redirecionarPara={redirecionarPara} />
    </div>
  );
}

export default PaginaInicial;
