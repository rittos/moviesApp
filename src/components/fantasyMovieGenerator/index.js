import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PeopleSimpleDialog from "../peopleSimpleDialog"
import DialogPeopleList from "../dialogPeopleList";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { useQuery } from "react-query";
import { getGenres } from "../../api/tmdb-api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  card: { maxWidth: 155, margin:10 },
  media: { height: 100 },
  horizontal: {float:"left"},
  stack: {margin:25}
});

export default function FantasyMovieGenerator({ movie }) {
  const classes = useStyles();
  const [selectedpeoples, setSelectedPeople] = useState([]);
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  var genres = [];
    if(data !== undefined){
      genres = data.genres;
    if (genres[0].name !== "All") {
      genres.unshift({ id: "0", name: "All" });
    }
  }
  const handleAddActor = (actor) => {
    // peoples[0] = actor;
    var peoples = [];
    peoples.push(actor);
    peoples = peoples.concat(selectedpeoples);
    setSelectedPeople(peoples);
    console.log(peoples.length);
  };

  // const handleReleaseDtChange = (newValue: Date | null) => {
  //   console.log(newValue);
  // };
  const [values1, setValues1] = useState("");
  const handleRuntimeChange = (e) => {
     const re = /^\d+(\.\d{0,1})?$/ ;// /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       setValues1(e.target.value)
    } };       

  const handleGenreChange = (e) => {
    //handleUserImput(e, "genre", e.target.value);
  };
  return (
    <>
    <Grid container spacing={4}>
          <Grid item xs={6}>
            <div className={classes.stack}>
              <TextField id="outlined-basic" required  label="Name" variant="outlined" /></div>
            <div className={classes.stack}>
              <TextField 
                label="Runtime (Hours)" required  name="runtime" 
                inputProps={{ maxLength: 4}} value={values1} type="text" 
                onChange={handleRuntimeChange} className={classes.textfield} /> 
                </div>
              <div className={classes.stack}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload poster
                  <input
                    type="file"
                    hidden
                  />
                </Button>  
              </div>
          </Grid>
          <Grid item xs={6}>
          <div className={classes.stack}>
              <FormControl className={classes.formControl}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value="0"
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
                <TextField id="outlined-basic" required  label="Overview" variant="outlined" /></div>
            <div className={classes.stack}>
              <TextField
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

          <div >
            <Button variant="contained" style={{
              borderRadius: 35,
              backgroundColor: "#d53855",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white"
          }}>Add my fantasy movie</Button>
          </div>
             
    </>
  );
}