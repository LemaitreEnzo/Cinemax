import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";
import "./cardMovie.css";

const CardMovie = ({ title, image, id, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      // Only attempt to fetch favorites if user exists AND user.id exists
      if (user && user.id) {
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

    fetchFavorites();
  }, [id, user]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !user.id) {
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
    setShowPopup(false);
  };

  return (
    <div>
      <div className="card__movie">
        <Link to={`/films/${id}`} className="card__link">
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
                color={isFavorite ? "hsl(0, 93%, 42%)" : "#000"}
                border="1px solid #fff"
                icon={isFavorite ? MdBookmark : MdBookmarkBorder}
                onClick={handleToggleFavorite}
              />
            </div>
          </div>
        </Link>
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

export default CardMovie;
