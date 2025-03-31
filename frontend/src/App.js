import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Nav from "./layouts/Nav/Nav";
import About from "./pages/About/About";
import Categories from "./pages/Categories/categories";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/Pricing";
import SignInUp from "./pages/SignInUp/SignInUp";
import Favorites from './pages/Favorites/Favorites';
import Footer from './layouts/Footer/Footer';

function Layout({ user, setUser, data }) {
  const location = useLocation();
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNav && <Nav user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Home movies={data} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<SignInUp setUser={setUser} />} />
        <Route path="/login" element={<SignInUp setUser={setUser} />} />
        <Route path="/search" element={<FilmSearch data={data} />} />
        <Route path="/favorites" element={<Favorites user={user} />} />
      </Routes>
    </>
  );
}

const FilmSearch = ({ data }) => {
  const [title, setTitle] = useState("");
  const [films, setFilms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les films depuis l'API
  const fetchFilms = async (searchTitle) => {
    try {
      setLoading(true);
      setMessage(""); // Réinitialiser les messages

      // Vérifier si le titre est vide
      const queryParams = searchTitle.trim()
        ? `?title=${encodeURIComponent(searchTitle)}`
        : ""; // Pas de filtre si le champ est vide

      if (searchTitle === "") {
        setFilms(data);
        return;
      }

      const response = await fetch(
        `http://localhost:5001/api/films/search${queryParams}`
      );

      const resData = await response.json();

      if (resData.length === 0) {
        setMessage("Aucun film trouvé.");
        setFilms(data || []); // Fallback vers les données initiales
      } else {
        setFilms(resData);
      }
    } catch (error) {
      setMessage(error.message || "Une erreur est survenue.");
      console.error(error);
    } finally {
      setLoading(false);

  // Gérer les changements de l'utilisateur
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    fetchFilms(newTitle); // Recherche dynamique
  };

  useEffect(() => {
    setFilms(data || []); // Initialiser les films avec les données existantes
  }, [data]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Recherche de films</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Titre :</strong>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      {loading && (
        <div style={{ marginTop: "20px", color: "blue" }}>
          <strong>Chargement...</strong>
        </div>
      )}
      {message && (
        <div
          style={{
            marginTop: "20px",
            color: "red",
          }}
        >
          <strong>{message}</strong>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <h2>Résultats :</h2>
        {films.length > 0 ? (
          <ul>
            {films.map((film) => (
              <li key={film._id}>
                <strong>{film.title}</strong> - {film.releaseYear} -{" "}
                {film.genre}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun film à afficher.</p>
        )}
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [data, setData] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/films');
        const films = await response.json();
        setData(films);
        const uniqueGenres = [
          ...new Set(
            films.flatMap((film) =>
              film.genre.split(", ").map((genre) => genre.trim())
            )
          ),
        ];

        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserProvider>
      <Router>
        <Layout user={user} setUser={setUser} data={data} />
      </Router>
    </UserProvider>
  );
}

export default App;
