const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/database');

//rotas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const searchHistory = require('./src/routes/searchHistoryRoutes');

const app = express();
const port = 8000;

// Conectar ao MongoDB Atlas
connectDB();
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Você está na API do projeto fullstack do Lucas e da Maria');
});

app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/search-history', searchHistory);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
