import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Categories from './pages/Categories/categories';
import Profile from './pages/Profile/Profile';
import Nav from './layouts/Nav/Nav';
import Pricing from './pages/Pricing/Pricing';

function App() {
    const [data, setData] = useState();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/films');
                const films = await response.json();
                setData(films);
                const uniqueGenres = [...new Set(
                    films.flatMap(film => film.genre.split(', ').map(genre => genre.trim()))
                )]; // Set permet de faire un tableau de valeur unique et flatMap permet d'applatir le tableau

                setGenres(uniqueGenres);
            } catch (error) {
                console.error('Erreur lors de la récupération des films :', error);
            }
        };
        fetchData();
    }, []);

    console.log(genres);

    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                {/* <Route path="/profile/:id" element={<Profile />} /> */}
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
