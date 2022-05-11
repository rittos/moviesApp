import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/movie-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { languageFilter, titleFilter, paramSort } from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import useSorting from "../hooks/useSorting";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
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

const FavouriteMoviesPage = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, languageFiltering]
  );
  const { sortValues, setSortValues, sortFunction } = useSorting(
    [],
    [paramSorting]
  );

  // Create an array of queries and run in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  var displayMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

    displayMovies = sortFunction(displayMovies);

  const toDo = () => true;

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

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        sortInputChange={changeSortValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        languageFilter={filterValues[2].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;