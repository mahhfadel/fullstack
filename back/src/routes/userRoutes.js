const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // lembre-se de importar o bcrypt
const User = require('../models/UserModel');
const { autenticarToken, autorizarRoles } = require('../middleware/authMiddleware');

// Função simples para logs com data/hora
function log(msg) {
  console.log(`[${new Date().toLocaleString()}] ${msg}`);
}

// POST /users - criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome) return res.status(400).json({ message: 'É necessário informar o nome.' });
    if (!email) return res.status(400).json({ message: 'É necessário informar o email.' });
    if (!senha) return res.status(400).json({ message: 'É necessário informar a senha.' });

    log(`Tentando criar usuário: ${email}`);

    const existe = await User.findOne({ email });
    if (existe) {
      log(`Falha ao criar usuário: email ${email} já existe.`);
      return res.status(400).json({ message: 'Usuário já existe com esse e-mail.' });
    }

    // Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      role: 'user',
    });

    await novoUsuario.save();

    log(`Usuário criado com sucesso: ${email}`);
    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    log(`Erro ao criar usuário: ${error.message}`);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

// GET /users - listar todos os usuários (somente admin)
router.get('/', autenticarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    log(`Usuário ${req.usuario.email} requisitou lista de usuários`);
    const usuarios = await User.find()// remove senha
    res.status(200).json(usuarios);
  } catch (err) {
    log(`Erro ao buscar usuários: ${err.message}`);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// GET /users/:email - buscar um usuário por e-mail (somente admin)
router.get('/:email', autenticarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    const { email } = req.params;
    log(`Usuário ${req.usuario.email} buscando usuário por email: ${email}`);

    const usuario = await User.findOne({ email }).select('-senha');

    if (!usuario) {
      log(`Usuário com email ${email} não encontrado`);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    log(`Erro ao buscar usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

// PUT /users/:id/nome - atualizar o nome do usuário (somente o próprio usuário)
router.put('/:id/nome', autenticarToken, async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório.' });

    if (req.usuario.id !== req.params.id) {
      log(`Usuário ${req.usuario.email} tentou alterar nome de outro usuário`);
      return res.status(403).json({ message: 'Você só pode editar seu próprio nome.' });
    }

    const usuario = await User.findByIdAndUpdate(req.params.id, { nome }, { new: true }).select('-senha');
    log(`Nome atualizado para o usuário ${req.usuario.email}`);
    res.status(200).json({ message: 'Nome atualizado com sucesso.', usuario });

  } catch (err) {
    log(`Erro ao atualizar nome: ${err.message}`);
    res.status(500).json({ message: 'Erro ao atualizar nome.' });
  }
});

// PUT /users/:id/senha - atualizar a senha do usuário (somente o próprio usuário)
router.put('/:id/senha', autenticarToken, async (req, res) => {
  try {
    const { senha } = req.body;
    if (!senha || senha.length < 6) {
      return res.status(400).json({ message: 'Senha deve ter no mínimo 6 caracteres.' });
    }

    if (req.usuario.id !== req.params.id) {
      log(`Usuário ${req.usuario.email} tentou alterar senha de outro usuário`);
      return res.status(403).json({ message: 'Você só pode alterar sua própria senha.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await User.findByIdAndUpdate(req.params.id, { senha: senhaCriptografada });

    log(`Senha atualizada para o usuário ${req.usuario.email}`);
    res.status(200).json({ message: 'Senha atualizada com sucesso.' });

  } catch (err) {
    log(`Erro ao atualizar senha: ${err.message}`);
    res.status(500).json({ message: 'Erro ao atualizar senha.' });
  }
});

// PUT /users/:id/role - atualizar o papel do usuário (admin/user) (somente admin)
router.put('/:id/role', autenticarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Role inválida. Use "admin" ou "user".' });
    }

    const usuario = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-senha');
    log(`Role atualizada para ${role} no usuário ${usuario.email} pelo admin ${req.usuario.email}`);
    res.status(200).json({ message: 'Role atualizada com sucesso.', usuario });

  } catch (err) {
    log(`Erro ao atualizar role: ${err.message}`);
    res.status(500).json({ message: 'Erro ao atualizar role.' });
  }
});

// DELETE /users/:id - deletar um usuário (somente o próprio usuário ou admin)
router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.usuario.id !== id && req.usuario.role !== 'admin') {
      log(`Usuário ${req.usuario.email} tentou deletar usuário ${id} sem permissão`);
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    await User.findByIdAndDelete(id);
    log(`Usuário ${id} deletado pelo usuário ${req.usuario.email}`);
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });

  } catch (err) {
    log(`Erro ao deletar usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;
