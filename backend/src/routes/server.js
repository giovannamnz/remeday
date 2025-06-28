const express = require('express');
const connectDB = require('../config/db');
 // Caminho para o db.js
const cors = require('cors');

const app = express();

// Conectar ao banco de dados MongoDB
connectDB();

// Configurar o middleware
app.use(cors());
app.use(express.json());

// Defina suas rotas
const authRoutes = require('./auth');
app.use('/api/auth', authRoutes);

// Defina a porta para o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
