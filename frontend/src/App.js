import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Categories from './pages/Categories/categories';
import Profile from './pages/Profile/Profile';
import Nav from './layouts/Nav/Nav';
import Pricing from './pages/Pricing/Pricing';

function App() {
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
