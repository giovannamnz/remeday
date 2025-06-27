import React from 'react';
import coracaoIcone from '../assets/images/coracao_icone.png';
import pessoasIcone from '../assets/images/pessoas_icone.png';
import pastaIcone from '../assets/images/pasta_icone.png';
import perfilIcone from '../assets/images/perfil_icone.png';
import '../styles/components/NavigationBar.css';

function BarraNavegacao({ nomeUsuario, redirecionarPara }) {
  return (
    <div className="barra-navegacao">
      <img src={coracaoIcone} alt="Acompanhamento" onClick={() => redirecionarPara('/acompanhamento')} />
      <img src={pessoasIcone} alt="Controle Emocional" onClick={() => redirecionarPara('/controle-emocional')} />
      <img src={pastaIcone} alt="Medicamentos" onClick={() => redirecionarPara('/medicamentos')} />
      <img src={perfilIcone} alt="Perfil" onClick={() => redirecionarPara('/perfil')} />
    </div>
  );
}

export default BarraNavegacao;
