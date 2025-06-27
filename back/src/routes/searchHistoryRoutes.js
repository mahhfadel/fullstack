const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistoryModel');
const { autenticarToken } = require('../middleware/authMiddleware');

// POST /search-history - Guardar uma nova busca
router.post('/', autenticarToken, async (req, res) => {
  const { cryptoName, symbol, price } = req.body;

  try {
    const newEntry = new SearchHistory({
      userId: req.usuario.id,
      cryptoName,
      symbol,
      price,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar busca', error: err.message });
  }
});

// GET /search-history?page=1 - Listar histórico do usuário paginado
router.get('/', autenticarToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const total = await SearchHistory.countDocuments({ userId: req.usuario.id });
    const history = await SearchHistory.find({ userId: req.usuario.id })
      .sort({ searchedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      resultado: history,
      paginaAtual: page,
      totalPaginas: Math.ceil(total / limit),
      totalRegistros: total,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
});


// DELETE /search-history/:id - Deletar uma entrada específica
router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const deleted = await SearchHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.usuario.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }

    res.status(200).json({ message: 'Entrada deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar entrada', error: err.message });
  }
});

// DELETE /search-history - Deletar todo o histórico do usuário
router.delete('/', autenticarToken, async (req, res) => {
  try {
    await SearchHistory.deleteMany({ userId: req.usuario.id });
    res.status(200).json({ message: 'Todo o histórico foi deletado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar histórico', error: err.message });
  }
});

module.exports = router;
