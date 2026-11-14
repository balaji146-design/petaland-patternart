import { useCallback, useEffect, useState } from "react";

function useFetch(fetchFn, params = null, options = {}) {
  const { immediate = true, deps = [] } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response =
        params !== null && params !== undefined
          ? await fetchFn(params)
          : await fetchFn();

      setData(response);
      return response;
    } catch (err) {
      const message =
        err?.message || "Something went wrong while fetching data.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, params]);

  useEffect(() => {
    if (immediate) {
      fetchData().catch(() => {});
    }
  }, [immediate, ...deps]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, isLoading, error, refetch, setData };
}

export default useFetch;