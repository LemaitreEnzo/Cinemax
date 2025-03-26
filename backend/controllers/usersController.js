const User = require("../models/User");
const Film = require("../models/Film");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
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
    const users = await User.find().populate("movies").populate("favorites");
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
    const user = await User.findById(req.params.id)
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
    const user = await User.findById(req.params.id);
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);
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
    const user = await User.findOne({ email });
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
    const { userId, filmId } = req.body;

    // Vérifier si l'utilisateur et le film existent
    const user = await User.findById(userId);
    const film = await Film.findById(filmId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!film) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    // Vérifier si le film est déjà en favoris
    if (user.favorites.includes(filmId)) {
      return res.status(400).json({ message: "Le film est déjà en favoris" });
    }

    // Ajouter le film aux favoris
    user.favorites.push(filmId);
    await user.save();

    res.status(201).json({
      message: "Film ajouté aux favoris avec succès",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Récupérer les films favoris
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des favoris :",
      error.message
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Supprimer un film des favoris
const removeFavorite = async (req, res) => {
  try {
    const { userId, filmId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!user.favorites.includes(filmId)) {
      return res
        .status(400)
        .json({ message: "Le film n'est pas dans les favoris" });
    }

    // Supprimer le film des favoris
    user.favorites = user.favorites.filter((id) => id.toString() !== filmId);
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
