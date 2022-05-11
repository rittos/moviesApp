import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CakeIcon from '@material-ui/icons/Cake';
import Container from "@material-ui/core/Container";
import PlaceIcon from '@material-ui/icons/Place';
import Button from "@material-ui/core/Button";
import { getMovieCredits } from "../../api/people-api";
import { useQuery } from "react-query";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import MovieList from "../movieList";


const useStyles = makeStyles((theme) => ({
  chipRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipLabel: {
    margin: theme.spacing(0.5),
  },
  fab: { 
    position: "fixed",
    top: theme.spacing(15),
    right: theme.spacing(2),
  },
}));

const PeopleDetails = ( {people}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const { id } = useParams();
  console.log(id); // ▶ URLSearchParams {}
  // val peopleid = searchParams.get("")
  const { data, error, isLoading, isError } = useQuery(["moviecredits", { id: id }], getMovieCredits);
  const movies = data ? data.cast : [];

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
       <CakeIcon></CakeIcon>Birthday : {people.birthday!==""?people.birthday: "Not Available"}
      </Typography>
      <Typography variant="h6" component="p">
        <PlaceIcon></PlaceIcon>Place of Birth : {people.place_of_birth!== "" ?people.place_of_birth : "Not Available"}
      </Typography>
      <Container fixed style={{ backgroundColor: "skyblue", padding:30, borderRadius:10, color:"white", marginTop:20}}>
      <Typography variant="h6" component="p">
        {people.biography!== "" ?people.biography :  "Biography not Available"}
      </Typography></Container>
          <Grid container >
            <Grid item xs={12}>
              <Button variant="outlined"  style={{marginTop: 20}} color="primary">
                Movie Credits
              </Button>
            </Grid>
            <Grid item container spacing={5}>
            <MovieList 
            action={(people) => {
              return <div people={people} />
              }}
            movies={movies} />
            </Grid>
          </Grid>
    </>
  );
};
export default  PeopleDetails ;