// -----Importações principais------
// Importa React, ReactDOM e o componente App
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// -----Renderização principal------
// Cria a raiz da aplicação React e renderiza o App dentro da div root no index.html
const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
