const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    movieId: {type: Number},
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseYear: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now },
});

const Film = mongoose.model('Film', FilmSchema);

module.exports = Film;
