import "../styles/MovieCard.css";

// Poster can be N/A
export const MovieCard = ({ Title, Type, Poster, imdbID, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(imdbID)}>
      <img className="movie-poster" src={Poster} alt={Title} />
      <div className="movie-title-container">
        <h4 className="movie-title">{Title}</h4>
        <div className="movie-type">{Type}</div>
      </div>
      
    </div>
    );
  }