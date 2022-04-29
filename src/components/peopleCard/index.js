import React, { useContext  } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function PeopleCard({ people, action }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      title={
        <Typography variant="h5" component="p">
          {people.name}{" "}
        </Typography>
      }
    />
      <CardMedia
        className={classes.media}
        image={
            people.profile_path
            ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
            : `${process.env.PUBLIC_URL}/assets/actorplaceholder.png`
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h6" component="p">
              {/* <CalendarIcon fontSize="small" /> */}
              Known For :  {people.known_for_department}
              {/* Gender: {people.gender==1? "Female": "Male"} */}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6" component="p">
              {/* <StarRateIcon fontSize="small" /> */}
              {/* Known For :  {people.known_for_department} */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(people)}
        <Link to={`/people/${people.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}