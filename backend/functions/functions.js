const fetch = require("node-fetch");

const API_KEY = "e1cf9a9a248b7e3c0190bee2623c9b47";

// Fonction pour récupérer les films
const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=fr-FR&sort_by=popularity.desc&api_key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
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
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const data = await response.json();
  return data.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});
};

module.exports = {
  fetchMovies,
  fetchGenresMapping,
};
