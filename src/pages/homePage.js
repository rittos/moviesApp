import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ReactPaginate from 'react-paginate';
import './App.css'
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage = (props) => {
  //Pagination state properties
  const [perPage, setPerPage] = useState();
  const [page, setPage] = useState();
  const [pages, setPages] = useState();

  const [movies, setMovies] = useState([]);
  const favourites = movies.filter((m) => m.favourite);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  localStorage.setItem("favourites", JSON.stringify(favourites));

  const addToFavourites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  // pagination page click handler
  const handlePageClick = (event) => {
    let page = event.selected;
    page = page +1 ;
    setPage({page});
    // alert(page);
    getMovies(page).then(movies => {
      setMovies(movies.results);
    });
   }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };

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

  const displayedMovies = filterFunction(movies) 

  return (
    <>
    <div>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        selectFavourite={addToFavourites}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
      />
    </div>
    </>
  );
};
export default HomePage;