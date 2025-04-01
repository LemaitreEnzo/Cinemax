const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/usersController");

// Routes CRUD pour les users
router.post("/api/users", createUser);
router.get("/api/users", getAllUsers);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);
router.post("/api/users/login", login);

// Routes pour les favoris
router.post("/api/users/:userId/favorites", addFavorite);
router.get("/api/users/:userId/favorites", getFavorites);
router.delete("/api/users/:userId/favorites", removeFavorite);

module.exports = router;
