import React, { useState, useEffect } from "react";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import Button from "../Button/Button";
import "./cardMovie.css";

const CardMovie = ({ title, image, id, user }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Vérifier si le film est déjà dans les favoris au chargement du composant
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/${user.id}/favorites`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des favoris.");

                const data = await response.json();
                // Vérification si le film est dans les favoris
                setIsFavorite(data.favorites.some(fav => fav._id === id)); // Utiliser _id si l'API retourne un objet Film
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavorites();
    }, [id, user.id]);

    const handleToggleFavorite = async () => {
        const method = isFavorite ? "DELETE" : "POST";
        try {
            const response = await fetch(`http://localhost:5001/api/users/${user.id}/favorites`, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, id }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la gestion des favoris.");
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="card__movie">
            <div className="card__status">
                <Button className="button category" type="category" backgroundColor="#fff" color="hsl(0, 93%, 42%)" border="1px solid #fff">
                    Free
                </Button>
            </div>
            <div className="card__img">
                <img src={image} alt={title} />
            </div>
            <div className="card__infos">
                <div className="card__title">
                    <h2>{title}</h2>
                </div>
                <div className="card__icon__favory">
                    <Button
                        type="icon"
                        backgroundColor="#fff"
                        color="#000"
                        border="1px solid #fff"
                        icon={isFavorite ? MdBookmark : MdBookmarkBorder}
                        onClick={handleToggleFavorite}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardMovie;