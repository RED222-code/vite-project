import PotLoader from "./PotLoader";

function FoodCard({ recipe, isLoading }) {
  if (isLoading) {
    return (
      <div className="food-card">
        <PotLoader />
      </div>
    );
  }

  const { image, name, description, servings, time } = recipe;

  return (
    <div className="food-card">
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
    </div>
  );
}

export default FoodCard;

