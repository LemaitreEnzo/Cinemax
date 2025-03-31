import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
    return (
        <div className="notfound">
            <h1>404 - Page non trouvée</h1>
            <p>Oups ! La page que vous recherchez n'existe pas.</p>
            <Link to="/" className="back-home">Retour à l'accueil</Link>
        </div>
    );
};

export default NotFound;
