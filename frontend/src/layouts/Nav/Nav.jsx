import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import './nav.css';
import Button from "../../components/Button/Button";
import { CiMap } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

const Nav = ({ user, setUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simule un chargement de 1.5 seconde
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <nav className="nav">
            <div className="nav__list">
                <div className="nav__img">
                    <NavLink to="/" className="link img"><img src="/uploads/images/logo.png" alt="" /></NavLink>
                </div>
                <div className="nav__line"></div>
                <div className="nav__links">
                    <NavLink to="/" className="link" activeClassName="active">Accueil</NavLink>
                    <NavLink to="/categories" className="link" activeClassName="active">Catégories</NavLink>
                    <NavLink to="/pricing" className="link" activeClassName="active">Tarifs</NavLink>
                    <NavLink to="/about" className="link" activeClassName="active">À propos</NavLink>
                </div>
            </div>

            <div className="nav__buttons">
                <Button
                    type="icon"
                    backgroundColor="transparent"
                    color="#fff"
                    border="1px solid #fff"
                    icon={CiMap}
                />

                {user ? (
                    <div className="nav__profile">
                        <Button
                            className="profile-icon"
                            type="icon"
                            backgroundColor="#fff"
                            color="hsl(240, 3%, 8%)"
                            border="1px solid #fff"
                            onClick={() => setMenuOpen(!menuOpen)}
                            icon={FaRegUser}
                        >
                        </Button>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <div className="profile__img">
                                    <span>{user.firstname.charAt(0).toUpperCase()}</span>
                                </div>
                                <p className="username">{user.firstname} {user.lastname}</p>
                                <p className="email">{user.email}</p>
                                <NavLink to="/profile" className="button-profil">Mon Profil</NavLink>
                                <NavLink to="/favorites" className="button-profil">Liste des favoris</NavLink>
                                <button onClick={handleLogout} className="button-logout">Déconnexion</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <NavLink to="/login" style={{ color: "#fff", textDecoration: "none" }}>
                            <Button
                                type="text"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                            >
                                Se connecter
                            </Button>
                        </NavLink>

                        <NavLink to="/register" style={{ color: "#000", textDecoration: "none" }}>
                            <Button
                                type="text"
                                backgroundColor="#fff"
                                color="hsl(240, 3%, 8%)"
                                border="1px solid #fff"
                            >
                                S'inscrire
                            </Button>
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
