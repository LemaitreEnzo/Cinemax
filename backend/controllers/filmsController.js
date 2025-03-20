const Film = require('../models/Film');

// Récupérer tous les films
const getFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.status(200).json(films);
    } catch (err) {
        console.error("Erreur lors de la récupération des films :", err.message);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

// Récupérer un film par ID
const getFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const film = await Film.findById(id);

        if (!film) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }

        res.status(200).json(film);
    } catch (err) {
        console.error("Erreur lors de la récupération du film :", err.message);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

// Créer un nouveau film
const createFilm = async (req, res) => {
    try {
        const { title, genre, description, duration, releaseYear } = req.body;

        const newFilm = new Film({
            title,
            genre,
            description,
            duration,
            releaseYear,
        });

        const savedFilm = await newFilm.save();
        res.status(201).json(savedFilm);
    } catch (err) {
        console.error("Erreur lors de la création du film :", err.message);
        res.status(400).json({ error: err.message });
    }
};

// Mettre à jour un film par ID
const updateFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFilm = await Film.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedFilm) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }

        res.status(200).json(updatedFilm);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du film :", err.message);
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un film par ID
const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFilm = await Film.findByIdAndDelete(id);

        if (!deletedFilm) {
            return res.status(404).json({ message: 'Film non trouvé' });
        }

        res.status(200).json({ message: 'Film supprimé avec succès' });
    } catch (err) {
        console.error("Erreur lors de la suppression du film :", err.message);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = {
    getFilms,
    getFilm,
    createFilm,
    updateFilm,
    deleteFilm,
};
