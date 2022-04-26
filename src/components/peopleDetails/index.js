import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CakeIcon from '@material-ui/icons/Cake';
import Container from "@material-ui/core/Container";
import PlaceIcon from '@material-ui/icons/Place';
import Button from "@material-ui/core/Button";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieList from "../movieList";
import Header from "../headerMovieList";

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
  // card: { maxWidth: 100 },
  // media: { height: 125 },
  // horizontal: {float:"left", marginTop:50},
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
  var isRender = false;
  const showMovieCreditsHandler= () =>{
    isRender = true;
  }
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
       <CakeIcon></CakeIcon>Birthday : {people.birthday}
      </Typography>
      <Typography variant="h6" component="p">
        <PlaceIcon></PlaceIcon>Place of Birth : {people.place_of_birth}
      </Typography>
      <Container fixed style={{ backgroundColor: "skyblue", padding:30, borderRadius:10, color:"white", marginTop:20}}>
      <Typography variant="h6" component="p">
        {people.biography}
      </Typography></Container>
          <Grid container >
            <Grid item xs={12}>
              <Button variant="outlined"  style={{marginTop: 20}} color="primary" onClick={showMovieCreditsHandler}>
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

      {/* {movies.map((movie) => {
          return (
          <div  key={movie.id}  className={classes.horizontal}>
            <Card className={classes.card}>
            <CardHeader
            className={classes.header}
            title={
              <Typography variant="h6" component="p">
                {movie.title}{" "}
              </Typography>
            }
          />
            <CardMedia
              className={classes.media}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
              }
            />
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="caption" component="p">
                    <CalendarIcon fontSize="small" />
                    {movie.release_date}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" component="p">
                    <StarRateIcon fontSize="small" />
                    {"  "} {movie.vote_average}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions disableSpacing>
            {/* {action(movie)} */}
              {/* <Link to={`/movies/${movie.id}`}>
              <Button variant="outlined" size="medium" color="primary">
                More Info ...
              </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
          ); } 
          )
        // } */} 
    </>
  );
};
export default  PeopleDetails ;