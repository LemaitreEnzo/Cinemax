import React from "react";
import { useParams } from "react-router-dom";
import './profile.css';
import { motion } from 'framer-motion';
import ScrollButton from "../../components/ScrollButton/ScrollButton";

const Profile = ({ match }) => {
    const { id } = useParams();
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="profile">
                <h1>Profil {id}</h1>
            </div>
            <ScrollButton />
        </motion.div>
    )
}

export default Profile;