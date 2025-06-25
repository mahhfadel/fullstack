const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// POST /users - criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica campo nome
    if (!nome) {
      return res.status(400).json({ message: 'É necessário informar o nome.' });
    }
    
    // Verifica campo email
    if (!email) {
      return res.status(400).json({ message: 'É necessário informar o email.' });
    }

    // Verifica campo senha
    if (!senha) {
      return res.status(400).json({ message: 'É necessário informar a senha.' });
    }

    // Verifica se o email já existe
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: 'Usuário já existe com esse e-mail.' });
    }

    // Cria o usuário
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

// GET /users - listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha'); // Remove o campo senha da resposta
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// GET /users/email - buscar um usuário por e-mail
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const usuario = await User.findOne({ email }).select('-senha');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

module.exports = router;
