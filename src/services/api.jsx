import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmUxNTA4YjllYTMxMzgwZDI5MDUxNGUwOWY0OTMyOSIsIm5iZiI6MTcyMzY3NDE3MC4zNjA2Miwic3ViIjoiNjZiZDI5YWI2NTcyZDE2MGI3OWI1OGNjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hh-RXSg3bAbrJ1Ufpuf7YNF5ZjR6-JlbS2HRbNvyxGE",
  },
};
const fetchData = async () => {
  const { data } = await axios.get(url, options);
  return data;
};
export default fetchData;

export const fetchDetailData = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    options
  );
  return data;
};

export const fetchCastData = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    options
  );
  return data;
};

export const fetchReviewsData = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    options
  );
  return data;
};
