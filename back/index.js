const express = require('express');
const connectDB = require('./src/config/database');

//rotas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = 8000;

// Conectar ao MongoDB Atlas
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Você está na API do projeto fullstack do Lucas e da Maria');
});

app.use('/users', userRoutes);
app.use('/login', authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
