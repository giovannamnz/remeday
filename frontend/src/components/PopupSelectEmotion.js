// -----Importações------
import React, { useState } from 'react';
import '../styles/components/PopupSelectEmotion.css';
import iconeFeliz from '../assets/images/icone_feliz.png';
import iconeNeutro from '../assets/images/icone_neutro.png';
import iconeTriste from '../assets/images/icone_triste.png';

// -----Componente Popup para Seleção de Emoção------
// Este componente exibe um popup com as opções de humor/emocional para o usuário escolher
function PopupSelecaoEmocao({ titulo, aoSelecionar, permitirDescricao = false }) {
  // -----Estados internos do popup------
  const [emocaoSelecionada, setEmocaoSelecionada] = useState('');
  const [descricaoEmocao, setDescricaoEmocao] = useState('');

  // -----Função ao clicar em uma emoção------
  const escolher = (emocao) => {
    setEmocaoSelecionada(emocao);
  };

  // -----Função ao clicar em confirmar------
  const confirmar = () => {
    // Se a descrição for permitida (ex: no caso de emoções do momento), envia os dois dados
    if (permitirDescricao) {
      aoSelecionar(emocaoSelecionada, descricaoEmocao);
    } else {
      aoSelecionar(emocaoSelecionada);
    }
  };

  return (
    <div className="popup-selecao">
      {/* Título do popup */}
      <h3>{titulo}</h3>

      {/* Ícones de emoção */}
      <div className="opcoes-emocao">
        <img src={iconeFeliz} alt="Feliz" onClick={() => escolher('feliz')} />
        <img src={iconeNeutro} alt="Neutro" onClick={() => escolher('neutro')} />
        <img src={iconeTriste} alt="Triste" onClick={() => escolher('triste')} />
      </div>

      {/* Campo de descrição opcional (aparece só se permitirDescricao for true) */}
      {permitirDescricao && (
        <textarea
          placeholder="Descreva sua emoção..."
          value={descricaoEmocao}
          onChange={(e) => setDescricaoEmocao(e.target.value)}
        />
      )}

      {/* Botão de confirmação */}
      <button onClick={confirmar}>Confirmar</button>
    </div>
  );
}

// -----Exportação do Componente------
export default PopupSelecaoEmocao;
