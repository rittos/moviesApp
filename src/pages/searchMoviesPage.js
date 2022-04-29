import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { searchMovies, getGenres, getLanguages } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MovieList from "../components/movieList";
import PeopleSimpleDialog from "../components/peopleSimpleDialog";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: 155,minHeight:180, margin:10 },
  media: { height: 100 },
  horizontal: {float:"left"},
  stack: {margin:25},
  searchresult:{marginLeft:30,marginTop:20, marginBottom:20},
  container:{margin:"auto",marginTop:40 ,backgroundColor:"#e7e7ff", padding:50,borderRadius:30,paddingLeft:300},

  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));
const SearchMoviesPage = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("xx");
  const [selectedAdult, setSelectedAdult] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState("0");
  const [selectedpeoples, setSelectedPeople] = useState([]);
  const [filterlng, setfilterlng] = useState("xx");
  const [filtergen, setfiltergen] = useState(1);
  const [filtercast, setfiltercast] = useState([]);
  const [filteradult, setfilteradult] = useState(false);

  const classes = useStyles();
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["searchmovies", {page: page},{ genreId:filtergen}, {languageId: filterlng},{actorId: filtercast},{adult: filteradult}], searchMovies);

  if(genres !== undefined){
  if(genres.length > 0){
      if (genres[0].name !== "Select a genre") {
        genres.unshift({ id: "0", name: "Select a genre" });
        setSelectedGenres("0");
      }
    }
  }

  useEffect(() => {
    getLanguages().then((languages) => {
      setLanguages(languages);
    });
  }, []);

  useEffect(() => {
    getGenres().then((genres) => {
      setGenres(genres.genres);
    });
  }, []);

    // pagination page click handler
    const handlePageClick = (event) => {
      let currentpage = event.selected;
      currentpage = currentpage +1 ;
      setPage(currentpage);
     }
  
     const nextClickHandler = (event) => {
      let currentpage = page;
      currentpage = currentpage +1 ;
      setPage(currentpage);
     }
     const previousClickHandler = (event) => {
      let currentpage = page;
      if(currentpage ==1)
      {
  
      }
      else{
        currentpage = currentpage -1 ;
      }
      setPage(currentpage);
     }
  // bringing No Language option at the top of the list
  if(languages.length>0){
    languages.filter((data) => data.iso_639_1 !== 'xx');
    if (languages[0].english_name !== "No Language") {
      languages.unshift({ iso_639_1: "xx", english_name: "No Language", name: "No Language" });
    } 
  }
  const handleGenreChange = (e) => {
    console.log( e.target.value);
    setSelectedGenres(e.target.value);
  };
  const handleLanguageChange = (e) => {
    console.log( e.target.value);
    setSelectedLanguage(e.target.value);
  };
  const movies = data ? data.results : [];
  const searchButtonClick = () =>{
    setPage(1);
    setfilterlng(selectedLanguage);
    setfiltergen(selectedGenres);
    setfilteradult(selectedAdult);

    var result =selectedpeoples.map(function (e) {
      return e.id;
    }).join(', ');
    console.log(result);
    setfiltercast(result);
  }
  const handleAddActor = (actor) => {
    var peoples = [];
    peoples.push(actor);
    setSelectedPeople(peoples);
    console.log(peoples.length);
  };

  const handleRadioAdultChange = (e) =>{
    console.log(e.target.value);
    if(e.target.value === "adult")
    {
      setSelectedAdult(true);
    }
    else
    {
      setSelectedAdult(false);
    }

  }
  return (
    <>
    <div className={classes.container}>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
  
                <FormControl className={classes.formControl}  style={{ backgroundColor: "#e7e7ff"}}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre-select"
                  value={selectedGenres}
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
       
              </Grid>
              <Grid item xs={6}>
              <FormControl className={classes.formControl}  style={{ backgroundColor: "#e7e7ff"}}>
              <InputLabel id="language-label" >Language</InputLabel>
              <Select
                labelId="language-label"
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
               
              >
                {languages.map((language) => {
                  return (
                    <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                      {language.english_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
              </Grid>
              <Grid item xs={6}>
              <PeopleSimpleDialog btnname="Select Cast" addbtnaction={handleAddActor} />
              </Grid>
              <Grid item xs={6}>
              <FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="noadult"
                  name="radio-buttons-group"
                  onChange={handleRadioAdultChange}
                  // value={selectedAdult}
                >
                  <FormControlLabel value="adult" control={<Radio />} label="Include Adult" />
                  <FormControlLabel value="noadult" control={<Radio />} label="Exclude Adult" />
                </RadioGroup>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.horizontal}>
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
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={12}>    
                  <Button variant="contained" onClick={searchButtonClick} style={{
                    borderRadius: 35,
                    backgroundColor: "#d53855",
                    padding: "10px 20px",
                    fontSize: "14px",
                    color: "white",
                     }}>Search</Button>
               </Grid>
            </Grid>
      </div>
      <div className={classes.searchresult}> 
          <Grid container >
                <Grid item xs={12}>
                  {/* <Button variant="outlined"  style={{marginTop: 20}} color="primary">
                    Search Results
                  </Button> */}
                </Grid>
                <Grid item container spacing={5}>
                <MovieList 
                action={(movie) => {
                  return <div movie={movie} />
                  }}
                movies={movies} />
                </Grid>
          </Grid>
          <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} disabled={page == 1? true:false} onClick={previousClickHandler}>Previous</button>
          <span style={{ backgroundColor: "#ff4557", margin:3,padding:5,borderRadius:3, color: "white"}}> {page} </span>
          <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} onClick= {nextClickHandler}>Next</button>
      </div>
  </>
  );
};
export default SearchMoviesPage;