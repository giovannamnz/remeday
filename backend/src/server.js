// backend/src/server.js
require('dotenv').config();
const express    = require('express');
const session    = require('express-session');
const passport   = require('passport');
const cors       = require('cors');
const connectDB  = require('./config/db');
const authRoutes = require('./routes/auth');

// 1) Conecta ao MongoDB
connectDB();

// 2) Configura Passport (strategies)
require('./config/passport');

const app = express();

// 3) Middlewares
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'troque-isso',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 4) Rotas
app.use('/auth', authRoutes);

// 5) Inicia server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend rodando na porta ${PORT}`)  
);
