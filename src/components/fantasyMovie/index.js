import React, {useState, useContext,useEffect} from "react";
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
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../contexts/authContext";
import {uploadPosterforFantasyMovie, deleteFantasyMovie} from "../../api/movie-api";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  card: { maxWidth: 400 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});


export default function FantasyMovieCard({ movie }) {
  const classes = useStyles();
  const history = useHistory();

  const [posterImage, setPosterImage] = useState([]);
  const [loadedposterImage, setloadedPosterImage] = useState([]);
  const authcontext = useContext(AuthContext);
  

const uploadposter =  async () => {
  const formData = new FormData()
  formData.append('posterImage', posterImage);
  const result = await uploadPosterforFantasyMovie(formData, authcontext.userid);
  history.push("/");
}

const arrayBufferToBase64 =(buffer) => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

useEffect(() => {
  if(movie.posterimage !== undefined){
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(movie.posterimage.img.data.data); 
    setloadedPosterImage(base64Flag + imageStr);
  }
}, [movie.posterimage]);


const onFileChange = (e) => {
  setPosterImage(e.target.files[0])
}

const deleteClick= async()=>{
  const result = await deleteFantasyMovie(authcontext.userid);
   history.push("/");
}

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
          loadedposterImage.length > 0
            ? loadedposterImage
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
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Link
            to={{
              pathname: `/fantasymoviedetails/${movie.userId}`,
            }}
          >
            View details
            
          </Link>
        </Grid>
        <Grid item xs={3}>
          <DeleteForeverIcon onClick={deleteClick} fontSize="large" style={{color:"red"}}></DeleteForeverIcon>
        </Grid>
      </Grid>
      </CardContent>
    <form encType="multipart/form-data" action="">
    <Grid container style={{ marginTop: 10,marginBottom:10 }}>
      <Grid item xs={8}>
        <label>Select a file to change poster</label>
        <input type="file" onChange={onFileChange} />
      </Grid>
      <Grid item xs={4}>
        <Button onClick={uploadposter} variant="contained" style={{
                borderRadius: 8,
                backgroundColor: "#d53855",
                padding: "5px 5px 5px",
                fontSize: "10px",
                color: "white"
            }}>Upload</Button>
      </Grid>
     </Grid>
      </form>
      
    </Card>
  );
}