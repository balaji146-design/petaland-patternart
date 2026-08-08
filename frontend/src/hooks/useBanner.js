import { useEffect, useState } from "react";
import api from "../services/api";

export default function useBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      try {
        // const res = await api.get("/banners");
        const res = await api.get("/banners/current");
        setBanner(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanner();
  }, []);

  return { banner, loading };
}