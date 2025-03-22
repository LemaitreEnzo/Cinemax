const express = require('express');
const router = express.Router();
const {
    getFilms,
    getFilm,
    createFilm,
    updateFilm,
    deleteFilm,
} = require('../controllers/filmsController');

// Routes CRUD pour les films
router.get('/api/films', getFilms);
router.get('/api/films/:id', getFilm);
router.post('/api/films', createFilm);
router.put('/api/films/:id', updateFilm);
router.delete('/api/films/:id', deleteFilm);

module.exports = router;