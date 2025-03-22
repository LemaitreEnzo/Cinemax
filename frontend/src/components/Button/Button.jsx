import React from "react";
import '../../App.css';
import './button.css';

const Button = ({ type, backgroundColor, color, border, children, icon: Icon }) => {
    const buttonClass = type === 'icon' ? 'button icon' : 'button text';

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
                <Icon className="icon" />
            ) : (
                children 
            )}
        </button>
    );
};

export default Button;
