import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import MovieApi from '../utils/movie.service.js';
import "../styles/MovieDetails.css";

const MovieDetails = ({ selectedMovieId }) => {
  const [details, setDetails] = useState({});

  const getMovie = async (id) => {
    const movieResponse = await MovieApi.fetchMovieDataById(id);
    setDetails(movieResponse);
  }

  useEffect(() => {
    getMovie(selectedMovieId) // maybe type check this
  }, [selectedMovieId]);

  // empty object state means were still loading...
  if (Object.entries(details).length === 0) {
    return <h2>Loading...</h2>
  // api returns an error
  } else if (details.Error) {
    return (
    <div className="movie-list-error">
      <h2>{details.Error}</h2>
    </div>
    )
  }
  //{ Poster, Title, Rated, Runtime, Genre, Plot, Actors, imdbRating }
  return (
    <div>
      <div className="movie-poster-container">
        <img src={details.Poster} alt={details.Title}/>
      </div>
      <div className="movie-details-container">
        <div className="information-container">
          <h2 className="title">{details.Title}</h2>
          <span className="rating">{details.imdbRating}</span>
          {/* careful Ratings is an array */}
        </div>
        {/* ButtonContainer */}
        <div className="button-container">
          <div className="button">{details.Rated}</div>
          <div className="button">{details.Runtime}</div>
          <div className="button">{details.Genre}</div>
        </div>
        {/* DescriptionContainer */}
        <div className="description-container">
          <h3>Plot</h3>
          <p>{details.Plot}</p>
        </div>
        <div className="description-container">
          <h3>Actors</h3>
          <p>{details.Actors}</p>
        </div>
      </div>
    </div>
  )
}

MovieDetails.propTypes = {
  selectedMovieId: PropTypes.string
};

export default MovieDetails;