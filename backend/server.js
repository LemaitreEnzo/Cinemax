const FilmRoutes = require('./routes/filmsRouter');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware pour analyser les JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then((result) => app.listen(5000))
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Routes
app.get('/home', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil !');
});

app.get('/about', (req, res) => {
    res.send('À propos de nous');
});

app.post('/contact', (req, res) => {
    res.send('Formulaire de contact soumis');
});

app.use(FilmRoutes);

// Lancement du serveur
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


console.log("URI MongoDB :", process.env.MONGODB_URI);

module.exports = app;