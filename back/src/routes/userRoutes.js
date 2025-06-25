const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const { autenticarToken, autorizarRoles } = require('../middleware/authMiddleware');

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
    const novoUsuario = new User({
      nome: req.body.nome,
      email: req.body.email,
      senha: senhaCriptografada,
      role: 'user'
    });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
});

// GET /users - listar todos os usuários (somente admin)
router.get('/', autenticarToken, autorizarRoles('admin'), async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha'); // Remove o campo senha da resposta
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// GET /users/email - buscar um usuário por e-mail (somente admin)
router.get('/:email', autenticarToken, autorizarRoles('admin'), async (req, res) => {
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

// PUT /users/:id/nome - atualizar o nome do usuário (somente o próprio usuário)
router.put('/:id/nome', autenticarToken, async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório.' });

    if (req.usuario.id !== req.params.id) {
      return res.status(403).json({ message: 'Você só pode editar seu próprio nome.' });
    }

    const usuario = await User.findByIdAndUpdate(req.params.id, { nome }, { new: true }).select('-senha');
    res.status(200).json({ message: 'Nome atualizado com sucesso.', usuario });

  } catch (err) {
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
      return res.status(403).json({ message: 'Você só pode alterar sua própria senha.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await User.findByIdAndUpdate(req.params.id, { senha: senhaCriptografada });

    res.status(200).json({ message: 'Senha atualizada com sucesso.' });

  } catch (err) {
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
    res.status(200).json({ message: 'Role atualizada com sucesso.', usuario });

  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar role.' });
  }
});

// DELETE /users/:id - deletar um usuário (somente o próprio usuário ou admin)
router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.usuario.id !== id && req.usuario.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });

  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
});

module.exports = router;
