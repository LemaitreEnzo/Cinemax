const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }] //Pour crée une clé étrangère
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

