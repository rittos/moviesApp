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
  card: { maxWidth: 145 },
  media: { height: 150 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function DialogPeopleCard(props) {
  const classes = useStyles();


  const handleAddClick = ()=>{
    props.addbtnaction(props.people)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      title={
        <Typography variant="h6" component="p">
          {props.people.name}{" "}
        </Typography>
      }
    />
      <CardMedia
        className={classes.media}
        image={
            props.people.profile_path
            ? `https://image.tmdb.org/t/p/w500/${props.people.profile_path}`
            : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" gutterBottom>
              {/* <CalendarIcon fontSize="small" /> */}
              Known For :  {props.people.known_for_department}
              {/* Gender: {people.gender==1? "Female": "Male"} */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {props.action(props.people)}
        <Link to={`/people/${props.people.id}`}>
        <Button variant="outlined" size="small" color="primary">
          More Info ...
        </Button>
        </Link>
      </CardActions>
      <CardActions disableSpacing>
        {/* {props.addbtnaction(props.people)}
        <Link to={`/people/${props.people.id}`}> */}
        <Button onClick={handleAddClick} variant="contained" size="small" style={{margin: "auto", backgroundColor:"navy", color:"white"}}>Add me</Button>
        {/* </Link> */}
      </CardActions>
     
    </Card>
  );
}