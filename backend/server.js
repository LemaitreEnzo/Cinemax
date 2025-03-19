const express = require('express');
const app = express();

// Routes
app.get('/home', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil !');
});

app.get('/about', (req, res) => {
    res.send('À propos de nous');
});

app.post('/contact', (req, res) => {
    res.send('Formulaire de contact soumis');
});

const homeRoutes = require('./routes/routes');
app.use('/home', homeRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
