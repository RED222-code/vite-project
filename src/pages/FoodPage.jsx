import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import FoodCard from "../components/FoodCard";
import Img1 from "../assets/food1.jpg";
import Img2 from "../assets/food2.jpg";
import Img3 from "../assets/food3.jpg";

const LOADING_DELAY_MS = 2000;
const FALLBACK_IMAGES = [Img1, Img2, Img3];

const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

const buildDescription = (meal) => {
  const ingredients = Array.from({ length: 20 }, (_, index) =>
    meal[`strIngredient${index + 1}`]?.trim()
  ).filter(Boolean);

  if (meal.strInstructions) {
    return `${meal.strInstructions.slice(0, 110).trim()}...`;
  }

  if (ingredients.length > 0) {
    return `Made with ${ingredients.slice(0, 4).join(", ")}.`;
  }

  return "A tasty recipe fresh from TheMealDB collection.";
};

const fetchRecipes = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");

  if (!response.ok) {
    throw new Error("Unable to fetch recipes.");
  }

  const data = await response.json();
  const meals = data.meals ?? [];

  return meals.slice(0, 6).map((meal, index) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    description: buildDescription(meal),
    time: `${20 + index * 5} mins`,
    servings: 2 + (index % 4),
    image: meal.strMealThumb || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
  }));
};

const FoodPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [Img1, Img2, Img3];

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [data] = await Promise.all([fetchRecipes(), wait(LOADING_DELAY_MS)]);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setErrorMessage("We couldn't load recipes right now. Please try again.");
        await wait(LOADING_DELAY_MS);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, [galleryImages.length]);

  return (
    <>
      <Navbar />

      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-content">
            <h1>
              A <span className="highlight">recipe</span> of happiness :)
            </h1>
            <h2>Cook like a chef</h2>
            <div className="button-group">
              <button className="btn btn-primary">Explore recipes</button>
              <button className="btn btn-outline">Watch videos</button>
            </div>
            <div className="hero-stats">
              <div className="stat-box">
                <strong>120+</strong>
                <span>easy recipes</span>
              </div>
              <div className="stat-box">
                <strong>15 min</strong>
                <span>quick ideas</span>
              </div>
              <div className="stat-box">
                <strong>4.9/5</strong>
                <span>home rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-slideshow">
            <div className="slideshow-frame">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`slide ${idx === activeSlide ? "is-active" : ""}`}
                >
                  <img src={img} alt={`Featured recipe ${idx + 1}`} />
                </div>
              ))}
              <div className="slideshow-overlay" />
            </div>

            <div className="slideshow-dots" aria-label="Recipe slideshow navigation">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slide-dot ${idx === activeSlide ? "is-active" : ""}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Show slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recipes-section">
        <div className="recipes-container">
          <div className="section-head">
            <div>
              <p className="section-label">Featured collection</p>
              <h2 className="section-title">Our Featured Recipes</h2>
            </div>
            <p className="section-copy">
              Fresh recipe ideas loaded from TheMealDB for lunch, dinner, and
              dessert inspiration.
            </p>
          </div>
          {errorMessage ? <p className="recipes-error">{errorMessage}</p> : null}
          <div className="recipes-grid">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <FoodCard key={index} isLoading={isLoading} />
                ))
              : recipes.map((recipe) => (
                  <FoodCard
                    key={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    description={recipe.description}
                    time={recipe.time}
                    servings={recipe.servings}
                    isLoading={isLoading}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodPage;
