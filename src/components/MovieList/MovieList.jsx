import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <main className={css.mainMovieList}>
      <ul className={css.movieList}>
        {movies.map((movie) => {
          return (
            <li className={css.movieItem} key={movie.id}>
              <Link
                className={css.movieTitle}
                state={{ from: location }}
                to={`/movies/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MovieList;
