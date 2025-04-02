const FilmModel = require("../models/Film");
const { fetchGenresMapping, fetchMovies } = require("../functions/functions");

// Récupérer tous les films
const getFilms = async (req, res) => {
  try {
    const films = await FilmModel.find();
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
    const film = await FilmModel.findById(id);

    if (!film) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    res.status(200).json(film);
  } catch (err) {
    console.error("Erreur lors de la récupération du film :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const getFilmsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ error: "Le paramètre 'category' est requis." });
    }

    // Utilisation de $regex pour chercher dans le champ "genre"
    const films = await FilmModel.find({
      genre: { $regex: category, $options: "i" },
    });

    if (!films || films.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun film trouvé pour cette catégorie." });
    }

    res.status(200).json(films);
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des films par catégorie :",
      err.message
    );
    res.status(500).json({ error: "Erreur interne du serveur." });
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
      const existingFilm = await FilmModel.findOne({
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
    const updatedFilm = await FilmModel.findByIdAndUpdate(id, req.body, {
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
    const deletedFilm = await FilmModel.findByIdAndDelete(id);

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
    await FilmModel.deleteMany({}); // Supprime tous les documents de la collection "films"
    console.log("Tous les documents ont été supprimés.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents :", error);
  }
}

const searchFilms = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Le paramètre 'title' est requis." });
    }

    // console.log("Paramètres reçus :", req.query);

    const films = await FilmModel.find({
      title: { $regex: title, $options: "i" },
    });

    if (!films || films.length === 0) {
      return res.status(404).json({ message: "Aucun film trouvé." });
    }

    res.status(200).json(films);
  } catch (err) {
    console.error("Erreur lors de la recherche des films :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// clearCollection();
// createFilm()

module.exports = {
  getFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
  searchFilms,
  getFilmsByCategory,
};
