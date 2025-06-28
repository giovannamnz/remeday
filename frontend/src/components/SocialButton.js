import React from 'react';
import '../styles/components/SocialButton.css';

function BotaoSocial({ plataforma, texto, aoClicar }) {
  return (
    <button className={`botao-social ${plataforma}`} onClick={aoClicar}>
      {texto}
    </button>
  );
}

export default BotaoSocial;
