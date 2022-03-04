import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link  } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import SiteHeader from './components/siteHeader'

const App = () => {
  return (
    <BrowserRouter>
     <SiteHeader />
      <Switch>
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} /> 
        <Route exact path="/movies/favourites" component={FavouriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/" component={HomePage} />  
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));