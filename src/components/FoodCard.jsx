import React from "react";

function FoodCard({ image, name, description, servings, time, isLoading }) {
  return (
    <div className="food-card">
      {isLoading ? (
        <div className="food-card-loading">
          <div className="spinner"></div>
          <p>Loading recipe...</p>
        </div>
      ) : (
        <>
          <div className="food-card-image">
            <img src={image} alt={name} />
          </div>
          <div className="food-card-content">
            <h3>{name}</h3>
            <p className="food-description">{description}</p>
            <div className="food-meta">
              <span>Time: {time}</span>
              <span>Serves: {servings}</span>
            </div>
            <button className="recipe-btn">View Recipe</button>
          </div>
        </>
      )}
    </div>
  );
}

export default FoodCard;
