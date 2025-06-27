
import React from 'react';
import '../styles/components/Button.css';

function BotaoPrincipal({ texto, aoClicar }) {
  return (
    <button className="botao-principal" onClick={aoClicar}>
      {texto}
    </button>
  );
}

export default BotaoPrincipal;
