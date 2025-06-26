// src/config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB Atlas com Mongoose');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = connectDB;
