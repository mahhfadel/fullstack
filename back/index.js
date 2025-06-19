const express = require('express');
const connectDB = require('./src/config/database');

const app = express();
const port = 8000;

// Conectar ao MongoDB Atlas
connectDB();

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
