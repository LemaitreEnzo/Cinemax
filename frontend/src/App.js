import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Categories from './pages/Categories/categories';
import Nav from './layouts/Nav/Nav';
import Pricing from './pages/Pricing/Pricing';
import SignInUp from './pages/SignInUp/SignInUp';

function Layout({ user, setUser, data }) {
    const location = useLocation();
    const hideNav = location.pathname === "/login" || location.pathname === "/register";

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
                <Route path="/favorites" element={<ToggleFavorite />} />
            </Routes>
        </>
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
                const uniqueGenres = [...new Set(
                    films.flatMap(film => film.genre.split(', ').map(genre => genre.trim()))
                )];

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
        <Router>
            <Layout user={user} setUser={setUser} data={data} />
        </Router>
    );
}

export default App;
