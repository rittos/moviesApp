import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
  card: { maxWidth: 400 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function FantasyMovieCard({ movie }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      avatar={
        movie.favourite ? (
          <Avatar className={classes.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) : null
      }
      title={
        <Typography variant="h5" component="p">
          {movie.name}{" "}
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
              {"Release Date:  "}  {movie.releaseDt}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" component="p">
              <AccessTimeIcon fontSize="small" />
              {"Duration:  "} {movie.runtime}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Link
      to={{
        pathname: `/fantasymoviedetails/${movie.userId}`,
      }}
    >
      View details
    </Link>
    </Card>
  );
}