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
            </Routes>
        </>
    );
}

function App() {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });
    const [data, setData] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

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

    return (
        <Router>
            <Layout user={user} setUser={setUser} data={data} />
        </Router>
    );
}

export default App;
