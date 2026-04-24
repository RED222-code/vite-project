import FoodCard from "./FoodCard";

function createLoadingCards(cardCount) {
  return Array.from({ length: cardCount }, (_, index) => ({
    id: `loading-${index}`,
  }));
}

function addFallbackImages(recipes, galleryImages) {
  return recipes.map((recipe, index) => ({
    ...recipe,
    image: recipe.image || galleryImages[index % galleryImages.length],
  }));
}

function RecipesSection({
  recipes,
  isLoading,
  errorMessage,
  galleryImages,
  placeholderCount,
}) {
  const recipesWithImages = addFallbackImages(recipes, galleryImages);
  const cardsToDisplay = isLoading
    ? createLoadingCards(placeholderCount)
    : recipesWithImages;

  return (
    <section className="recipes-section">
      <div className="recipes-container">
        <div className="section-head">
          <div>
            <p className="section-label">Featured collection</p>
            <h2 className="section-title">Our Featured Recipes</h2>
          </div>
          <p className="section-copy">
            Fresh recipe ideas from DummyJSON for lunch, dinner, and dessert inspiration.
          </p>
        </div>

        {errorMessage ? <p className="recipes-error">{errorMessage}</p> : null}

        {!isLoading && !errorMessage && recipesWithImages.length === 0 ? (
          <p className="recipes-empty">No recipes are available right now.</p>
        ) : null}

        {/* When loading, we show placeholder cards with the same layout size. */}
        <div className="recipes-grid">
          {cardsToDisplay.map((recipe) => (
            <FoodCard key={recipe.id} recipe={recipe} isLoading={isLoading} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipesSection;
