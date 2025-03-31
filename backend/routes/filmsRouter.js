const express = require("express");
const router = express.Router();
const {
  getFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
  searchFilms,
  getFilmsByCategory,
} = require("../controllers/filmsController");

// Routes CRUD pour les films
router.get("/api/films", getFilms);
router.get("/api/films/search", searchFilms);
router.get("/api/films/:id", getFilm);
router.get("/api/films/category/:category", getFilmsByCategory);
router.post("/api/films", createFilm);
router.put("/api/films/:id", updateFilm);
router.delete("/api/films/:id", deleteFilm);

module.exports = router;
