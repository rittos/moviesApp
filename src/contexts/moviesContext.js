import React, { useState , useContext} from "react";
import { addMovietoFavourites, getFavouriteMovies } from "../api/movie-api";
import { AuthContext } from "../contexts/authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const authcontext = useContext(AuthContext);


  const loadAllFavourites = async (movie) => {
    const resultfav = await getFavouriteMovies(authcontext.userid);
    const myfavourites =  resultfav.favourites.filter(t=>t != null);
    setFavourites(myfavourites)
  }
  loadAllFavourites();
  const addToFavourites = async (movie) => {
    let updatedFavourites = [...favourites];
    updatedFavourites = updatedFavourites.filter(t=>t != null)
    if (!updatedFavourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
      const result = await addMovietoFavourites(authcontext.userid, movie.id);
    }
    setFavourites(updatedFavourites);


    // if (result.token) {

    // }
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        setAuthenticated
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;