import { PropTypes } from 'prop-types';
import { RBMovieCard, StyledButtonContainer } from './styled';
import { RBButton } from '../Button/styled';
import { Row, Col } from 'react-bootstrap';


// Poster can be N/A
const MovieCard = ({ movie, onShowDetails, onAddToMovieList, onRemoveFromMovieList }) => {
  const {Title, Type, Poster, imdbID} = movie;

  const handleError = (e) => {
    console.log(`"${e.target.alt}" poster could not be loaded!`);
  }
  return (
    <RBMovieCard>
      <RBMovieCard.Img
        variant="top"
        src={Poster !== "N/A" ? Poster : `${process.env.PUBLIC_URL}/poster-placeholder.png`}
        alt={Title}
        onError={handleError}
      />
      <RBMovieCard.Body>
        <RBMovieCard.Title>{Title}</RBMovieCard.Title>
        <RBButton className="movie-type" variant="outline-primary" size="sm" disabled>{Type}</RBButton>
        {/* maybe put those buttons in the body here */}
      </RBMovieCard.Body>
        <StyledButtonContainer>
          <RBButton variant="outline-primary" size="sm" onClick={() => onShowDetails(imdbID)}>Show Details</RBButton>
        {
          onAddToMovieList && (
            <RBButton
              variant="outline-primary"
              onClick={() => onAddToMovieList(imdbID)}
            >
            Add Movie
            </RBButton>
          )
        }
        {
          onRemoveFromMovieList && (
            <RBButton
              variant="outline-primary"
              onClick={() => onRemoveFromMovieList(imdbID)}
            >
            Remove Movie
            </RBButton>
          )
        }
        </StyledButtonContainer>    
    </RBMovieCard>
    );
  }

  MovieCard.propTypes = {
    movie: PropTypes.object,
    onShowDetails: PropTypes.func,
    onAddToMovieList: PropTypes.func,
    onRemoveFromMovieList: PropTypes.func,
  };

  export default MovieCard;

  /**
   * <div className="movie-card">
      <img className="movie-poster" src={Poster !== "N/A" ? Poster : `${process.env.PUBLIC_URL}/poster-placeholder.png`} alt={Title} onError={handleError}/>
      <div className="movie-title-container">
        <h5 className="movie-title">{Title}</h5>
        <div className="movie-type">{Type}</div>
      </div>
      <button onClick={() => onShowDetails(imdbID)}>Show Details</button>
      {
        onAddToMovieList && (
          <button onClick={() => onAddToMovieList(imdbID)}>
            Add Movie
          </button>
        )
      }
    </div>
   */