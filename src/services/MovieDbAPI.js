import Movie from '../models/Movie';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '3471742b3361211db42df61f0446ef6b'

const getRequest = (url) => {
  return fetch(url,
   { method: "GET" },
   { Accept: "application/json, text/plain, */*" }
  ).then(res => res.json());
}

const discoverMovies = () => {
  return getRequest(`${API_URL}/discover/movie?api_key=${API_KEY}`)
  .then(res => res.results.map(mov => new Movie(mov)))
}

const getMovie = (movieID) => {
  return getRequest(`${API_URL}/movie/${movieID}?api_key=${API_KEY}`)
  .then(res => new Movie(res))
}

const searchMovies = (query) => {
  return getRequest(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`)
  .then(res => res.results.map(mov => new Movie(mov)))
}

export {
  searchMovies,
  discoverMovies,
  getMovie
};