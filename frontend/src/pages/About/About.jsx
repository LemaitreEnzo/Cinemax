import React from "react";
import './about.css';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="about">
                <h1>About</h1>
            </div>
        </motion.div>

    )
}

export default About;