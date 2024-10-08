import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetailData } from "../../services/api";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  const btnGoBackRef = useRef(location.state?.from ?? "/");

  const defaultImg =
    "https://dummyimage.com/w200/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const moviesDetailsData = async () => {
      try {
        setLoading(true);
        const data = await fetchDetailData(movieId);

        setMovie(data);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    moviesDetailsData();
  }, [movieId]);

  function convertToPercentage(value) {
    const percentage = (value * 10).toFixed(0);
    return `${percentage}%`;
  }
  return (
    <main className={css.mainDetailPage}>
      <Link to={btnGoBackRef.current} className={css.goBackBtn}>
        Go Back
      </Link>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <div className={css.imgDescription}>
        <div>
          <img
            className={css.imgDetailPage}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
          />
        </div>
        <div className={css.description}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}> {movie.overview} </p>
          <h3>Country</h3>
          <ul className={css.list}>
            {movie.production_countries &&
              movie.production_countries.map((production_countriesItem) => {
                return (
                  <li key={production_countriesItem.name}>
                    <p>{production_countriesItem.name}</p>
                  </li>
                );
              })}
          </ul>
          <h3>Genres</h3>
          <ul className={css.list}>
            {movie.genres &&
              movie.genres.map((genre) => {
                return (
                  <li className={css.item} key={genre.id}>
                    {genre.name}
                  </li>
                );
              })}
          </ul>
          <h3>Release date</h3>
          <p>{movie.release_date}</p>
          <h3>
            User score:
            <span className={css.item}>
              {convertToPercentage(movie.vote_average)}
            </span>
          </h3>
        </div>
      </div>
      <h3>Additional information:</h3>
      <ul className={css.list}>
        <li>
          <Link className={css.addInf} to="cast">
            Cast
          </Link>
        </li>
        <li>
          <Link className={css.addInf} to="reviews">
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};

{
  /*
   */
}

export default MovieDetailsPage;
// vote_average
// poster_path;
// overview;
// original_title;
// id;
// genres;
