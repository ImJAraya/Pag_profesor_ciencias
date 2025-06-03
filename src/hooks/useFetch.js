import { useState, useEffect, useRef } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Para evitar fetch duplicado si la URL no cambia
  const urlRef = useRef(null);

  useEffect(() => {
    if (!url) return;            
    if (url === urlRef.current) return;
    urlRef.current = url;

    async function doFetch() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    doFetch();

    // Si quieres abortar el fetch al desmontar, podrías agregar un AbortController aquí.
  }, [url, options]);

  return { data, loading, error };
}
