import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link  } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import PopularPeoplesPage from "./pages/popularPeoplesPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import peoplePage from "./pages/peopleDetailsPage";
import FantasyMoviePage from "./pages/fantasyMoviewPage";
import SearchMoviesPage from "./pages/searchMoviesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
     <SiteHeader />
     <MoviesContextProvider>
      <Switch>
        <Route exact path="/movies/searchmovie" component={SearchMoviesPage} />
        <Route exact path="/fantasymovie" component={FantasyMoviePage} />
        <Route exact path="/people/popular" component={PopularPeoplesPage} />
        <Route path="/people/:id" component={peoplePage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} /> 
        <Route exact path="/movies/favourites" component={FavouriteMoviesPage} />        
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/" component={HomePage} />  
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));