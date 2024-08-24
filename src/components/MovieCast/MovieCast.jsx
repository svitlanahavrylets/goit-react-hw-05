import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastData } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const moviesCastsData = async () => {
      try {
        setLoading(true);
        const data = await fetchCastData(movieId);

        setCast(data.cast);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    moviesCastsData();
  }, [movieId]);
  return (
    <section className={css.castSection}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {cast &&
          cast.map((castItem) => {
            return (
              <li className={css.item} key={castItem.id}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${castItem.profile_path}`}
                    alt={castItem.name}
                  />
                </div>
                <h3>{castItem.name}</h3>
                <p>
                  Character: <br /> {castItem.character}
                </p>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MovieCast;
