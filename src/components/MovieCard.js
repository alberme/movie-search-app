import "../styles/MovieCard.css";

// Poster can be N/A
export const MovieCard = ({ Title, Type, Poster, imdbID, onClick }) => {
  const handleError = (e) => {
    console.log(`"${e.target.alt}" poster could not be loaded!`);
  }
  return (
    <div className="movie-card" onClick={() => onClick(imdbID)}>
      <img className="movie-poster" src={Poster !== "N/A" ? Poster : `${process.env.PUBLIC_URL}/poster-placeholder.png`} alt={Title} onError={handleError}/>
      <div className="movie-title-container">
        <h4 className="movie-title">{Title}</h4>
        <div className="movie-type">{Type}</div>
      </div>
      
    </div>
    );
  }