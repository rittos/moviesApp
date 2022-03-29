import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import useFiltering from "../hooks/useFiltering";
import Spinner from "../components/spinner";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  languageFilter
} from "../components/movieFilterUI";

const UpcomingMovies = (props) => {

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
  const { data, error, isLoading, isError } = useQuery(["upcoming"], getUpcomingMovies);
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
    title="Upcoming Movies"
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
  </>
  );
};
export default UpcomingMovies;