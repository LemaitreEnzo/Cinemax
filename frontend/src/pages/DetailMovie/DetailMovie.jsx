import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import Button from "../../components/Button/Button";
import "./detailmovie.css";

const DetailMovie = ({ user }) => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/films/${id}`);
                if (!response.ok) throw new Error("Film non trouvé");

                const data = await response.json();
                setFilm(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/${user.id}/favorites`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des favoris.");

                const data = await response.json();
                setIsFavorite(data.favorites.some(fav => fav._id === id));
            } catch (error) {
                console.error(error);
            }
        };

        fetchFilm();
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

    if (!film) return <p>Chargement...</p>;

    return (
        <div className="details__movie section"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), hsl(240, 3.60%, 11.00%)), url(${film.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100vh"
            }}
        >
            <div className="details__movie__img">
                <img src={`https://image.tmdb.org/t/p/w500${film.image}`} alt={film.title} />
            </div>
            <div className="details__movie__infos">
                <h1 className="title">{film.title}</h1>
                <p className="description">{film.description}</p>
                <div className="buttons">
                    <div className="card__icon__favory">
                        <Button
                            type="icon"
                            backgroundColor="#fff"
                            color={isFavorite ? "hsl(0, 93%, 42%)" : "#000"}
                            border="1px solid #fff"
                            icon={isFavorite ? MdBookmark : MdBookmarkBorder}
                            onClick={handleToggleFavorite}
                        />
                    </div>
                    <div className="buttons-actions">
                        <div className="card__icon__payment">
                            <Button
                                type="text"
                                backgroundColor="hsl(0, 93%, 42%)"
                                color="#fff"
                                border="1px solid hsl(0, 93%, 42%)"
                            >
                                Regarder le film en streaming
                            </Button>
                        </div>
                        <div className="card__icon__ticket">
                            <Button
                                type="text"
                                backgroundColor="#fff"
                                color="#000"
                                border="1px solid #fff"
                            >
                                Voir les cinémas autour de chez moi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMovie;

