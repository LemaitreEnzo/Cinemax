import { motion } from "framer-motion";
import React, { useEffect } from "react";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import "./profile.css";

const Profile = ({ user }) => {
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

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="profile">
        <h1>
          Bienvenue sur le profil de {user.firstname} {user.lastname}
        </h1>
        <p>Email: {user.email}</p>
      </div>
      <ScrollButton />
    </motion.div>
  );
};

export default Profile;