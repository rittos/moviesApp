import React from "react";
import PeopleHeader from "../headerPeople";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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

const TemplatePeoplePage = ({ people, children }) => {
  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      <PeopleHeader people={people} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div className={classes.gridListRoot}>
            <GridList cellHeight={500} className={classes.gridList} cols={1}>
              {
                <GridListTile key={people.profile_path} className={classes.gridListTile} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${people.profile_path}`}
                   
                  />
                </GridListTile>
              }
            </GridList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default TemplatePeoplePage;