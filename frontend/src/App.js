import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return (<><h1>Accueil</h1></>);
}

function About() {
    return (<><h1>À propos</h1></>);
}

function Contact() {
    return (<><h1>Contactez-nous</h1></>);
}

function Profile({ id }) {
    return (<><h1>Profil utilisateur : {id}</h1></>);
}

function AddMovieForm() {
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        description: '',
        duration: '',
        releaseYear: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/films', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue');
            }

            const data = await response.json();
            console.log('Film ajouté avec succès :', data);
            setMovie({
                title: '',
                genre: '',
                description: '',
                duration: '',
                releaseYear: '',
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du film :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Titre :
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Genre :
                <input
                    type="text"
                    name="genre"
                    value={movie.genre}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Description :
                <textarea
                    name="description"
                    value={movie.description}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Durée (en minutes) :
                <input
                    type="number"
                    name="duration"
                    value={movie.duration}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Année de sortie :
                <input
                    type="number"
                    name="releaseYear"
                    value={movie.releaseYear}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <button type="submit">Ajouter le film</button>
        </form>
    );
}

function Films() {
    return (
        <>
            <h1>Ajouter un film</h1>
            <AddMovieForm />
        </>
    );
}

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/about">À propos</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/profil">Profil</Link>
                <Link to="/api/films">Films</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/api/films" element={<Films />} />
            </Routes>
        </Router>
    );
}

export default App;
