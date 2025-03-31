import React from "react";
import './categories.css';
import { motion } from 'framer-motion';
import ScrollButton from "../../components/ScrollButton/ScrollButton";

const Categories = () => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="categories">
                <h1>Categories</h1>
            </div>
            <ScrollButton />
        </motion.div>

    )
}

export default Categories;