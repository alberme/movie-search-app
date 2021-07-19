import './App.css';
import { useState } from 'react';
import MovieList from "./components/MovieList";
import { SearchBar } from "./components/SearchBar";
import './styles/App.css';
// const success = {"Search":[{"Title":"The Avengers","Year":"2012","imdbID":"tt0848228","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Avengers: Endgame","Year":"2019","imdbID":"tt4154796","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"},{"Title":"Avengers: Infinity War","Year":"2018","imdbID":"tt4154756","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"},{"Title":"Avengers: Age of Ultron","Year":"2015","imdbID":"tt2395427","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"},{"Title":"The Avengers","Year":"1998","imdbID":"tt0118661","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"},{"Title":"The Avengers: Earth's Mightiest Heroes","Year":"2010–2012","imdbID":"tt1626038","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"},{"Title":"Ultimate Avengers: The Movie","Year":"2006","imdbID":"tt0491703","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg"},{"Title":"Ultimate Avengers II","Year":"2006","imdbID":"tt0803093","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"The Avengers","Year":"1961–1969","imdbID":"tt0054518","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"},{"Title":"Avengers Assemble","Year":"2012–2019","imdbID":"tt2455546","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"}],"totalResults":"115","Response":"True"}
// const error = {"Error": "Could not find movie", "Response": "False"}

/**
 * spotify
 * Client ID 114d61979bc74802aeadd07c30a0265e
    Client Secret df5f577f50eb4f3686bf1b1fce02d50f

    https://api.spotify.com/v1/search?q=Solo%3A%20A%20Star%20Wars%20Story%20soundtrack&type=playlist"
    -H "Accept: application/json" 
    -H "Content-Type: application/json"
    -H "Authorization: Bearer BQCrmFNXEz_BZ_YBIY5BcdVCOBwtKib7x3Jc6ZE58kMGwMqRQPictnG9MI2-H2u_DVCVKkCSRKoro9tOGwytiN-GP1j6MN7AP7qVzsCDLT_tS8_MLH9Af4TShNK-0CH_pps0sOyDp-kYpZkKXUcoPvdw6oG_6cDgJQ8
 */


function App() {
  const [movieQuery, updateMovieQuery] = useState();
  const [modalIsOpen, updateModalIsOpen] = useState(false);
  // const [pageNumber, ]
  const handleSearch = (query) => {
    console.log(query);
    updateMovieQuery(query);
  }
  const handleModalEvent = () => {
    
  }

  return (
    <div className="App">
      <div className="movie-app-container">
        <SearchBar onSubmit={handleSearch} />
        <MovieList movieQuery={movieQuery} />
      </div>
    </div>
  );
}

export default App;
