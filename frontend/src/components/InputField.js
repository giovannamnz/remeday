
import React from 'react';
import '../styles/components/InputField.css';

function CampoTexto({ tipo, placeholder, valor, aoAlterar }) {
  return (
    <input
      type={tipo}
      placeholder={placeholder}
      value={valor}
      onChange={aoAlterar}
      className="campo-texto"
    />
  );
}

export default CampoTexto;
