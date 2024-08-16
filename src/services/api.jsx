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
  try {
    axios.get(url, options).then((response) => console.log(response.data));
  } catch (err) {
    console.error(err);
  }
};
export default fetchData;
