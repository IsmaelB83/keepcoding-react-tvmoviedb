/**
 * Own modules
 */
import Movie from '../models/Movie';

//  '3471742b3361211db42df61f0446ef6b'

/**
 * Objeto API
 */
class MovieDbAPI {

  /**
   * Constructor
   */
  constructor(KEY) {
    this.API_URL = 'https://api.themoviedb.org/3';
    this.API_KEY = KEY;
  }
  
  getRequest = (url) => {
    return fetch(url,
      { method: "GET" },
      { Accept: "application/json, text/plain, */*" }
    ).then(res => res.json());
  }

  checkApìKey = () => {
    try {
      return this.getRequest(`${this.API_URL}/discover/movie?api_key=${this.API_KEY}`)
      .then(res => {
        return res.status_code !== 7;
      });
    } catch (error) {
      return false;
    }
  }

  discoverMovies = (year) => {
    let baseURL = `${this.API_URL}/discover/movie?api_key=${this.API_KEY}`;
    if (year)  { 
      baseURL = `${baseURL}&primary_release_year=${year}`; 
    }
    return this.getRequest(baseURL)
    .then(res => res.results.map(mov => new Movie(mov)))
  }

  getMovie =  (movieID) => {
      return this.getRequest(`${this.API_URL}/movie/${movieID}?api_key=${this.API_KEY}`)
      .then(res => {
        return new Movie(res)
      });
  }

  searchMovies = (query, year) => {
    let baseURL = `${this.API_URL}/search/movie?api_key=${this.API_KEY}&query=${query}&page=1`;
    if (year)  { 
      baseURL = `${baseURL}&primary_release_year=${year}`; 
    }
    return this.getRequest(baseURL)
    .then(res => res.results.map(mov => new Movie(mov)));
  }
}

export default MovieDbAPI;