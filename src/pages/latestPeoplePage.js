import React from "react";
import { getLatestPeoples } from "../api/people-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    card: { maxWidth: 350 ,minHeight:450,margin:100 },
    media: { height: 450 ,width:350},
    horizontal: {float:"left"},
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  });
const LatestPeoples = (props) => {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery(["latestpeoples"], getLatestPeoples);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const people = data ? data : [];

  return (
    <>
       <div className={classes.horizontal}>
      <Card className={classes.card}>
        <CardHeader
        className={classes.header}
        title={
          <Typography variant="h6" component="p">
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
            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                {/* <CalendarIcon fontSize="small" /> */}
                Known For :  {people.known_for_department}
                {/* Gender: {people.gender==1? "Female": "Male"} */}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions disableSpacing> */}
        {/* {props.action(people)} */}
          <Link to={`/people/${people.id}`}>
          <Button variant="outlined" size="small" color="primary">
            More Info ...
          </Button>
          </Link>
        {/* </CardActions> */}
      </Card>
    </div>
  </>
  );
};
export default LatestPeoples;