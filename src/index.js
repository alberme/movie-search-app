// import { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MovieList from './components/MovieList';
import {UserMovieList} from './components/UserMovieList/UserMovieList'
import Nav from './components/nav/Nav';
// import reportWebVitals from './reportWebVitals';

// import { Pagination } from './components/challenge/Pagination'

ReactDOM.render(
  // <App />
  // <Pagination />
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/user-movie-list" component={UserMovieList} />
    </Switch>
  </Router>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
