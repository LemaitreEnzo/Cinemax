const express = require('express');
const mongoose = require('mongoose');
const app = express();
const FilmRoutes = require('./routes/filmsRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');

require('dotenv').config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connecté à MongoDB"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

app.use(cors());

app.use(express.json());
app.use(FilmRoutes);
app.use(usersRouter);

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


// Lancement du serveur
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


console.log("URI MongoDB :", process.env.MONGODB_URI);

module.exports = app;