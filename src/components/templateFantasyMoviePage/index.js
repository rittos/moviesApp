import React from "react";
import FantasyMovieHeader from "../headerFantasyMovie";
import { makeStyles } from "@material-ui/core/styles";
import FantasyMovieCard from "../fantasyMovie";
import FantasyMovieGenerator from "../fantasyMovieGenerator";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(7),
        },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TemplateFantasyMoviePage = ({ movie, children }) => {
  const classes = useStyles();
  movie = undefined;
if(movie !== undefined)
      {
            return (
                <>
                <div className={classes.root}>
                <FantasyMovieHeader movie={movie} />        
                <FantasyMovieCard  movie={movie} />
                </div>
                </>
             );
        }else{
            return (
                <>
                <div className={classes.root}>
                <FantasyMovieHeader movie={movie} />                
                <FantasyMovieGenerator  movie={movie} />        
                </div>
                </>
                );
        }
};

export default TemplateFantasyMoviePage;