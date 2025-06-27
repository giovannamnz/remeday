import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MedicationAddPage.css';
import iconeMedicamento from '../assets/images/icone_medicamento.png';

function PaginaAdicionarMedicamento({ aoAdicionarMedicamento }) {
  const navegacao = useNavigate();

  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [textoHorario, setTextoHorario] = useState('');

  const aoPressionarEnter = (e, campo) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (campo === 'horario' && textoHorario.trim() !== '') {
        let texto = textoHorario.trim().padStart(4, '0');
        const horas = texto.substring(0, 2);
        const minutos = texto.substring(2, 4);
        setHorarios([...horarios, `${horas}:${minutos}`]);
        setTextoHorario('');
      }
    }
  };

  const confirmarCadastro = () => {
    if (nomeMedicamento && intensidade && frequencia && horarios.length > 0) {
      aoAdicionarMedicamento({
        nome: nomeMedicamento,
        intensidade,
        frequencia,
        horarios
      });
      navegacao('/medicamentos');
    } else {
      alert('Preencha todos os campos antes de adicionar.');
    }
  };

  return (
    <div className="container-adicionar-medicamento">
      <img src={iconeMedicamento} alt="Ícone Medicamento" className="icone-medicamento" />
      <h2>Adicione Medicamento</h2>

      <div className="campo-editar">
        <p>Nome</p>
        <input
          type="text"
          value={nomeMedicamento}
          onChange={(e) => setNomeMedicamento(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          placeholder="Digite o nome e pressione Enter"
        />
      </div>

      <div className="campo-editar">
        <p>Intensidade</p>
        <input
          type="number"
          value={intensidade}
          min="10"
          max="200"
          onChange={(e) => setIntensidade(e.target.value)}
          placeholder="Digite um número (10 a 200)"
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        />
      </div>

      <div className="campo-editar">
        <p>Quando você tomará?</p>
        <input
          type="text"
          value={frequencia}
          onChange={(e) => setFrequencia(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          placeholder="Digite a frequência e pressione Enter"
        />
      </div>

      <div className="campo-editar">
        <p>Horários</p>
        <div className="lista-horarios">
          {horarios.map((h, index) => (
            <div key={index} className="item-horario">{h}</div>
          ))}
        </div>

        <input
          type="text"
          value={textoHorario}
          onChange={(e) => setTextoHorario(e.target.value)}
          placeholder="Digite um horário (Ex: 0900 → 09:00)"
          onKeyDown={(e) => aoPressionarEnter(e, 'horario')}
        />
      </div>

      <button className="botao-adicionar" onClick={confirmarCadastro}>
        Adicionar
      </button>
    </div>
  );
}

export default PaginaAdicionarMedicamento;
