import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeekDaySelector from '../components/WeekDaySelector';
import MedicationSymptomCard from '../components/MedicationSymptomCard';
import '../styles/FollowUpPage.css';

function PaginaAcompanhamento({ listaMedicamentos }) {
  const navegacao = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [medicamentoAberto, setMedicamentoAberto] = useState(null);
  const [sintomasMarcados, setSintomasMarcados] = useState({});

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  };

  const aoSelecionarSintoma = (medicamento, sintoma) => {
    const sintomasAtuais = sintomasMarcados[medicamento] || [];
    if (sintomasAtuais.includes(sintoma)) {
      setSintomasMarcados({
        ...sintomasMarcados,
        [medicamento]: sintomasAtuais.filter(s => s !== sintoma)
      });
    } else {
      setSintomasMarcados({
        ...sintomasMarcados,
        [medicamento]: [...sintomasAtuais, sintoma]
      });
    }
  };

  return (
    <div className="container-acompanhamento">
      <span className="botao-voltar" onClick={() => navegacao('/home')}>←</span>
      <h2>Acompanhamento</h2>
      <p className="data-selecionada">Hoje, {formatarData(dataSelecionada)}</p>

      <WeekDaySelector dataAtual={dataSelecionada} aoSelecionarData={setDataSelecionada} />

      <h3>Remédios</h3>

      <div className="lista-medicamentos">
        {listaMedicamentos.map((med, index) => (
          <div key={index}>
            <div
              className="bloco-medicamento"
              onClick={() => setMedicamentoAberto(medicamentoAberto === index ? null : index)}
            >
              <p>{med.nome}</p>
              <span>{med.horarios.join(', ')}</span>
            </div>

            {medicamentoAberto === index && (
              <MedicationSymptomCard
                medicamento={med.nome}
                sintomasSelecionados={sintomasMarcados[med.nome] || []}
                aoMarcarSintoma={(sintoma) => aoSelecionarSintoma(med.nome, sintoma)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaAcompanhamento;
