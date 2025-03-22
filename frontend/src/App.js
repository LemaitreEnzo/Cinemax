import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Categories from './pages/Categories/categories';
import Nav from './layouts/Nav/Nav';
import Pricing from './pages/Pricing/Pricing';

function App() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/films');
                const data = await response.json();
                setData(data);

            } catch (error) {
                console.error('Erreur lors de la récupération des films :', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home movies={data} />} />
                <Route path="/categories" element={<Categories />} />
                {/* <Route path="/profile/:id" element={<Profile />} /> */}
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
