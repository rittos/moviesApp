import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PeopleSimpleDialog from "../peopleSimpleDialog"
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import { getGenres } from "../../api/movie-api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { addFantasyMovie } from "../../api/movie-api";
import { AuthContext } from "../../contexts/authContext";
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: 155,minHeight:350, margin:10 },
  media: { height: 100 },
  horizontal: {float:"left"},
  stack: {marginLeft:150,marginBottom:20,marginTop:20},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

export default function FantasyMovieGenerator({ movie }) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedpeoples, setSelectedPeople] = useState([]);
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [genreId, setGenreId] = useState("0");
  const [runtime, setRuntime] = useState("");
  const [releaseDt, setReleaseDate] = useState("");
  const [name, setMovieName] = useState("");
  const [overview, setOverview] = useState("");
  const [actorIds, setActorIds] = useState([]);
  const authcontext = useContext(AuthContext);
  
  var genres = [];
    if(data !== undefined){
      genres = data.genres;
    if (genres[0].name !== "All") {
      genres.unshift({ id: "0", name: "All" });
    }
  }
  const handleAddActor = (actor) => {
    let updatedactorsIds = [...actorIds];
    if (!updatedactorsIds.includes(actor.id)) {
      updatedactorsIds.push(actor.id);
    }
    setActorIds(updatedactorsIds);

    var peoples = [];
    peoples.push(actor);
    peoples = peoples.concat(selectedpeoples);
    setSelectedPeople(peoples);
    console.log(peoples.length);
  };

  const handleNameChange = (e) => {
    setMovieName(e.target.value)
  }

  const handleRuntimeChange = (e) => {
     const re = /^\d+(\.\d{0,1})?$/ ;
    if (e.target.value === '' || re.test(e.target.value)) {
      setRuntime(e.target.value)
    } };       

  const handleGenreChange = (e) => {
    setGenreId(e.target.value);
  };

  const handleOverViewChange = (e) => {
    setOverview(e.target.value);
  }

  const handleDateChange = (e) => {
    setReleaseDate(e.target.value);
  }

  const addFantasyMovieHandler =  async () => {
    const result = await addFantasyMovie(authcontext.userid, name, genreId, runtime, overview, releaseDt,actorIds);
    toast("Successfully added your fantasy movie!");
    history.push("/");
  }
  return (
    <>
    <Grid container spacing={4}>
          <Grid item xs={6}>
            <div className={classes.stack}>
              <TextField id="outlined-basic" required  label="Name" onChange={handleNameChange} variant="outlined" /></div>
            <div className={classes.stack}>
              <TextField 
                label="Runtime (Hours)" required  name="runtime" 
                inputProps={{ maxLength: 4}} value={runtime} type="text" 
                onChange={handleRuntimeChange} className={classes.textfield} /> 
                </div>
                <div className={classes.stack}>
              <TextField onChange={handleDateChange}
                id="date"
                required 
                label="Release Date"
                type="date"
                defaultValue="2021-01-01"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.stack}>
              <FormControl className={classes.formControl}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={genreId}
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
            <div className={classes.stack}>
                <TextField id="outlined-basic" onChange={handleOverViewChange} required  label="Overview" variant="outlined" /></div>
            
          </Grid>
      </Grid>
      <div className={classes.stack}>
      <PeopleSimpleDialog btnname="Select Actors" addbtnaction={handleAddActor} />
      </div>
      {/* <PeopleSimpleDialog btnname="Select actress"   addbtnaction={handleAddActor} /> */}
      <div className={classes.stack}>
      <Typography variant="h6" component="p">
        {selectedpeoples.length > 0 ? "": "No actors selected!"}
      </Typography>
      </div>
      <div className={classes.stack}>
      {selectedpeoples.map((people) => {
              return (
                <div className={classes.horizontal}>
                <Card className={classes.card}>
                <CardHeader
                className={classes.header}
                title={
                  <>
                  <Typography variant="h6" component="p">
                    {people.name}{" "}
                  </Typography>
                  {/* <CloseIcon></CloseIcon> */}
                  </>
                }
                
              />
                <CardMedia
                  className={classes.media}
                  image={
                      people.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                      : `${process.env.PUBLIC_URL}/assets/film-poster-placeholder.png`
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

              </Card>
              </div>
              );
                }
            )
              }
              </div>

          <div className={classes.stack} >
          <Grid container spacing={4}>
          <Grid item xs={12}>
            <Button onClick={addFantasyMovieHandler} variant="contained" style={{
              borderRadius: 35,
              backgroundColor: "#d53855",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white"
          }}>Add fantasy movie</Button>
          <ToastContainer />
          </Grid>
          </Grid>
          </div>
             
    </>
  );
}