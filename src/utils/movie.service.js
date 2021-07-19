import axios from 'axios';

const myApiKey = process.env.REACT_APP_OMDB_API_KEY; //"39926dda"

export default class MovieApi {
  static async fetchMovieDataByName(title, type = "movie", page=1) {
    if (!title) {
      throw new TypeError(`fetchMovieDataByName(): Missing title param`);
    }
    const response = await axios.get(`https://www.omdbapi.com/?s=${title}&type=${type}&page=${page}&apikey=${myApiKey}`);
    return response.data;
  }

  static async fetchMovieDataById(id, type = "movie") {
    if (!id) {
      throw new TypeError(`fetchMovieDataById(): Missing id param`);
    }
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&type=${type}&apikey=${myApiKey}`);
    return response.data;
  }
}