const express = require('express');
const app = express();

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

const homeRoutes = require('./routes/routes');
app.use('/home', homeRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err));


app.use(express.json());

// Définir un schéma et un modèle pour les films
const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // En minutes
    releaseYear: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now },
});

const Film = mongoose.model('Film', FilmSchema);

// Route pour récupérer tous les films
app.get('/films', async (req, res) => {
    try {
        const films = await Film.find();
        if (!films || films.length === 0) {
            return res.status(404).json({ message: 'Aucun film trouvé' });
        }
        res.status(200).json(films);
    } catch (err) {
        console.error("Erreur lors de la récupération des films :", err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour ajouter un film
app.post('/films', async (req, res) => {
    try {
        const newFilm = new Film(req.body);
        const savedFilm = await newFilm.save();
        res.status(201).json(savedFilm);
    } catch (err) {
        console.error("Erreur lors de l'ajout du film :", err);
        res.status(400).json({ error: 'Erreur dans les données envoyées' });
    }
});

// Route pour rechercher des films par titre
app.get('/films/search', async (req, res) => {
    const { title } = req.query; // Récupérer le titre dans les paramètres de requête
    try {
        const films = await Film.find({ title: new RegExp(title, 'i') }); // Recherche insensible à la casse
        if (!films || films.length === 0) {
            return res.status(404).json({ message: 'Aucun film correspondant trouvé' });
        }
        res.status(200).json(films);
    } catch (err) {
        console.error("Erreur lors de la recherche des films :", err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

console.log("URI MongoDB :", process.env.MONGODB_URI);