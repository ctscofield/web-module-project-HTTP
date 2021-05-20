import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import AddMovieForm from "./components/AddMovieForm";
import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {

    const newMovies = movies.filter((obj) => {
      return obj.id !== id;
    })

    setMovies(newMovies);

    // movies.filter(setMovies, `${id}`);

    // let newMovies = movies.filter = e => {
    //   return e.id !== movies.id;
    // }

    // let newMovies = [];
    // for (let i = 0; i < movies.length; i++) {
    //   if (movies[i].id !== `${movies.id}`) {
    //     newMovies.push(movies[i]);
    //   }
    // }
    // console.log(newMovies);

  //   movies.filter((obj) => {
  //   return obj.id !== movies;
  // })

    // movies.filter(id !== movies);

    // movies.filter((obj) => {
    //   return obj.id !== movies;
    // })
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id"
              render={(props) => <EditMovieForm {...props} setMovies={setMovies}/>}
            />

            <Route path="/movies/add"
              render={(props) => <AddMovieForm {...props} setMovies={setMovies}/>}
            />

            <Route path="/movies/:id"
              render={(props) => <Movie {...props} deleteMovie={deleteMovie}/> }
            />

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

