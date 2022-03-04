import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMovies = (props) => {
  const [upcomingmovies, setUpcomingMovies] = useState([]);
  const favourites = upcomingmovies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  const addToFavourites = (movieId) => {
    const updatedMovies = upcomingmovies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setUpcomingMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(upcomingmovies => {
        setUpcomingMovies(upcomingmovies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={upcomingmovies}
      selectFavourite={addToFavourites}
    />
  );
};
export default UpcomingMovies;