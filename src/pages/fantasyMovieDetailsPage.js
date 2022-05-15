import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { useQuery } from "react-query";
import { getGenres } from "../api/movie-api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../contexts/authContext";
import { getFantasyMovie} from "../api/movie-api";
import InputAdornment from '@material-ui/core/InputAdornment';
import { getPeopleById } from '../api/people-api'
import { updateFantasyMovie } from "../api/movie-api";
import { useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: 380,minHeight:300, margin:10 },
  media: { height: 300 },
  horizontal: {float:"left"},
  stack: {marginLeft:150,marginBottom:20},
  main:{marginTop:100},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

export default function FantasyMovieDetails({ movie }) {
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
  const [fantasymovie, setfantasymovie] = useState([]);
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
    useEffect(() => {
      getFantasyMovie(authcontext.userid).then((resp) => {
        setfantasymovie(resp);
        setMovieName(resp.name);
        setOverview(resp.overview);
        setRuntime(resp.runtime)
        setGenreId(resp.genreId);
        setReleaseDate(resp.releaseDt);
        var peoples = [];
        setActorIds(resp.actorIds);
        resp.actorIds.forEach(personid => {
          populatePersons(personid, peoples);
        });
        
      });
    }, [authcontext.userid]);

    const populatePersons = async (personid, peoples) =>{
      
      await getPeopleById(personid).then((resp)=>{
        let updatedpersonslist = [...peoples]
        peoples.push(resp);
        updatedpersonslist.push(resp);
        setSelectedPeople(updatedpersonslist);
      });   
    }

    const updateFantasyMovieHandler =  async () => {
      const result = await updateFantasyMovie(authcontext.userid, name, genreId, runtime, overview, releaseDt,actorIds);
      history.push("/");
    }
    const handleNameChange = (e) => {
      setMovieName(e.target.value)
    }
    const handleRuntimeChange = (e) => {
      const re = /^\d+(\.\d{0,1})?$/ ;
     if (e.target.value === '' || re.test(e.target.value)) {
       setRuntime(e.target.value)
     } };       
 
     const handleOverViewChange = (e) => {
      setOverview(e.target.value);
    }
    const handleDateChange = (e) => {
      setReleaseDate(e.target.value);
    }
    const handleGenreChange = (e) => {
      setGenreId(e.target.value);
    };
  
  return (
    <>
    <div className={classes.main}>
    <Grid container spacing={4}>
          <Grid item xs={6}>
            <div className={classes.stack}>
              <TextField id="outlined-basic" value={name} onChange={handleNameChange} required  label="Name" variant="filled" 
              InputProps={{startAdornment: ( <InputAdornment position="start">{/* <AccountCircle /> */}</InputAdornment>),}}/>
          </div>
            <div className={classes.stack}>
              <TextField 
                label="Runtime (Hours)" required  name="runtime"   variant="filled"  onChange={handleRuntimeChange}
                inputProps={{ maxLength: 4}} value={runtime} type="text" 
                className={classes.textfield} 
                InputProps={{startAdornment: ( <InputAdornment position="start">{/* <AccountCircle /> */}</InputAdornment>),}}/>
                </div>
                <div className={classes.stack}>
                  <TextField onChange={handleDateChange}
                    id="date"
                    required 
                    label="Release Date"
                    variant="filled"
                    aria-readonly={true}
                    type="date"
                    defaultValue="2021-01-01"
                    value={releaseDt}
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
                onChange={handleGenreChange}
                labelId="genre-label"
                id="genre-select"
                value={genreId}
                readOnly={false}
                variant="filled"
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem  key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
            <div className={classes.stack}>
                <TextField id="outlined-basic"  onChange={handleOverViewChange} value={overview} required  label="Overview" variant="filled"
                InputProps={{startAdornment: ( <InputAdornment position="start">{/* <AccountCircle /> */}</InputAdornment>),}}/>
                
                </div>
          </Grid>
      </Grid>
      <div className={classes.stack}>
      {selectedpeoples.map((people) => {
              return (
                <div key={people.id} className={classes.horizontal}>
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
          <div className={classes.stack}>
          <Grid container spacing={4}>
          <Grid item xs={12}>
            <Button onClick={updateFantasyMovieHandler} variant="contained" style={{
              borderRadius: 35,
              backgroundColor: "#d53855",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white"
          }}>Update fantasy movie</Button>
          </Grid>
          </Grid>
          </div>
     </div>     
    </>
  );
}