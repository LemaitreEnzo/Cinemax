import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './nav.css';
import Button from "../../components/Button/Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Nav = ({ user, setUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };


    return (
        <nav className="nav">
            <div className="nav__list">
                <div className="nav__img">
                    <Link to="/" className="link"><img src="/uploads/images/logo.png" alt="" /></Link>
                </div>
                <div className="nav__line"></div>
                <div className="nav__links">
                    <Link to="/" className="link">Accueil</Link>
                    <Link to="/categories" className="link">Catégories</Link>
                    <Link to="/pricing" className="link">Tarifs</Link>
                    <Link to="/about" className="link">À propos</Link>
                </div>
            </div>

            <div className="nav__buttons">
                <Button
                    type="icon"
                    backgroundColor="transparent"
                    color="#fff"
                    border="1px solid #fff"
                    icon={IoMdNotificationsOutline}
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
                                    <span>{user.firstname[0]}</span>
                                </div>
                                <p className="username">{user.firstname} {user.lastname}</p>
                                <p className="email">{user.email}</p>
                                <Link to="/profile" className="button-profil">Mon Profil</Link>
                                <button onClick={handleLogout} className="button-logout">Déconnexion</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
                            <Button
                                type="text"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                            >
                                Se connecter
                            </Button>
                        </Link>

                        <Link to="/register" style={{ color: "#000", textDecoration: "none" }}>
                            <Button
                                type="text"
                                backgroundColor="#fff"
                                color="hsl(240, 3%, 8%)"
                                border="1px solid #fff"
                            >
                                S'inscrire
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
