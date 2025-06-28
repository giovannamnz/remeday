// -----Importações------
import React, { useState } from 'react';
import '../styles/components/PopupRegisterEmotion.css';
import iconeFeliz from '../assets/images/icone_feliz.png';
import iconeNeutro from '../assets/images/icone_neutro.png';
import iconeTriste from '../assets/images/icone_triste.png';
import iconeLevementeTriste from '../assets/images/icone_levemente_triste.png';
import iconeMuitoFeliz from '../assets/images/icone_muito_feliz.png';

// -----Componente Popup de Registro de Emoções------
// Este popup permite o usuário selecionar emoções e adicionar palavras-chave para o Humor do Dia e Humor do Momento
function PopupRegistroEmocao({ aoFinalizar }) {
  // -----Estados internos para o popup------
  const [emocaoSelecionada, setEmocaoSelecionada] = useState('');
  const [palavrasChaveDia, setPalavrasChaveDia] = useState([]);
  const [palavrasChaveMomento, setPalavrasChaveMomento] = useState([]);
  const [textoAtual, setTextoAtual] = useState('');
  const [campoSelecionado, setCampoSelecionado] = useState('');

  // -----Função para selecionar a emoção clicando nos ícones------
  const escolherEmocao = (emocao) => {
    setEmocaoSelecionada(emocao);
  };

  // -----Função que lida com Enter para adicionar palavra-chave------
  const aoPressionarEnter = (e) => {
    if (e.key === 'Enter' && textoAtual.trim() !== '') {
      e.preventDefault();
      if (campoSelecionado === 'dia') {
        setPalavrasChaveDia([...palavrasChaveDia, textoAtual.trim()]);
      } else if (campoSelecionado === 'momento') {
        setPalavrasChaveMomento([...palavrasChaveMomento, textoAtual.trim()]);
      }
      setTextoAtual('');
    }
  };

  // -----Função para finalizar o registro e enviar os dados para o componente pai------
  const confirmarRegistro = () => {
    aoFinalizar({
      emocaoSelecionada,
      palavrasDia: palavrasChaveDia,
      palavrasMomento: palavrasChaveMomento,
    });
  };

  return (
    <div className="popup-registro-emocao">
      {/* Título do popup */}
      <h3>Registre o que está sentindo</h3>

      {/* Ícones de emoções */}
      <div className="icones-emocao">
        <img src={iconeTriste} alt="Triste" onClick={() => escolherEmocao('triste')} />
        <img src={iconeLevementeTriste} alt="Levemente Desagradável" onClick={() => escolherEmocao('levemente-desagradavel')} />
        <img src={iconeNeutro} alt="Neutro" onClick={() => escolherEmocao('neutro')} />
        <img src={iconeFeliz} alt="Feliz" onClick={() => escolherEmocao('feliz')} />
        <img src={iconeMuitoFeliz} alt="Muito Feliz" onClick={() => escolherEmocao('muito-feliz')} />
      </div>

      {/* Caixa para Humor do Dia */}
      <div
        className={`caixa-input ${campoSelecionado === 'dia' ? 'selecionado' : ''}`}
        onClick={() => setCampoSelecionado('dia')}
      >
        <p>Registre seu humor do dia</p>
        <span>Durante o dia</span>

        {/* Campo de texto para adicionar palavras-chave */}
        {campoSelecionado === 'dia' && (
          <input
            type="text"
            placeholder="Digite e pressione Enter"
            value={textoAtual}
            onChange={(e) => setTextoAtual(e.target.value)}
            onKeyDown={aoPressionarEnter}
          />
        )}

        {/* Exibição das palavras já adicionadas */}
        <div className="palavras-chave">
          {palavrasChaveDia.map((palavra, index) => (
            <span key={index} className="chip-palavra">{palavra}</span>
          ))}
        </div>
      </div>

      {/* Caixa para Humor do Momento */}
      <div
        className={`caixa-input ${campoSelecionado === 'momento' ? 'selecionado' : ''}`}
        onClick={() => setCampoSelecionado('momento')}
      >
        <p>Registre seu humor do momento</p>
        <span>Exemplo: 12:00</span>

        {/* Campo de texto para adicionar palavras-chave */}
        {campoSelecionado === 'momento' && (
          <input
            type="text"
            placeholder="Digite e pressione Enter"
            value={textoAtual}
            onChange={(e) => setTextoAtual(e.target.value)}
            onKeyDown={aoPressionarEnter}
          />
        )}

        {/* Exibição das palavras já adicionadas */}
        <div className="palavras-chave">
          {palavrasChaveMomento.map((palavra, index) => (
            <span key={index} className="chip-palavra">{palavra}</span>
          ))}
        </div>
      </div>

      {/* Botão para confirmar o registro */}
      <button className="botao-confirmar" onClick={confirmarRegistro}>
        Confirmar Registro
      </button>
    </div>
  );
}

// -----Exportação do Componente------
export default PopupRegistroEmocao;
