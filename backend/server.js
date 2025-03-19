const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Exemple de route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
