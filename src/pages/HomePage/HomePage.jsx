import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import fetchData from "../../services/api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await fetchData();

        setMovies(moviesData.results);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {error && <ErrorMessage />}
      {<MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
