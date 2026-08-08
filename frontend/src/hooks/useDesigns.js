import { useCallback, useEffect, useState } from "react";
import {
  getAllDesigns,
  getDesignById,
  getFeaturedDesigns,
} from "../services/designService.js";

export function useDesigns(params = {}) {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDesigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllDesigns(params);
      setDesigns(response?.data || response || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch designs.");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  return { designs, isLoading, error, refresh: fetchDesigns };
}

export function useFeaturedDesigns() {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedDesigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getFeaturedDesigns();
      setFeaturedDesigns(response?.data || response || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch featured designs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedDesigns();
  }, [fetchFeaturedDesigns]);

  return { featuredDesigns, isLoading, error, refresh: fetchFeaturedDesigns };
}

export function useDesign(id) {
  const [design, setDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const fetchDesign = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getDesignById(id);
      setDesign(response?.data || response || null);
    } catch (err) {
      setError(err?.message || "Failed to fetch design details.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDesign();
  }, [fetchDesign]);

  return { design, isLoading, error, refresh: fetchDesign };
}

export default useDesigns;