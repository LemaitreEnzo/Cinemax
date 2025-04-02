import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CardMovie from "../../components/CardMovie/CardMovie"; // Assurez-vous d'importer CardMovie
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import "./favorites.css";

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return; // Si l'utilisateur n'est pas connecté, ne rien faire.

      try {
        const response = await fetch(
          `http://localhost:5001/api/users/${user.id}/favorites`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des favoris");
        }

        const data = await response.json();
        setFavorites(data.favorites); // Met à jour l'état avec les films favoris
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="favorites section">
        <h1 className="title">Mes films favoris</h1>
        {favorites.length === 0 ? (
          <p>Vous n'avez pas encore de films favoris.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((film) => (
              <CardMovie
                key={film._id}
                title={film.title}
                image={film.image}
                id={film._id} // Utilisation de _id pour chaque film
                user={user}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollButton />
    </motion.div>
  );
};

export default Favorites;
