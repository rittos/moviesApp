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

    //  getFantasyMovie(authcontext.userid).then((resp) => {
    //   console.log(resp);
    //   movie = resp;
    //  });

  return (
    <>
    <div>
    <PageTemplate
    title="Fantasy Movie"
    movie={fantasymovie}
    // action={(people) => {
    //   return <div people={people} />
    // }}
  />

      {/* <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} disabled={page == 1? true:false} onClick={previousClickHandler}>Previous</button>
      <span style={{ backgroundColor: "#ff4557", margin:3,padding:5,borderRadius:3, color: "white"}}> {page} </span>
      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} onClick= {nextClickHandler}>Next</button> */}
    </div>
  </>
  );
};
export default FantasyMoviePage;