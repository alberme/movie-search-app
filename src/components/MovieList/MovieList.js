import { useState, useEffect } from "react";
import { PropTypes } from 'prop-types';

import MovieCard from "../MovieCard/MovieCard";
import MovieDetails from '../MovieDetails';
import Paginator from '../Paginator';
import MovieModal from '../MovieModal/MovieModal';

import MovieApi from '../../utils/movie.service';
import UserMovieListService from '../../utils/userMovieList.service';

import { MovieListContainer } from './styled';
/**
 * @param {*} movieQuery { search: string, type: string } 
 */
const MovieList = ({ movieQuery }) => {
  // Response can be: Init, Loading, True, False
  // PascalCase to keep consistent with the omdb api, except for totalResults
  const [movieListData, setMovieListData] = useState({ Response: "Init", Search: [], totalResults: 0, Error: null });
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  // const [movieListAlerts, setMovieListAlerts] = useState({
  //   addUserMovieAlert: "", // Success, Error

  // });
  const [currentPage, setCurrentPage] = useState(1);
  const userMovieListService = new UserMovieListService();

  /**
   * updates an individual property of movieListData state 
   * @param {string} key 
   * @param {*} value 
   */
  const updateMovieListData = (key, value) => {
    setMovieListData(oldMovieListData => {return { ...oldMovieListData, [key]: value }});
  }

  /**
   * handler for page change via Paginator
   * @param {number} newPage 
   */
  const handlePageChange = (newPage) => {
    updateMovieListData("Response", "Loading");
    setCurrentPage(newPage);
    // if new search you need to set currentPage back to 1 somehow
  }
  
  /**
   * handler for add movie button on a MovieCard
   * @param {string} id 
   */
  const handleAddMovieToUserList = (id) => {
    userMovieListService.addMovieToList(id);
    console.log(`added ${id} to user movie list!`);
    // maybe get a bootstrap alert going on here
  }

  /**
   * handler for show details button on a MovieCard
   * @param {string} id 
   */
  const handleOnShowDetails = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  }

  /**
   * handler for close button on MovieModal
   */
  const handleModalClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }

  /**
   * fetches a list of movies from MovieService with a given query
   * @param {Object} movieQuery
   * @param {string} movieQuery.search
   * @param {string} movieQuery.type
   * @param {number} page 
   */
  const getMovies = async ({ search, type }, page) => {
    const response = await MovieApi.fetchMovieDataByName(search, type, page); // maybeee wrap in try catch
    setMovieListData(response);
  }
  /**
   * render logic for MovieList
   * @param {*} movieListResponse 
   * @param {*} currentPage 
   */
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
          <MovieListContainer>
            <h2>Loading...</h2>
            <div className="movie-card-loading"></div>
          </MovieListContainer>
        );
      case "True":
        return (
          <>
            <MovieListContainer>
            {
              showModal && (
                <MovieModal
                  show={showModal}
                  onClose={handleModalClose}
                >
                  <MovieDetails selectedMovieId={selectedMovieId} />
                </MovieModal>
              )
            }
            {
              Search.map(movie => (
                <MovieCard
                  movie={movie}
                  key={movie.imdbID}
                  onShowDetails={handleOnShowDetails}
                  onAddToMovieList={handleAddMovieToUserList}
                />
              ))
            }
            </MovieListContainer>
            
            <Paginator
              currentPage={currentPage}
              totalResults={parseInt(totalResults)}
              onPageChange={handlePageChange}
            />
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

  return renderMovieList(movieListData, currentPage);
}

MovieList.propTypes = {
  movieQuery: PropTypes.shape({
    search: PropTypes.string,
    type: PropTypes.string
  }),
};

export default MovieList;