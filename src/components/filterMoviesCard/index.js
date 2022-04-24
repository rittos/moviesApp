import React,{useEffect, useState} from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getGenres, getLanguages } from "../../api/tmdb-api";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

export default function FilterMoviesCard(props) {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [languages, setLanguages] = useState([]);

  const [sortingoptions, setSortingOptions] = useState([
    {
      sortingCode: "none",
      sortingName: "None"
    },
    {
      sortingCode: "title_asc",
      sortingName: "Title Ascending"
    },
    {
      sortingCode: "title_desc",
      sortingName: "Title Descending"
    }
  ]);

  useEffect(() => {
    getLanguages().then((languages) => {
      setLanguages(languages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  //bringing No Language option at the top of the list
  if(languages.length>0){
    languages.filter((data) => data.iso_639_1 !== 'xx');
    if (languages[0].english_name !== "No Language") {
      languages.unshift({ iso_639_1: "xx", english_name: "No Language", name: "No Language" });
  }
}

  const handleUserImput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleUserImput(e, "title", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleUserImput(e, "genre", e.target.value);
  };
  const handleLanguageChange = (e) => {
    handleUserImput(e, "language", e.target.value);
  };

  const handleUserInputsort = (e, type, value) => {
    e.preventDefault();
    props.onUserSortInput(type, value);
  };
  const handleSortChange = (e) => {
    handleUserInputsort(e, "sort", e.target.value);
  };
  
  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          className={classes.formControl}
          id="filled-search"
          label="Search field"
          type="search"
          value={props.titleFilter}
          variant="filled"
          onChange={handleTextChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
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
        <FormControl className={classes.formControl}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
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
      </CardContent>
    </Card>
    <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SearchIcon fontSize="large" />
            Sort the movies.

            <FormControl className={classes.formControl}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.paramSort}
            onChange={handleSortChange}
          >
            {sortingoptions.map((options) => {
              return (
                <MenuItem key={options.sortingCode} value={options.sortingCode}>
                  {options.sortingName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
          </Typography>
        </CardContent>
      </Card>
      </>
  );
}