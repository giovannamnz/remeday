import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MedicationCard from '../components/MedicationCard';
import '../styles/MedicationListPage.css';

function PaginaListaMedicamentos({ listaMedicamentos }) {
  const navegacao = useNavigate();
  const [busca, setBusca] = useState('');

  const medicamentosFiltrados = listaMedicamentos.filter((med) =>
    med.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container-lista-medicamentos">
      <span className="botao-voltar" onClick={() => navegacao('/home')}>←</span>
      <h2>Medicamentos</h2>

      <div className="caixa-configure">
        <p>Configure seus Medicamentos</p>
        <p>Adicione os medicamentos que precisa, os controle e defina lembretes de horários por aqui</p>

        <button onClick={() => navegacao('/buscar')}>Buscar</button>
        <button onClick={() => navegacao('/adicionar-medicamento')}>Adicionar Manualmente</button>
      </div>

      <div className="lista-cards">
        {medicamentosFiltrados.map((med, index) => (
          <MedicationCard key={index} medicamento={med} />
        ))}
      </div>
    </div>
  );
}

export default PaginaListaMedicamentos;
