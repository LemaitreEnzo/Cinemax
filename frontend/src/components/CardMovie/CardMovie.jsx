import React, { useState, useEffect } from 'react';
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import Button from '../Button/Button';
import './cardMovie.css';

const CardMovie = ({ title, image, id, user }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user && user.favorites.includes(id)) {
            setIsFavorite(true);
        }
    }, [user, id]);

    const handleFavoriteClick = async () => {
        if (!user) {
            window.location.href = "/login"; // Redirige vers la page de connexion si non connecté
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/favorite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, filmId: id })
            });

            const data = await response.json();
            if (response.ok) {
                setIsFavorite(!isFavorite);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout aux favoris :", error);
        }
    };

    return (
        <div className='card__movie'>
            <div className="card__status">
                <Button
                    className="button category"
                    type="category"
                    backgroundColor="#fff"
                    color="hsl(0, 93%, 42%)"
                    border="1px solid #fff"
                >
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
                        onClick={handleFavoriteClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardMovie;