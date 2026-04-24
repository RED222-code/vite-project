import { useEffect, useState } from "react";
import { fetchRecipes } from "../services/recipes";
import { wait } from "../utils/wait";

const DEFAULT_ERROR_MESSAGE = "We couldn't load recipes right now.";
const MINIMUM_LOADING_TIME_MS = 3000;

export function useRecipes(limit = 3) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipes() {
      setIsLoading(true);
      setErrorMessage("");

      // This keeps the loading animation visible long enough to be noticeable.
      const loadingDelay = wait(MINIMUM_LOADING_TIME_MS);

      try {
        const [nextRecipes] = await Promise.all([
          fetchRecipes({
            limit,
            signal: controller.signal,
          }),
          loadingDelay,
        ]);

        if (controller.signal.aborted) {
          return;
        }

        setRecipes(nextRecipes);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        await loadingDelay;

        if (controller.signal.aborted) {
          return;
        }

        console.error("Recipe fetch error:", error);
        setRecipes([]);
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadRecipes();

    return () => controller.abort();
  }, [limit]);

  return { recipes, isLoading, errorMessage };
}
