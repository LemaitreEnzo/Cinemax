import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nav from "./layouts/Nav/Nav";
import About from "./pages/About/About";
import Categories from "./pages/Categories/categories";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/Pricing";

function SignupForm() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error || "Une erreur est survenue lors de la création du compte."
        );
      } else {
        setSuccessMessage("Compte créé avec succès !");
        setErrorMessage("");
        setFormData({ lastname: "", firstname: "", email: "", password: "" });
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Création de compte</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Prénom :
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Créer un compte</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

function LoginForm() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error || "Une erreur est survenue lors de la connexion."
        );
      } else {
        setSuccessMessage("Connexion réussie !");
        setErrorMessage("");
        setUser(data.user);

        console.log("Données utilisateur :", user);
      }
    } catch (error) {
      setErrorMessage("Impossible de se connecter au serveur.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

function ToggleFavorite() {
  const [userId, setUserId] = useState("");
  const [filmId, setFilmId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${userId}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            filmId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout aux favoris.");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Film ajouté aux favoris !");
    } catch (error) {
      setResponseMessage(error.message || "Une erreur est survenue.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ajouter un film en favori</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>User ID :</strong>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Film ID :</strong>
          <input
            type="text"
            value={filmId}
            onChange={(e) => setFilmId(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <button
        onClick={handleAddFavorite}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ajouter en favori
      </button>
      {responseMessage && (
        <div
          style={{
            marginTop: "20px",
            color: responseMessage.includes("Erreur") ? "red" : "green",
          }}
        >
          <strong>{responseMessage}</strong>
        </div>
      )}
    </div>
  );
}

function App() {
  const [data, setData] = useState();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/films");
        const films = await response.json();
        setData(films);
        const uniqueGenres = [
          ...new Set(
            films.flatMap((film) =>
              film.genre.split(", ").map((genre) => genre.trim())
            )
          ),
        ]; // Set permet de faire un tableau de valeur unique et flatMap permet d'applatir le tableau

        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };
    fetchData();
  }, []);

  console.log(genres);
  console.log(data);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          {/* <Route path="/profile/:id" element={<Profile />} /> */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/favorites" element={<ToggleFavorite />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
