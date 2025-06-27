const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistoryModel');
const { autenticarToken } = require('../middleware/authMiddleware');

// Utilitário para logs com hora e data
function log(msg) {
  const now = new Date().toLocaleString('pt-BR');
  console.log(`[${now}] ${msg}`);
}

// POST /search-history - Guardar uma nova busca
router.post('/', autenticarToken, async (req, res) => {
  const { cryptoName, symbol, price } = req.body;
  log(`Tentando salvar nova busca: ${cryptoName} (${symbol}) - $${price} para o usuário ${req.usuario.email}`);

  try {
    const newEntry = new SearchHistory({
      userId: req.usuario.id,
      cryptoName,
      symbol,
      price,
    });

    await newEntry.save();
    log(`Busca salva com sucesso para ${req.usuario.email}`);
    res.status(201).json(newEntry);
  } catch (err) {
    log(`Erro ao salvar busca: ${err.message}`);
    res.status(500).json({ message: 'Erro ao salvar busca', error: err.message });
  }
});

// GET /search-history?page=1 - Listar histórico do usuário paginado
router.get('/', autenticarToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  log(`Usuário ${req.usuario.email} solicitou histórico de buscas - Página ${page}`);

  try {
    const total = await SearchHistory.countDocuments({ userId: req.usuario.id });
    const history = await SearchHistory.find({ userId: req.usuario.id })
      .sort({ searchedAt: -1 })
      .skip(skip)
      .limit(limit);

    log(`Histórico retornado com sucesso. ${history.length} itens na página ${page}`);
    res.status(200).json({
      resultado: history,
      paginaAtual: page,
      totalPaginas: Math.ceil(total / limit),
      totalRegistros: total,
    });
  } catch (err) {
    log(`Erro ao buscar histórico: ${err.message}`);
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
});

// DELETE /search-history/:id - Deletar uma entrada específica
router.delete('/:id', autenticarToken, async (req, res) => {
  const id = req.params.id;
  log(`Usuário ${req.usuario.email} solicitou exclusão da entrada de histórico com ID ${id}`);

  try {
    const deleted = await SearchHistory.findOneAndDelete({
      _id: id,
      userId: req.usuario.id,
    });

    if (!deleted) {
      log(`Histórico com ID ${id} não encontrado para exclusão`);
      return res.status(404).json({ message: 'Histórico não encontrado' });
    }

    log(`Entrada com ID ${id} deletada com sucesso`);
    res.status(200).json({ message: 'Entrada deletada com sucesso' });
  } catch (err) {
    log(`Erro ao deletar entrada: ${err.message}`);
    res.status(500).json({ message: 'Erro ao deletar entrada', error: err.message });
  }
});

// DELETE /search-history - Deletar todo o histórico do usuário
router.delete('/', autenticarToken, async (req, res) => {
  log(`Usuário ${req.usuario.email} solicitou exclusão de TODO o histórico`);

  try {
    await SearchHistory.deleteMany({ userId: req.usuario.id });
    log(`Todo o histórico deletado com sucesso para ${req.usuario.email}`);
    res.status(200).json({ message: 'Todo o histórico foi deletado' });
  } catch (err) {
    log(`Erro ao deletar histórico: ${err.message}`);
    res.status(500).json({ message: 'Erro ao deletar histórico', error: err.message });
  }
});

module.exports = router;
