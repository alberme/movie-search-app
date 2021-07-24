import { useEffect, useState } from 'react';

import UserMovieListService from '../../utils/userMovieList.service';
import MovieCard from '../MovieCard/MovieCard';
import MovieDetails from '../MovieDetails';
import {Modal} from '../Modal';

export const UserMovieList = () => {
  
  // const [movieData, setMovieData] = useState({
  //   selectedMovieId: '',
  //   userMovieList: [],
  // });
  const [userMovieList, setUserMovieList] = useState([]);

  // const renderUserMovieList = () => {
  //   const userMovies = userMovieListService.getMovieList();
  // }

  useEffect(() => {
    const userMovieListService = new UserMovieListService();
    // const updateMovieData = ({ key, value }) => {
    //   setMovieData({ ...movieData, [key]: value });
    // };
    const getMovieList = async () => {
      const movieList = await userMovieListService.getMovieList();
      setUserMovieList(movieList.list);
    }
    getMovieList();
    // console.log(movieData);
  }, [setUserMovieList]);

  return (
    <div className="movie-list-container">
      <h1>User Movie List</h1>
      {userMovieList}
    </div>
  )
}