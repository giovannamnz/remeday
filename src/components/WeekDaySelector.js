import React from 'react';
import '../styles/components/WeekDaySelector.css';

function SeletorDiasSemana({ dataAtual, aoSelecionarData }) {
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const gerarDias = () => {
    const dias = [];
    const hoje = new Date();
    for (let i = -3; i <= 3; i++) {
      const novaData = new Date(dataAtual);
      novaData.setDate(novaData.getDate() + i);
      dias.push(novaData);
    }
    return dias;
  };

  return (
    <div className="seletor-semana">
      {gerarDias().map((dia, index) => (
        <div
          key={index}
          className={`caixa-dia ${dia.toDateString() === dataAtual.toDateString() ? 'selecionado' : ''}`}
          onClick={() => aoSelecionarData(dia)}
        >
          {diasSemana[dia.getDay()]}
        </div>
      ))}
    </div>
  );
}

export default SeletorDiasSemana;