import React from 'react';
import { MdBookmarkBorder } from "react-icons/md";
import Button from '../Button/Button';
import './cardMovie.css'

const CardMovie = ({ title, image }) => {
    return (
        <div className='card__movie'>
            <div className="card__status">
                <Button
                    className="button category"
                    type="category"
                    backgroundColor="#fff"
                    color="hsl(0, 93%, 42%)"
                    border="1px solid #fff"
                >
                    Free
                </Button>
            </div>
            <div className="card__img">
                <img src={image} alt={title} />
            </div>
            <div className="card__infos">
                <div className="card__title">
                    <h2>{title}</h2>
                </div>
                <div className="card__icon__favory">
                    <Button
                        type="icon"
                        backgroundColor="#fff"
                        color="#000"
                        border="1px solid #fff"
                        icon={MdBookmarkBorder}
                    />
                </div>
            </div>
        </div>
    );
};


export default CardMovie
