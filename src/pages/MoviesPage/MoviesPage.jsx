import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import css from "./MoviesPage.module.css";
import { fetchSearchMovies } from "../../services/api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    const searchMovies = async () => {
      if (!userQuery) return;

      try {
        setLoading(true);
        const data = await fetchSearchMovies(userQuery);
        console.log(data.results);
        setMovies(data.results);

        setError(false);
      } catch (error) {
        setError(true);
        toast.error("Something went wrong. Sorry! You can try again later");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [userQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchInputValue = event.target.userQuery.value.trim();

    if (searchInputValue === "") {
      toast.error("Please, enter the query");
      return {};
    } else {
      setSearchParams({
        query: searchInputValue,
      });
    }
  };

  return (
    <>
      {error && <ErrorMessage />}
      <main className={css.main}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <div className={css.divSearchForm}>
            <input className={css.input} type="text" name="userQuery" />
            <button className={css.searchBtn} type="submit">
              <FiSearch size="18" />
            </button>
          </div>
        </form>
        {loading && <Loader />}
        <MovieList movies={movies} />
        <Toaster position="top-right" />
      </main>
    </>
  );
};

export default MoviesPage;
