import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import FoodCard from "../components/FoodCard";
import Img1 from "../assets/food1.jpg";
import Img2 from "../assets/food2.jpg";
import Img3 from "../assets/food3.jpg";

const mockRecipes = [
  {
    id: 1,
    name: "Delicious Pasta",
    description: "Homemade pasta with fresh herbs and vegetables",
    time: "30 mins",
    servings: 4,
    image: Img1,
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description:
      "Perfectly grilled salmon with lemon butter sauce and roasted vegetables",
    time: "25 mins",
    servings: 2,
    image: Img2,
  },
  {
    id: 3,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with frozen bit and creamy topping",
    time: "45 mins",
    servings: 8,
    image: Img3,
  },
];

const fetchRecipes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecipes);
    }, 1500);
  });
};

const FoodPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [Img1, Img2, Img3];

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);

      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
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
              A neat selection of comforting dishes for lunch, dinner, and
              dessert.
            </p>
          </div>
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
