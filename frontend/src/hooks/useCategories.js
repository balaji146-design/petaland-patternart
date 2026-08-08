import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../services/categoryService.js";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCategories();
      setCategories(response?.data || response || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, refresh: fetchCategories };
}

export default useCategories;