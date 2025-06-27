// -----Importações------
import React from 'react';
import '../styles/components/MedicationSymptomCard.css';

// -----Componente de Sintomas de um Medicamento------
// Este componente exibe uma lista de sintomas que o usuário pode marcar/desmarcar
// Funciona como uma pequena aba que abre abaixo do medicamento selecionado
function CardSintomasMedicamento({ medicamento, sintomasSelecionados, aoMarcarSintoma }) {
  // -----Lista fixa de sintomas que o usuário pode escolher------
  const listaSintomas = ['Fadiga', 'Dor de cabeça', 'Tontura', 'Tosse', 'Hipotensão'];

  return (
    <div className="card-sintomas">
      {/* Mapeia e exibe cada sintoma */}
      {listaSintomas.map((sintoma, index) => (
        <div
          key={index}
          className={`sintoma-item ${sintomasSelecionados.includes(sintoma) ? 'marcado' : ''}`}
          onClick={() => aoMarcarSintoma(sintoma)}
        >
          {sintoma}
        </div>
      ))}
    </div>
  );
}

// -----Exportação do Componente------
export default CardSintomasMedicamento;
