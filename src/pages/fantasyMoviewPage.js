import React, { useState, useContext, useEffect }from "react";
import PageTemplate from '../components/templateFantasyMoviePage'
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { AuthContext } from "../contexts/authContext";
import { getFantasyMovie} from "../api/movie-api";

const FantasyMoviePage = (props) => {
  const authcontext = useContext(AuthContext);
  const [fantasymovie, setfantasymovie] = useState([]);

  useEffect(() => {
    getFantasyMovie(authcontext.userid).then((resp) => {
      setfantasymovie(resp);
    });
  }, [authcontext.userid]);
  return (
    <>
    <div>
    <PageTemplate
    title="Fantasy Movie"
    movie={fantasymovie}
  />
    </div>
  </>
  );
};
export default FantasyMoviePage;