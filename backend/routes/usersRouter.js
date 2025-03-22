const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
} = require('../controllers/usersController');

// Routes CRUD pour les users
router.post('/api/users', createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users:id', getUserById);
router.put('/api/users:id', updateUser);
router.delete('/api/users:id', deleteUser);
router.post('/api/users/login', login);

module.exports = router;