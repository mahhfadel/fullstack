const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/database');

// rotas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const searchHistory = require('./src/routes/searchHistoryRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.secure || NODE_ENV !== 'production') {
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

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Você está na API do projeto fullstack do Lucas e da Maria e ela está funcionando');
});

app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/search-history', searchHistory);

if (NODE_ENV === 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando (PROD) na porta ${PORT}`);
  });
} else {
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  };

  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS rodando (DEV) na porta ${PORT}`);
  });

  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(8080);
} 
