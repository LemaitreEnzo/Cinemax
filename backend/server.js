const express = require("express");
const app = express();
const FilmRoutes = require("./routes/filmsRouter");
const usersRouter = require("./routes/usersRouter");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config(); //Prend les variables du fichier .env

// Connexion à MongoDB
connectDB();

app.use(cors());

app.use(express.json());
app.use(FilmRoutes);
app.use(usersRouter);

// Lancement du serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;
