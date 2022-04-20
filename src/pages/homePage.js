import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useSorting from "../hooks/useSorting";
import useFiltering from "../hooks/useFiltering";
import ReactPaginate from 'react-paginate';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import './App.css'
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  languageFilter,
  paramSort
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
const languageFiltering = {
  name: "language",
  value: "",
  condition: languageFilter,
};

const paramSorting = {
  name: "Title Ascending",
  value: "title_asc",
  condition: paramSort,
};

const HomePage = (props) => {
  //Pagination state properties
  // const [perPage, setPerPage] = useState();
  const [page, setPage] = useState(1);
  // const [pages, setPages] = useState(100);

  const { data, error, isLoading, isError } = useQuery(["discover", page], getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, languageFiltering]
  );

  const { sortValues, setSortValues, sortFunction } = useSorting(
    [],
    [paramSorting]
  );

  // pagination page click handler
  const handlePageClick = (event) => {
    let currentpage = event.selected;
    currentpage = currentpage +1 ;
    setPage(currentpage);
    // setPages(100);
    // alert(page);
    // getMovies(page).then(movies => {
    //   setMovies(movies.results);
    // });
   }

   const nextClickHandler = (event) => {
    let currentpage = page;
    currentpage = currentpage +1 ;
    setPage(currentpage);
   }
   const previousClickHandler = (event) => {
    let currentpage = page;
    if(currentpage ==1)
    {

    }
    else{
      currentpage = currentpage -1 ;
    }
    setPage(currentpage);
   }

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    var newFilters = [];
      // type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
      switch(type){
        case "title":
          newFilters = [newf, filterValues[1], filterValues[2]];
          break;
        case "genre":
          newFilters =  [filterValues[0], newf, filterValues[2]];
          break;
        case "language":
          newFilters =  [filterValues[0],filterValues[1], newf];
          break;
        default:
          newFilters = [];
          break;


      }
    setFilterValues(newFilters);
  };

  const changeSortValues = (type, value) => {
    const sortValues = { name: type, value: value };
    setSortValues(sortValues);
  }

  const movies = data ? data.results : [];
  var displayedMovies = filterFunction(movies);
  displayedMovies = sortFunction(displayedMovies);

  return (
    <>
    <div>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        sortInputChange={changeSortValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        languageFilter={filterValues[2].value}
        paramSort={sortValues.value}
      />
      {/* <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            
      /> */}
      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} disabled={page == 1? true:false} onClick={previousClickHandler}>Previous</button>
      <span style={{ backgroundColor: "#ff4557", margin:3,padding:5,borderRadius:3, color: "white"}}> {page} </span>
      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} onClick= {nextClickHandler}>Next</button>
    </div>
    </>
  );
};
export default HomePage;