import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDropup } from "react-icons/io";
import "./scrollbutton.css";

const ScrollProgress = () => {
    const [scrollValue, setScrollValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const pos = document.documentElement.scrollTop;
        const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = Math.round((pos * 100) / calcHeight);
        
        setScrollValue(progress);
        setIsVisible(pos > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Appel initial pour éviter un délai au chargement
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            id="progress"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
                background: `#fff`,
                borderRadius: `50%`
            }}
        >
            <span id="progress-value"><IoIosArrowDropup /></span>
        </motion.div>
    );
};

export default ScrollProgress;