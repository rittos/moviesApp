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
import SignUpPage from "./pages/signUpPage";
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import PublicRoute from './components/publicRoute';
import PrivateRoute from './components/privateRoute';

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
     <AuthContextProvider>
     <SiteHeader />
     <MoviesContextProvider>
      <Switch>
        <PublicRoute restricted={true} path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route exact path="/movies/searchmovie" component={SearchMoviesPage} />
        <Route exact path="/fantasymovie" component={FantasyMoviePage} />
        <Route exact path="/people/popular" component={PopularPeoplesPage} />
        <Route path="/people/:id" component={peoplePage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} /> 
        <PrivateRoute exact path="/movies/favourites" component={FavouriteMoviesPage} />        
        <PrivateRoute path="/movies/:id" component={MoviePage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/" component={HomePage} />  
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));