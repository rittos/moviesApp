import React, { useState , useContext, useEffect} from "react";
import { addMovietoFavourites, getFavouriteMovies, removeFromFavorites } from "../api/movie-api";
import { AuthContext } from "../contexts/authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const authcontext = useContext(AuthContext);
  
  useEffect(() => {
    if(authcontext.userid !== ""){
      getFavouriteMovies(authcontext.userid).then((resp) => {
        setFavourites(resp);
      
    });
  }
  }, [authcontext.userid]);
  
  const addToFavourites = async (movie) => {
    let updatedFavourites = [...favourites];
    if (!updatedFavourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
      const result = await addMovietoFavourites(authcontext.userid, movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = async (movie) => {
    const result = await removeFromFavorites(authcontext.userid, movie.id);
    setFavourites(result.favourites);
    // setFavourites(favourites.filter((mId) => mId !== movie.id));
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