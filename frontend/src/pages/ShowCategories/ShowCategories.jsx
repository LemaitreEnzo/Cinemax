import { motion } from "framer-motion";
import React from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import CardMovie from "../../components/CardMovie/CardMovie";

const ShowCategories = ({ data, genres, user }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="show-categories movies section">
        <h1>Catégories et leurs films associés</h1>
        {genres && genres.length > 0 ? (
          genres.map((genre, index) => {
            const filmsInGenre = data.filter((film) =>
              film.genre.split(", ").includes(genre)
            );

            return (
              <div key={index} className="genre-section">
                <h2>{genre}</h2>
                {filmsInGenre.length > 0 ? (
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
                      {filmsInGenre.map((film, index) => (
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
                  <p>Aucun film trouvé pour cette catégorie.</p>
                )}
              </div>
            );
          })
        ) : (
          <p>Chargement des genres...</p>
        )}
      </div>
    </motion.div>
  );
};

export default ShowCategories;