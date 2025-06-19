const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Caso use .env

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conectado ao MongoDB Atlas!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB Atlas:", err);
  }
}

module.exports = connectDB;
