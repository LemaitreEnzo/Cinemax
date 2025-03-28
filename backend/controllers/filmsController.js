const Film = require("../models/Film");
const { fetchGenresMapping, fetchMovies } = require("../functions/functions");

// Récupérer tous les films
const getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (err) {
    console.error("Erreur lors de la récupération des films :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Récupérer un film par ID
const getFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findById(id);

    if (!film) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    res.status(200).json(film);
  } catch (err) {
    console.error("Erreur lors de la récupération du film :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Créer un nouveau film
const createFilm = async () => {
  try {
    const movies = await fetchMovies();
    const genresMap = await fetchGenresMapping();

    // URL de base pour les images TMDB
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // Changez la taille si nécessaire

    for (const movie of movies) {
      const existingFilm = await Film.findOne({
        title: movie.title,
        releaseYear: movie.release_date
          ? parseInt(movie.release_date.split("-")[0])
          : null,
      });

      if (!existingFilm) {
        const genreNames = movie.genre_ids
          .map((id) => genresMap[id] || "Inconnu")
          .join(", ");

        const newFilm = new Film({
          title: movie.title,
          genre: genreNames ? genreNames : "Genre indisponible.",
          description: movie.overview
            ? movie.overview
            : "Description indisponible.",
          image: movie.poster_path
            ? `${imageBaseUrl}${movie.poster_path}`
            : "Aucune image", // Construire l'URL de l'image complète
          duration: movie.runtime || 0,
          releaseYear: movie.release_date
            ? parseInt(movie.release_date.split("-")[0])
            : null,
        });

        await newFilm.save();
        console.log(`Film ajouté : ${movie.title}`);
      } else {
        console.log(`Film déjà existant : ${movie.title}`);
      }
    }

    console.log(
      "Processus terminé : insertion des films dans la base de données."
    );
  } catch (err) {
    console.error(
      "Erreur lors de l'insertion des films dans la base de données :",
      err.message
    );
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
      return res.status(404).json({ message: "Film non trouvé" });
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
      return res.status(404).json({ message: "Film non trouvé" });
    }

    res.status(200).json({ message: "Film supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du film :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

async function clearCollection() {
  try {
    await Film.deleteMany({}); // Supprime tous les documents de la collection "films"
    console.log("Tous les documents ont été supprimés.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents :", error);
  }
}

const toggleFavourtite = () => {};

// clearCollection();
// createFilm()

module.exports = {
  getFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
};
