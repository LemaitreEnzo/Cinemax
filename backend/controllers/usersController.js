const mongoose = require("mongoose");
const UserModel = require("../models/User");
const FilmModel = require("../models/Film");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      error: "Erreur lors de la création de l'utilisateur",
      details: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .populate("movies")
      .populate("favorites");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des utilisateurs",
      details: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
      .populate("movies")
      .populate("favorites");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de l'utilisateur",
      details: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Si le mot de passe est fourni, le hasher
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      error: "Erreur lors de la mise à jour de l'utilisateur",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur",
      details: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email invalide" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    res.status(200).json({
      message: "Connexion réussie !",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
};

// Ajouter un film aux favoris
const addFavorite = async (req, res) => {
  try {
    const userId = req.body.userId;
    const filmId = req.body.id;

    console.log("Requête reçue pour ajouter un favori :", userId, filmId);
    // Vérification des ID
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(filmId)
    ) {
      return res
        .status(400)
        .json({ message: "ID utilisateur ou film invalide" });
    }

    // Vérifier si l'utilisateur et le film existent
    const user = await UserModel.findById(userId);
    const film = await FilmModel.findById(filmId);

    console.log(user, film);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!film) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    // Vérifier si le film est déjà en favoris
    if (user.favorites.some((fav) => fav.toString() === filmId)) {
      return res.status(400).json({ message: "Le film est déjà en favoris" });
    }

    // Ajouter le film aux favoris et sauvegarder
    user.favorites.push(film);
    await user.save();

    res.status(201).json({
      message: "Film ajouté aux favoris avec succès",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Récupérer les films favoris
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifie si l'ID est valide
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID utilisateur invalide." });
    }

    const user = await UserModel.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifie que favorites est bien un tableau
    if (!Array.isArray(user.favorites)) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération des favoris." });
    }

    res
      .status(200)
      .json({ favorites: user.favorites.length > 0 ? user.favorites : [] });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des favoris :",
      error.message
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.body.userId;
    const filmId = req.body.id;

    console.log("Requête reçue pour retirer un favori :", userId, filmId);

    // Vérification des ID
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(filmId)
    ) {
      return res
        .status(400)
        .json({ message: "ID utilisateur ou film invalide" });
    }

    // Vérifier si l'utilisateur et le film existent
    const user = await UserModel.findById(userId);
    const film = await FilmModel.findById(filmId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!film) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    // Vérifier si le film est déjà dans les favoris
    if (!user.favorites.some((fav) => fav.toString() === filmId)) {
      return res
        .status(400)
        .json({ message: "Le film n'est pas dans les favoris" });
    }

    // Retirer le film des favoris et sauvegarder
    user.favorites = user.favorites.filter((fav) => fav.toString() !== filmId);
    await user.save();

    res.status(200).json({
      message: "Film supprimé des favoris avec succès",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du favori :", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  addFavorite,
  getFavorites,
  removeFavorite,
};
