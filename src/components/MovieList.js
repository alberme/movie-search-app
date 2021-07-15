import { MovieCard } from "./MovieCard";
import { MovieDetails } from './MovieDetails'
import { useState, useEffect } from "react";
import MovieApi from '../utils/api.js';
import { Modal } from './Modal';

/**
 * @param {*} movieQuery { search: string, type: string } 
 */
export const MovieList = ({ movieQuery }) => {
  const [movieList, setMovieList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");

  // const showMovieData = (index) => {
  //   if (index === showMovie) return setShowMovie(false);
  //   setShowMovie(index);
  // }
  const onClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }
  const onClick = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  }

  const getMovies = async ({ search, type }) => {
    const movies = await MovieApi.fetchMovieDataByName(search, type);
    setMovieList(movies.Search ? movies.Search : movies);
  }

  const renderMovieList = () => {
    // console.log(movieList);
    return !movieList.Error ? (
      <div className="movie-list-container">
        {
          movieList.map(({ Title, Type, Poster, imdbID }) => (
            <MovieCard Title={Title} Type={Type} Poster={Poster} imdbID={imdbID} onClick={onClick} key={imdbID} />
          ))
        }
      </div>
    ) : (
      <div className="movie-list-error">
        <h2>Could not find {movieQuery.search}!</h2>
      </div>
    )
  }

  const renderModal = () => (
    <Modal onClose={onClose}>
      <MovieDetails selectedMovieId={selectedMovieId} />
    </Modal>
  );

  // const currentMovie = movieList[showModal] ? movieList[showModal] : null; // selectedMovie

  useEffect(() => {
    if (movieQuery && !showModal) {
      getMovies(movieQuery);
    }
  }, [showModal, movieQuery])

  return !showModal ? renderMovieList() : renderModal();
  
}