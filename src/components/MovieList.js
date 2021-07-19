import { useState, useEffect } from "react";
import { PropTypes } from 'prop-types';

import { MovieCard } from "./MovieCard";
import { MovieDetails } from './MovieDetails';
import Paginator from './Paginator';
import MovieApi from '../utils/movie.service.js';
import { Modal } from './Modal';

/**
 * @param {*} movieQuery { search: string, type: string } 
 */
const MovieList = ({ movieQuery }) => {
  // Response can be: Init, Loading, True, False
  // PascalCase to keep consistent with the omdb api, except for totalResults
  const [movieListResponse, setMovieListResponse] = useState({ Response: "Init", Search: [], totalResults: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleModalClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }
  const handleCardClick = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  }

  const handlePageChange = (newPage) => {
    setMovieListResponse({ ...movieListResponse, Response: "Loading" });
    setCurrentPage(newPage);
    // if new search you need to set currentPage back to 1 somehow
  }

  const getMovies = async ({ search, type }, queryPage) => {
    const response = await MovieApi.fetchMovieDataByName(search, type, queryPage); // maybeee wrap in try catch
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
              Search.map(({ Title, Type, Poster, imdbID }) => (
                <MovieCard Title={Title} Type={Type} Poster={Poster} imdbID={imdbID} onClick={handleCardClick} key={imdbID} />
              ))
            }
            {
              showModal && renderModal(selectedMovieId)
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

  const renderModal = (id) => (
    <Modal onClose={handleModalClose}>
      <MovieDetails selectedMovieId={id} />
    </Modal>
  );

  // const currentMovie = movieList[showModal] ? movieList[showModal] : null; // selectedMovie

  useEffect(() => {
    if (movieQuery && !showModal) {
      getMovies(movieQuery, currentPage);
    }
  }, [showModal, movieQuery, currentPage])

  // return !showModal ? renderMovieList(movieListResponse, currentPage) : renderModal(selectedMovieId);

  return renderMovieList(movieListResponse, currentPage);
  
}

MovieList.propTypes = {
  movieQuery: PropTypes.shape({
    search: PropTypes.string,
    type: PropTypes.string
  })
};

export default MovieList;