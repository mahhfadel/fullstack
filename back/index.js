// LUCAS CARVALHO BATISTA CANHADAS GENVIGIR

const express = require('express');
const path = require('path');
const connectDB = require('./src/config/database');
const cors = require('cors');

// rotas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const searchHistory = require('./src/routes/searchHistoryRoutes');

const app = express();

// Usa a porta definida pelo Render ou 8000 localmente
const PORT = process.env.PORT || 8000;

// Trust proxy para redirecionar corretamente em produção
app.enable('trust proxy');

// Redireciona HTTP → HTTPS (funciona com proxy reverso)
app.use((req, res, next) => {
  if (req.secure || process.env.NODE_ENV !== 'production') {
    next();
  } else {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.use(cors({
  origin: ['http://localhost:3000', 'https://fullstack-dun-delta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cors({
  origin: ['http://localhost:3000', 'https://fullstack-dun-delta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

connectDB();

// Middleware para ler JSON
app.use(express.json());

// Rota de teste base
app.get('/', (req, res) => {
  res.send('Você está na API do projeto fullstack do Lucas e da Maria e ela está funcionando');
});

// Suas rotas
app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/search-history', searchHistory);

// Inicia o servidor (Render exige 0.0.0.0 + process.env.PORT)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
