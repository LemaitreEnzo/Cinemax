import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import "./searchbycategory.css";

const SearchByCategory = ({ genres }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // Hook pour la redirection

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      navigate(`/categories/${category}`); // Redirection vers la page de catégorie
    }
  };

  return (
    <div className="category-container">
      <div className="category-select-container">
        <label className="category-label">Choisir une catégorie :</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">Toutes les catégories</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchByCategory;