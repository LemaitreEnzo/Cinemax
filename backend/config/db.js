const mongoose = require("mongoose");
require("dotenv").config(); //Prend les variables du fichier .env

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecté à MongoDB !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err.message);
    process.exit(1); // Arrête l'application en cas d'échec critique
  }
};

module.exports = connectDB;
