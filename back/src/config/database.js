const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 50,
    });

    console.log(`[${new Date().toISOString()}] ✅ Conectado ao MongoDB Atlas com Mongoose`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Erro ao conectar ao MongoDB Atlas:`, error);
    throw error;
  }
}

module.exports = connectDB;
