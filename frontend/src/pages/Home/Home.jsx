import React from "react";
import './home.css';
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const AnimatedNumber = ({ target, duration =5000 }) => {
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
const Home = () => {
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
                                S'abonner
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
        </motion.div>

    )
}

export default Home