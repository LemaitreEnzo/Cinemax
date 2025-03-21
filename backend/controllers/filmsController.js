const Film = require('../models/Film');
const fetch = require('node-fetch');

const API_KEY = 'e1cf9a9a248b7e3c0190bee2623c9b47'

// Fonction pour récupérer les films
const fetchMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&sort_by=popularity.desc&api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await response.json();

        // Récupérer les 50 premiers films
        return data.results.slice(0, 50);
    } catch (err) {
        console.error("Erreur lors de la récupération des films :", err.message);
        throw new Error("Impossible de récupérer les films.");
    }
};

const fetchGenresMapping = async () => {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(genreUrl, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });
    const data = await response.json();
    return data.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});
};

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
const createFilm = async () => {
    try {
        const movies = await fetchMovies();
        const genresMap = await fetchGenresMapping();

        for (const movie of movies) {
            const existingFilm = await Film.findOne({ title: movie.title, releaseYear: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null});

            if (!existingFilm) {
                const genreNames = movie.genre_ids.map(id => genresMap[id] || 'Inconnu').join(', ');

                const newFilm = new Film({
                    title: movie.title,
                    genre: genreNames? genreNames: "Genre indisponible.",
                    description: movie.overview ? movie.overview : "Description indisponible.", 
                    duration: movie.runtime || 0,
                    releaseYear: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null,
                });

                await newFilm.save();
                console.log(`Film ajouté : ${movie.title}`);
            } else {
                console.log(`Film déjà existant : ${movie.title}`);
            }
        }

        console.log('Processus terminé : insertion des films dans la base de données.');
    } catch (err) {
        console.error("Erreur lors de l'insertion des films dans la base de données :", err.message);
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
