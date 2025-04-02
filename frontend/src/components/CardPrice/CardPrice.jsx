import React from "react";
import "./cardprice.css";
const PricingCard = ({ title, price, storage, users, account }) => {
  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      {/* features here */}
      <div className="card-features">
        <div className="card-storage">{storage}</div>
        <div className="card-users-allowed">{users} films in total</div>
        <div className="card-account">{account}</div>
      </div>
      <button className="card-btn">READ MORE</button>
    </div>
  );
};

export default PricingCard;