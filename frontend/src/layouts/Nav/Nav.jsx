import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './nav.css';
import Button from "../../components/Button/Button";
import { IoMdNotificationsOutline } from "react-icons/io";

const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav__list">
                <div className="nav__img">
                    <Link to="/" className="link"><img src="/uploads/images/logo.png" alt="" /></Link>
                </div>
                <div className="nav__line"></div>
                <div className="nav__links">
                    <Link to="/" className="link">Accueil</Link>
                    <Link to="/categories" className="link">Categories</Link>
                    {/* <Link to="/profile/:id" className="link">Profil</Link> */}
                    <Link to="/pricing" className="link">Pricing</Link>
                    <Link to="/about" className="link">About</Link>
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

                <Button
                    type="text"
                    backgroundColor="transparent"
                    color="#fff"
                    border="1px solid #fff"
                >
                    Se connecter
                </Button>

                <Button
                    type="text"
                    backgroundColor="#fff"
                    color="hsl(240, 3%, 8%)"
                    border="1px solid #fff"
                >
                    S'inscrire
                </Button>

            </div>
        </nav>
    )
}

export default Nav;