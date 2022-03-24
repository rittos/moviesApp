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

  const { data, error, isLoading, isError } = useQuery(["upcoming"], getUpcomingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
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
    />
  </>
  );
};
export default UpcomingMovies;