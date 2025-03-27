import { createContext, useState, useEffect } from "react";

// Créer un contexte utilisateur
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Vérifier si un utilisateur est stocké dans localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Fonction pour mettre à jour l'utilisateur (connexion / déconnexion)
    const updateUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user");
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
