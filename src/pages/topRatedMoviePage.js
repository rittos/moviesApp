import React ,{useState}from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import useFiltering from "../hooks/useFiltering";
import Spinner from "../components/spinner";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  languageFilter
} from "../components/movieFilterUI";

const TopRatedMovies = (props) => {

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

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["toprated", { page: page }], getTopRatedMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, languageFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // pagination page click handler
  const handlePageClick = (event) => {
    let currentpage = event.selected;
    currentpage = currentpage +1 ;
    setPage(currentpage);
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
  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
    <PageTemplate
    title="Top Rated Movies"
    movies={displayedMovies}
    action={(movie) => {
      return <AddToFavouritesIcon movie={movie} />
    }}
  />
    <MovieFilterUI
    filterInputChange={changeFilterValues}
    titleFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
    languageFilter={filterValues[2].value}
    />
    <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} disabled={page == 1? true:false} onClick={previousClickHandler}>Previous</button>
      <span style={{ backgroundColor: "#ff4557", margin:3,padding:5,borderRadius:3, color: "white"}}> {page} </span>
      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} onClick= {nextClickHandler}>Next</button>
  </>
  );
};
export default TopRatedMovies;