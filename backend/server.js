const express = require("express");
const mongoose = require("mongoose");
const app = express();
const FilmRoutes = require("./routes/filmsRouter");
const usersRouter = require("./routes/usersRouter");
const cors = require("cors");

require("dotenv").config(); //Prend les variables du fichier .env

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

app.use(cors());

app.use(express.json());
app.use(FilmRoutes);
app.use(usersRouter);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Produit exemple",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5001/success",
      cancel_url: "http://localhost:5001/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error);
    res.status(500).send("Erreur lors de la création de la session");
  }
});

// Routes
app.get("/home", (req, res) => {
  res.send("Bienvenue sur la page d'accueil !");
});

app.get("/about", (req, res) => {
  res.send("À propos de nous");
});

app.post("/contact", (req, res) => {
  res.send("Formulaire de contact soumis");
});

// Lancement du serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

console.log("URI MongoDB :", process.env.MONGODB_URI);

module.exports = app;
