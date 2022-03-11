import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getMovies } from "../api/tmdb-api";
// import Pagination from '@material-ui/lab/Pagination';
// import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css'

const HomePage = (props) => {
  const [perPage, setPerPage] = useState();
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  const [movies, setMovies] = useState([]);
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  const addToFavourites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  const handlePageClick = (event) => {
    let page = event.selected;
    page = page +1 ;
    setPage({page});
    // alert(page);
    getMovies(page).then(movies => {
      setMovies(movies.results);
    });
   }

  useEffect(() => {
    setPage(1);
    // setPages(10);
    setPerPage(10);
    getMovies(page).then(movies => {
      setMovies(movies.results);
      // alert(movies.data.total_pages);
      setPages(movies.total_pages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div>
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
    {/* <div style={{ display: 'block', padding: 10, backgroundColor: '#75cda4', marginTop: 10 }}>
      <Pagination count={10} />
    </div> */}
    <ReactPaginate
      previousLabel={'prev'}
      nextLabel={'next'}
      pageCount={pages}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
/>
    </div>
  );
};
export default HomePage;