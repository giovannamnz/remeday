import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupSelecaoEmocao from '../components/PopupSelectEmotion';
import '../styles/EmotionalControlPage.css';
import iconeFeliz from '../assets/images/icone_feliz.png';
import iconeNeutro from '../assets/images/icone_neutro.png';
import iconeTriste from '../assets/images/icone_triste.png';

function PaginaControleEmocional() {
  const navegacao = useNavigate();

  const [dataAtual, setDataAtual] = useState(new Date());
  const [humorDoDia, setHumorDoDia] = useState(null);
  const [descricaoHumor, setDescricaoHumor] = useState('');
  const [mostrarPopupHumor, setMostrarPopupHumor] = useState(false);
  const [mostrarPopupEmocao, setMostrarPopupEmocao] = useState(false);
  const [listaEmocoes, setListaEmocoes] = useState([]);

  const listaIcones = {
    feliz: iconeFeliz,
    neutro: iconeNeutro,
    triste: iconeTriste,
  };

  const avancarDia = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() + 1);
    setDataAtual(novaData);
  };

  const voltarDia = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() - 1);
    setDataAtual(novaData);
  };

  const selecionarHumorDoDia = (humorSelecionado) => {
    setHumorDoDia(humorSelecionado);
    setMostrarPopupHumor(false);
  };

  const selecionarEmocaoDoMomento = (emocaoSelecionada, descricaoEmocao) => {
    const novaEmocao = {
      icone: listaIcones[emocaoSelecionada],
      descricao: descricaoEmocao,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setListaEmocoes([...listaEmocoes, novaEmocao]);
    setMostrarPopupEmocao(false);
  };

  useEffect(() => {
    if (!humorDoDia) {
      setMostrarPopupHumor(true);
    }
  }, [dataAtual]);

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  return (
    <div className="container-controle-emocional">
      <div className="topo-pagina">
        <span className="botao-voltar" onClick={() => navegacao('/home')}>←</span>
        <h2>Controle Emocional</h2>
      </div>

      <p className="data-hoje">{formatarData(dataAtual)}</p>

      <div className="bloco-humor-dia">
        <div className="botao-dia-anterior" onClick={voltarDia}></div>

        <div className="caixa-humor">
          {humorDoDia && (
            <>
              <img src={listaIcones[humorDoDia]} alt="Humor do dia" className="icone-humor" />
              <p className="texto-humor">
                {humorDoDia === 'feliz' && 'Feliz'}
                {humorDoDia === 'neutro' && 'Neutro'}
                {humorDoDia === 'triste' && 'Triste'}
              </p>
              <textarea
                placeholder="Descreva seu humor..."
                value={descricaoHumor}
                onChange={(e) => setDescricaoHumor(e.target.value)}
                className="campo-descricao-humor"
              />
            </>
          )}
        </div>

        <div className="espaco-direita"></div>
      </div>

      <div className="lista-emocoes">
        {listaEmocoes.map((emocao, index) => (
          <div key={index} className="item-emocao">
            <img src={emocao.icone} alt="Emoção" className="icone-emocao" />
            <span>{emocao.descricao}</span>
            <span className="horario-emocao">{emocao.horario}</span>
          </div>
        ))}
      </div>

      <button className="botao-registrar" onClick={() => setMostrarPopupEmocao(true)}>
        Registrar
      </button>

      {mostrarPopupHumor && (
        <PopupSelecaoEmocao
          titulo="Como está seu humor hoje?"
          aoSelecionar={(emocao) => selecionarHumorDoDia(emocao)}
        />
      )}

      {mostrarPopupEmocao && (
        <PopupSelecaoEmocao
          titulo="Qual a sua emoção do momento?"
          permitirDescricao
          aoSelecionar={(emocao, descricao) => selecionarEmocaoDoMomento(emocao, descricao)}
        />
      )}
    </div>
  );
}

export default PaginaControleEmocional;
