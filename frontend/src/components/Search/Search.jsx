import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { IoSearch } from "react-icons/io5";
import "./search.css";

// Fonction de debounce
const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Search = ({ data }) => {
    const [title, setTitle] = useState("");
    const [films, setFilms] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    // Utilisation du debounce pour limiter les requêtes
    const debouncedTitle = useDebounce(title);

    const fetchFilms = async (searchTitle) => {
        try {
            setLoading(true);
            setMessage("");
            const queryParams = searchTitle.trim()
                ? `?title=${encodeURIComponent(searchTitle)}`
                : "";
            const response = await fetch(
                `http://localhost:5001/api/films/search${queryParams}`
            );
            const resData = await response.json();

            if (resData.length === 0) {
                setMessage("Aucun film trouvé.");
                setFilms(data || []);
            } else {
                setFilms(resData);
            }
        } catch (error) {
            setMessage("Une erreur est survenue lors de la recherche.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Effectuer la recherche uniquement lorsque la valeur debouncée change
    useEffect(() => {
        if (debouncedTitle) {
            fetchFilms(debouncedTitle);
        } else {
            setFilms(data); // Remet les données initiales si le champ est vide
        }
    }, [debouncedTitle, data]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFilmSelection = (id) => {
        if (id) {
            navigate(`/films/${id}`); // Redirection vers la page DetailMovie
        }
    };

    return (
        <div className="search__container">

            <div className="search">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="search-input"
                    placeholder="Rechercher un film..."
                />
                <div className="symbol">
                    <Button
                        type="icon"
                        backgroundColor="transparent"
                        color="#fff"
                        border="2px solid #fff"
                        icon={IoSearch}
                    ></Button>
                </div>

            </div>
            {message && <p className="search-message">{message}</p>}

            {loading && <p className="loading">Chargement...</p>}

            {isFocused && films.length > 0 && (
                <ul className="search-results">
                    {films.map((film) => (
                        <li
                            key={film._id}
                            onClick={() => handleFilmSelection(film._id)}
                            className="search-result-item"
                        >
                            {film.title}
                        </li>
                    ))}
                </ul>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="cloud">
                    <path d="M31.714,25.543c3.335-2.17,4.27-6.612,2.084-9.922c-1.247-1.884-3.31-3.077-5.575-3.223h-0.021
    C27.148,6.68,21.624,2.89,15.862,3.931c-3.308,0.597-6.134,2.715-7.618,5.708c-4.763,0.2-8.46,4.194-8.257,8.919
    c0.202,4.726,4.227,8.392,8.991,8.192h4.873h13.934C27.784,26.751,30.252,26.54,31.714,25.543z" />
                </symbol>
                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="lens">
                    <path d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
    s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
    c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
    c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
    C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z" />
                </symbol>
            </svg>

        </div>
    );
};

export default Search;