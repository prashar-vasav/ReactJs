import { useState, useEffect } from "react";
const KEY = "60af688";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something Went Wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      console.log(movies);

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
