// -----Importações------
import React from 'react';
import '../styles/components/MedicationCard.css';

// -----Componente Card de Medicamento------
// Este componente exibe as informações principais de um medicamento na lista de medicamentos
function CardMedicamento({ medicamento }) {
  return (
    <div className="card-medicamento">
      {/* Nome do medicamento */}
      <h3>{medicamento.nome}</h3>

      {/* Intensidade do medicamento */}
      <p>Intensidade: {medicamento.intensidade}</p>

      {/* Frequência de uso */}
      <p>Frequência: {medicamento.frequencia}</p>

      {/* Horários de administração */}
      <p>Horários: {medicamento.horarios.join(', ')}</p>
    </div>
  );
}

// -----Exportação do Componente------
export default CardMedicamento;
