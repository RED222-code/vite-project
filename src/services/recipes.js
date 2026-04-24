const RECIPES_API_URL = "https://dummyjson.com/recipes";
const DEFAULT_DESCRIPTION = "A simple and tasty recipe idea.";

function getRecipeDescription(instructions) {
  if (!Array.isArray(instructions) || instructions.length === 0) {
    return DEFAULT_DESCRIPTION;
  }

  return instructions[0];
}

function getCookTimeLabel(cookTimeMinutes) {
  if (!cookTimeMinutes) {
    return "Quick recipe";
  }

  return `${cookTimeMinutes} mins`;
}

function mapRecipeToCardData(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    description: getRecipeDescription(recipe.instructions),
    time: getCookTimeLabel(recipe.cookTimeMinutes),
    servings: recipe.servings ?? "N/A",
    image: recipe.image ?? "",
  };
}

export async function fetchRecipes({ limit = 3, signal } = {}) {
  const query = new URLSearchParams({ limit: String(limit) });
  const response = await fetch(`${RECIPES_API_URL}?${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`);
  }

  const data = await response.json();
  const recipes = Array.isArray(data.recipes) ? data.recipes : [];

  return recipes.map(mapRecipeToCardData);
}
