import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./detailmovie.css";

const DetailMovie = ({ user }) => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // État pour gérer la visibilité de la popup

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
      if (user) {
        // Vérification si l'utilisateur est connecté
        try {
          const response = await fetch(
            `http://localhost:5001/api/users/${user.id}/favorites`
          );
          if (!response.ok)
            throw new Error("Erreur lors de la récupération des favoris.");

          const data = await response.json();
          setIsFavorite(data.favorites.some((fav) => fav._id === id));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchFilm();
    fetchFavorites();
  }, [id, user?.id]); // L'appel API des favoris dépend de `user`

  const handleToggleFavorite = async () => {
    if (!user) {
      // Afficher la popup si l'utilisateur n'est pas connecté
      setShowPopup(true);
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${user.id}/favorites`,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, id }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la gestion des favoris.");
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Fermer la popup
  };

  if (!film) return <p>Chargement...</p>;

  return (
    <div
      className="details__movie section"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), hsl(240, 3.60%, 11.00%)), url(${film.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <div className="details__movie__img">
        <img
          src={`https://image.tmdb.org/t/p/w500${film.image}`}
          alt={film.title}
        />
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
              <Link to="/maps">
                <Button
                  type="text"
                  backgroundColor="#fff"
                  color="#000"
                  border="1px solid #fff"
                >
                  Voir les cinémas autour de chez moi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="popup-overlay"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="popup"
          >
            <div className="popup-content">
              <span className="popup-close" onClick={closePopup}><IoMdClose /></span>
              <h2>Vous devez être connecté pour ajouter aux favoris.</h2>
              <Link to="/login">
                <Button
                  backgroundColor="hsl(0, 93%, 42%)"
                  color="#fff"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};


export default DetailMovie;
