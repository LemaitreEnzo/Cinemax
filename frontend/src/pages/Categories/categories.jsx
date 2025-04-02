import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import CardMovie from "../../components/CardMovie/CardMovie";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import "./categories.css";

const Categories = ({ data, user }) => {
  const { category } = useParams(); // Récupérer la catégorie depuis l'URL
  const [filteredFilms, setFilteredFilms] = useState([]);

  useEffect(() => {
    if (data && category) {
      // Vérification si `data` est non null avant d'utiliser .filter
      const films = data.filter((film) =>
        film.genre.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredFilms(films);
    } else {
      setFilteredFilms([]); // Si `data` est null, on initialise une liste vide
    }
  }, [category, data]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="movies">
        <h1>Films dans la catégorie : {category}</h1>
        {filteredFilms.length > 0 ? (
          <div className="movies__container">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {filteredFilms.map((film, index) => (
                <SwiperSlide key={film._id || index}>
                  <CardMovie
                    id={film._id}
                    title={film.title}
                    image={film.image}
                    user={user || {}}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="category-no-results">
            {data
              ? "Aucun film trouvé pour cette catégorie."
              : "Chargement des données..."}
          </p>
        )}
      </div>
      <ScrollButton />
    </motion.div>
  );
};

export default Categories;