import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastData } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {cast &&
          cast.map((castItem) => {
            return (
              <li key={castItem.id}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${castItem.profile_path}`}
                    alt={castItem.name}
                  />
                </div>
                <h3>{castItem.name}</h3>
                <p>Character: {castItem.character}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MovieCast;
