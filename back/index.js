const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const connectDB = require('./src/config/database');

// rotas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const searchHistory = require('./src/routes/searchHistoryRoutes');

const app = express();
const port = 8000;

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.secure || process.env.NODE_ENV !== 'production') {
    next();
  } else {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
});


connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Você está na API do projeto fullstack do Lucas e da Maria');
});

app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/search-history', searchHistory);

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Servidor HTTPS rodando em https://localhost:${port}`);
});
