const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { autenticarToken } = require('../middleware/authMiddleware');

// Utilitário para data e hora formatada
function log(msg) {
  const now = new Date().toLocaleString('pt-BR');
  console.log(`[${now}] ${msg}`);
}

// POST /login
router.post('/', async (req, res) => {
  const { email, senha } = req.body;
  log(`Requisição de login recebida. Email: ${email}`);

  if (!email || !senha) {
    log(`Erro: Email ou senha não fornecidos`);
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      log(`Erro: Usuário com email ${email} não encontrado`);
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const senhaValida = await usuario.verificarSenha(senha);
    if (!senhaValida) {
      log(`Erro: Senha inválida para o usuário ${email}`);
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    log(`Login bem-sucedido para o usuário ${email}. Token gerado.`);
    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (err) {
    log(`Erro interno ao processar login: ${err.message}`);
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

// GET /validate-token
router.get('/validate-token', autenticarToken, (req, res) => {
  log(`Token validado com sucesso para o usuário ${req.usuario?.email}`);
  res.status(200).json({ user: req.user });
});

module.exports = router;
