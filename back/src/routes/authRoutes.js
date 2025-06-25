const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// POST /login
router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const senhaValida = await usuario.verificarSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Gera o token JWT
    const token = jwt.sign(
        { id: usuario._id, email: usuario.email, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

module.exports = router;
