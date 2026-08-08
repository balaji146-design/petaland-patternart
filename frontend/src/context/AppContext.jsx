import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getFeaturedDesigns } from "../services/designService.js";
import { getCategories } from "../services/categoryService.js";
import { getBanner } from "../services/bannerService.js";
import {
  APP_NAME,
  WHATSAPP_NUMBER,
  SOCIAL_LINKS,
  BUSINESS_DETAILS,
  DEFAULT_THEME,
} from "../utils/constants.js";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [theme] = useState(DEFAULT_THEME);

  const [businessInfo] = useState({
    name: APP_NAME,
    whatsappNumber: WHATSAPP_NUMBER,
    socialLinks: SOCIAL_LINKS,
    ...BUSINESS_DETAILS,
  });

  const [banner, setBanner] = useState(null);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [bannerError, setBannerError] = useState(null);

  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [featuredError, setFeaturedError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  const fetchBanner = useCallback(async () => {
    setIsBannerLoading(true);
    setBannerError(null);

    try {
      const response = await getBanner();
      setBanner(response?.data || response || null);
    } catch (err) {
      setBannerError(err?.message || "Failed to fetch banner.");
    } finally {
      setIsBannerLoading(false);
    }
  }, []);

  const fetchFeaturedDesigns = useCallback(async () => {
    setIsFeaturedLoading(true);
    setFeaturedError(null);

    try {
      const response = await getFeaturedDesigns();
      setFeaturedDesigns(response?.data || response || []);
    } catch (err) {
      setFeaturedError(err?.message || "Failed to fetch featured designs.");
    } finally {
      setIsFeaturedLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError(null);

    try {
      const response = await getCategories();
      setCategories(response?.data || response || []);
    } catch (err) {
      setCategoriesError(err?.message || "Failed to fetch categories.");
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      businessInfo,
      banner,
      isBannerLoading,
      bannerError,
      fetchBanner,
      featuredDesigns,
      isFeaturedLoading,
      featuredError,
      fetchFeaturedDesigns,
      categories,
      isCategoriesLoading,
      categoriesError,
      fetchCategories,
    }),
    [
      theme,
      businessInfo,
      banner,
      isBannerLoading,
      bannerError,
      fetchBanner,
      featuredDesigns,
      isFeaturedLoading,
      featuredError,
      fetchFeaturedDesigns,
      categories,
      isCategoriesLoading,
      categoriesError,
      fetchCategories,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}

export default AppContext;