import React from "react";
import '../../App.css';
import './button.css';

const Button = ({ type, backgroundColor, color, border, children, icon: Icon }) => {
    // Mise à jour de la logique des classes en fonction du type
    const buttonClass = 
        type === 'icon' ? 'button icon' : 
        type === 'category' ? 'button category' : 
        'button text';  // Définit 'button text' comme valeur par défaut

    return (
        <button
            className={buttonClass}
            style={{
                backgroundColor,
                color,
                border,
            }}
        >
            {type === 'icon' ? (
                <Icon className="icon" /> // Affiche l'icône si type est 'icon'
            ) : (
                children // Affiche les enfants (texte) sinon
            )}
        </button>
    );
};

export default Button;