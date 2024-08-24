import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsData } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const moviesReviewData = async () => {
      try {
        setLoading(true);
        const data = await fetchReviewsData(movieId);

        setReviews(data.results);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    moviesReviewData();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <p>Authors: {review.author}</p>
                <p>{review.content}</p>
                <p>{review.created_at}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no reviews</p>
      )}
    </>
  );
};

export default MovieReviews;
