import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ProfilePage.css';
import perfilIcone from '../assets/images/perfil_icone.png';

function PaginaPerfil() {
  const navegacao = useNavigate();
  const localizacao = useLocation();
  const nomeUsuario = localizacao.state?.nomeUsuario || 'Usuário';

  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const alternarNotificacoes = () => {
    setNotificacoesAtivas(!notificacoesAtivas);
  };

  const irParaDadosPessoais = () => {
  navegacao('/dados-pessoais', { state: { usuario } });
  };

  return (
    <div className="container-perfil">
      <img src={perfilIcone} alt="Foto de Perfil" className="foto-perfil" />
      <h2 className="nome-usuario">{nomeUsuario}</h2>

      <div className="caixa-opcoes">
        <div className="opcao-linha" onClick={irParaDadosPessoais}>
          <span>Dados pessoais</span>
          <span className="seta">›</span>
        </div>

        <div className="opcao-linha">
          <span>Notificações</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notificacoesAtivas}
              onChange={alternarNotificacoes}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaginaPerfil;
