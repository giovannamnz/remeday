// backend/src/routes/auth.js
const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const passport= require('passport');
const User    = require('../models/User');

const router = express.Router();

// Registro local
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      termsAccepted
    } = req.body;

    if (!name || !email || !password || !confirmPassword || !dateOfBirth)
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'As senhas não coincidem' });

    if (!termsAccepted)
      return res.status(400).json({ error: 'Você deve aceitar os termos' });

    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'E-mail já cadastrado' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      dateOfBirth: new Date(dateOfBirth),
      termsAccepted
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Login local
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(401).json({ error: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Forgot password (exemplo simplificado)
router.post('/forgot-password', (req, res) => {
  // implementar envio de e-mail com token de recuperação...
  res.json({ msg: 'Link de recuperação enviado (implementação pendente)' });
});

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONT_URL}/oauth/callback?token=${token}`);
  }
);

// Apple OAuth
router.get('/apple',
  passport.authenticate('apple')
);
router.post('/apple/callback',
  passport.authenticate('apple', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONT_URL}/oauth/callback?token=${token}`);
  }
);

module.exports = router;
