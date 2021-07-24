// import MovieService from './movie.service';

export default class UserMovieListService {
  async addMovieToList(id) {
    // const movie = await MovieService.fetchMovieDataById(id);
    const movie = id;

    let movieList = localStorage.getItem('movieList');

    if (movieList) {
      movieList = JSON.parse(movieList);
      movieList.list.push(movie);
    }

    if (!movieList) {
      movieList = {list: [movie]};
    }
    localStorage.setItem('movieList', JSON.stringify(movieList));

  }
  
  getMovieList() {
    let movieList = localStorage.getItem('movieList');

    if (!movieList) {
      movieList = [];
    }

    return JSON.parse(movieList);
  }
}