import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return <h1>Accueil</h1>;
}

function About() {
    return <h1>À propos</h1>;
}

function Contact() {
    return <h1>Contactez-nous</h1>;
}

function Profile({ id }) {
  return <h1>Profil utilisateur : {id}</h1>;
}

<Route path="/profile/:id" element={<Profile />} />

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/about">À propos</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/profil">Profil</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profil" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
