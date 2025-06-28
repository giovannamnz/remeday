// backend/src/config/db.js
const mongoose = require('mongoose');

module.exports = function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Falha na conexão:', err));
};
