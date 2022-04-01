import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import FilterCard from "../filterMoviesCard";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

export const titleFilter = function (movie, value) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie, value) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

export const languageFilter = function (movie, value) {
  const languagecd = (value);
  return languagecd != "" && languagecd != "xx" ? movie.original_language.includes(languagecd) : true;
};

export const paramSort = function (movies, sortValue) {
  var sorted_out = movies;
  if(sortValue === "title_asc")
  {
    sorted_out = movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
  }
  else if(sortValue === "title_desc")
  {
    var temp = movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
    sorted_out = temp.reverse();
  }
  return sorted_out;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: theme.spacing(8),
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const MovieFilterUI = ({ filterInputChange, sortInputChange, titleFilter, genreFilter, languageFilter, paramSort }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        className={classes.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={filterInputChange}
          onUserSortInput={sortInputChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          languageFilter={languageFilter}
          paramSort={paramSort}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;