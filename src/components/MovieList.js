import { useState, useEffect } from "react";
import { PropTypes } from 'prop-types';

import MovieCard from "./MovieCard/MovieCard";
// import { MovieDetails } from './MovieDetails';
import Paginator from './Paginator';
import MovieApi from '../utils/movie.service.js';
import UserMovieListService from '../utils/userMovieList.service';
// import { Modal } from './Modal';

/**
 * @param {*} movieQuery { search: string, type: string } 
 */
const MovieList = ({ movieQuery, onSelection: handleSelection }) => {
  // Response can be: Init, Loading, True, False
  // PascalCase to keep consistent with the omdb api, except for totalResults
  const [movieListResponse, setMovieListResponse] = useState({ Response: "Init", Search: [], totalResults: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const userMovieListService = new UserMovieListService();

  const handlePageChange = (newPage) => {
    setMovieListResponse({ ...movieListResponse, Response: "Loading" });
    setCurrentPage(newPage);
    // if new search you need to set currentPage back to 1 somehow
  }
  
  const handleAddMovieToUserList = (id) => {
    userMovieListService.addMovieToList(id);
  }


  const getMovies = async ({ search, type }, page) => {
    const response = await MovieApi.fetchMovieDataByName(search, type, page); // maybeee wrap in try catch
    setMovieListResponse(response);
  }
  const renderMovieList = (movieListResponse, currentPage) => {
    const { Response, Search, totalResults, Error } = movieListResponse;

    switch (Response) {
      case "Init":
        return (
          <div className="movie-init-container">
            <h2>Search for a Movie, TV Series, or Episode!</h2>
          </div>
        )
      case "Loading":
        return (
          <div className="movie-loading-container">
            <h2>Loading...</h2>
            <div className="movie-card-loading"></div>
          </div>
        );
      case "True":
        return (
          <>
            <div className="movie-list-container">
            {
              Search.map((movie) => (
                <MovieCard movie={movie} imdbID={movie.imdbID} key={movie.imdbID} onClick={handleSelection} onAddToMovieList={handleAddMovieToUserList}/>
              ))
            }
            {
              // showModal && renderModal(selectedMovieId)
            }
            </div>
            
            <Paginator currentPage={currentPage} totalResults={parseInt(totalResults)} onPageChange={handlePageChange} />
          </>
        )
      case "False":
        return (
          <div className="movie-error-container">
            <h2>Could not find {movieQuery.search}!</h2>
            <h2>{Error}</h2>
          </div>
        );
      default:
        console.warn(`renderMovieList(): unknown case ${Response}`)
    }
  }

  useEffect(() => {
    if (movieQuery && Object.keys(movieQuery).length > 0) {
      getMovies(movieQuery, currentPage);
    }
  }, [movieQuery, currentPage])

  return renderMovieList(movieListResponse, currentPage);
}

MovieList.propTypes = {
  movieQuery: PropTypes.shape({
    search: PropTypes.string,
    type: PropTypes.string
  }),
  onCardClick: PropTypes.func,
};

export default MovieList;