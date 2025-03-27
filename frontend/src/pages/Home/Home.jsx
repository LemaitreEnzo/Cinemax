import React from "react";
import './home.css';
import Button from "../../components/Button/Button";
import { useEffect, useState, useContext } from "react";
import { motion } from 'framer-motion';
import CardMovie from "../../components/CardMovie/CardMovie";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UserContext } from "../../context/UserContext";
import ScrollButton from "../../components/ScrollButton/ScrollButton";

import 'swiper/swiper-bundle.css'; // Assure-toi d'importer cette ligne pour avoir le CSS complet de Swiper


const AnimatedNumber = ({ target, duration = 5000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Utilisation d'une fonction d'interpolation pour un effet naturel (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(start + easedProgress * (target - start)));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration]);

    return <h2>{count.toLocaleString()}+</h2>;
};

const Home = ({ movies }) => {
    const { user } = useContext(UserContext);
    console.log(user);
    
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="home section">
                <div className="home__container">
                    <div className="home__presentation">
                        <p className="home__presentation__subtitle">Enjoy Streaming Today</p>
                        <h1 className="home__presentation__title">Welcome To Your Streaming Platform of choice</h1>
                        <p className="home__presentation__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum repellendus a quisquam facere, eveniet veritatis, dolore incidunt aut vel ut aperiam totam in nisi facilis ipsum. Est provident molestias sunt.</p>
                        <div className="home__presentation__buttons">
                            <Button
                                type="text"
                                backgroundColor="hsl(0, 93%, 42%)"
                                color="#fff"
                                border="1px solid hsl(0, 93%, 42%)"
                            >
                                S'abonner
                            </Button>
                            <Button
                                type="text"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                            >
                                Nous rejoindre
                            </Button>
                        </div>
                        <div className="home__presentation__numbers">
                            <div>
                                <AnimatedNumber target={250} />
                                <p>Movies availables</p>
                            </div>
                            <div>
                                <AnimatedNumber target={450} />
                                <p>People Subscribe</p>
                            </div>
                            <div>
                                <AnimatedNumber target={240} />
                                <p>Top review</p>
                            </div>
                        </div>
                    </div>
                    <div className="home__img">
                        <img src="https://fr.web.img5.acsta.net/medias/nmedia/00/00/00/33/spiderman.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="movies section">
                <h1>The Most Popular<br />Movies 2024</h1>

                <div className="movies__container">
                    {/* Configurer correctement Swiper */}
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}   // Espace entre les slides
                        slidesPerView={3}  // Nombre de slides visibles
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        breakpoints={{
                            640: { slidesPerView: 1 }, // 1 slide visible à partir de 640px
                            768: { slidesPerView: 3 }, // 2 slides visibles à partir de 768px
                            1024: { slidesPerView: 4 }, // 3 slides visibles à partir de 1024px
                        }}
                    >
                        {movies ? movies.map((movie) => (
                            <SwiperSlide key={movie.id}>  {/* Mettez la clé ici sur SwiperSlide */}
                                <CardMovie
                                    key={movie._id}
                                    id={movie._id}
                                    title={movie.title}
                                    image={movie.image}
                                    user={user}
                                />
                            </SwiperSlide>
                        )) : <p>Loading...</p>}
                    </Swiper>
                </div>
            </div>
            <ScrollButton />
        </motion.div>
    );
};


export default Home;

