// backend/scripts/addUser.js

require('dotenv').config();           // carrega variáveis do .env
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const User     = require('../src/models/User');  // ajuste o caminho se diferente

async function run() {
  try {
    // 1) Conectar ao MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    // 2) Definir os dados do novo usuário
    const name          = 'Giovanna Menezes';
    const email         = 'giovanna.menezes@example.com';
    const plainPassword = 'SenhaMuitoSegura!';
    const dateOfBirth   = new Date('2001-10-18');
    const termsAccepted = true;

    // 3) Fazer o hash da senha
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // 4) Criar e salvar o usuário
    const user = new User({
      name,
      email,
      password: passwordHash,
      dateOfBirth,
      termsAccepted
    });

    await user.save();
    console.log('✅ Usuário criado:', {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err);
  } finally {
    // 5) Desconectar do MongoDB
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

run();
