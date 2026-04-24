import { useEffect, useState } from "react";
import Image1 from "../assets/food1.jpg";
import Image2 from "../assets/food2.jpg";
import Image3 from "../assets/food3.jpg";
import HeroSection from "../components/hero/HeroSection";
import Navbar from "../components/layout/Navbar";
import RecipesSection from "../components/recipes/RecipesSection";
import { useRecipes } from "../hooks/useRecipes";

const RECIPE_LIMIT = 12;
const SLIDE_CHANGE_DELAY_MS = 4000;
const GALLERY_IMAGES = [Image1, Image2, Image3];

function FoodPage() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { recipes, isLoading, errorMessage } = useRecipes(RECIPE_LIMIT);

  useEffect(() => {
    // Move to the next slide every few seconds to keep the hero lively.
    const slideTimer = setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % GALLERY_IMAGES.length);
    }, SLIDE_CHANGE_DELAY_MS);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection
        galleryImages={GALLERY_IMAGES}
        activeSlide={activeSlideIndex}
        onDotClick={setActiveSlideIndex}
      />
      <RecipesSection
        recipes={recipes}
        isLoading={isLoading}
        errorMessage={errorMessage}
        galleryImages={GALLERY_IMAGES}
        placeholderCount={RECIPE_LIMIT}
      />
    </>
  );
}

export default FoodPage;
