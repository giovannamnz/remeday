// -----Importações de bibliotecas e componentes------
// Importa o React e as bibliotecas necessárias para rotas
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// -----Importação das páginas------
// Importa todas as páginas do projeto
import PaginaLogin from './pages/LoginPage';
import PaginaCadastro from './pages/RegisterPage';
import PaginaInicial from './pages/HomePage';
import PaginaControleEmocional from './pages/EmotionalControlPage';
import PaginaAdicionarMedicamento from './pages/MedicationAddPage';
import PaginaListaMedicamentos from './pages/MedicationListPage';
import PaginaAcompanhamento from './pages/FollowUpPage';
import PaginaPerfil from './pages/ProfilePage';
import PaginaDadosPessoais from './pages/PersonalDataPage';

// -----Componente principal da aplicação------
// Cria o componente App que controla toda a navegação entre as telas
function App() {
  
  // -----Estado do usuário logado------
  // Guarda o nome do usuário após o login ou cadastro
  const [usuario, setUsuario] = useState({ nome: '' });

  // -----Estado dos medicamentos do usuário------
  // Lista que armazena os medicamentos que o usuário adicionou
  const [medicamentos, setMedicamentos] = useState([]);

  // -----Função para adicionar um novo medicamento------
  // Atualiza a lista de medicamentos quando o usuário cadastra um novo
  const adicionarMedicamento = (med) => {
    setMedicamentos([...medicamentos, med]);
  };

  // -----Estrutura de Rotas------
  // Define todas as rotas (URLs) da aplicação e qual página renderizar para cada uma
  return (
    <Router>
      <Routes>
        {/* -----Rota para página de Login------ */}
        <Route path="/" element={<PaginaLogin setUsuario={setUsuario} />} />

        {/* -----Rota para página de Cadastro------ */}
        <Route path="/cadastro" element={<PaginaCadastro setUsuario={setUsuario} />} />

        {/* -----Rota para página Inicial/Home------ */}
        <Route path="/home" element={<PaginaInicial usuario={usuario} />} />

        {/* -----Rota para página de Controle Emocional------ */}
        <Route path="/controle-emocional" element={<PaginaControleEmocional usuario={usuario} />} />

        {/* -----Rota para página de Medicamentos------ */}
        <Route
          path="/medicamentos"
          element={
            medicamentos.length === 0 ? (
              <PaginaAdicionarMedicamento aoAdicionarMedicamento={adicionarMedicamento} />
            ) : (
              <PaginaListaMedicamentos listaMedicamentos={medicamentos} />
            )
          }
        />

        {/* -----Rota para adicionar medicamento manualmente------ */}
        <Route
          path="/adicionar-medicamento"
          element={<PaginaAdicionarMedicamento aoAdicionarMedicamento={adicionarMedicamento} />}
        />

        {/* -----Rota para página de Acompanhamento------ */}
        <Route path="/acompanhamento" element={<PaginaAcompanhamento listaMedicamentos={medicamentos} />} />

        {/* -----Rota para página de Perfil------ */}
        <Route path="/perfil" element={<PaginaPerfil />} />

        {/* -----Rota para página de Dados Pessoais------ */}
        <Route path="/dados-pessoais" element={<PaginaDadosPessoais />} />
      </Routes>
    </Router>
  );
}

// -----Exportação do App------
// Exporta o componente App para ser usado no index.js
export default App;
