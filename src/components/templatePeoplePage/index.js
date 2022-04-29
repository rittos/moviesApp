import React from "react";
import PeopleHeader from "../headerPeople";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({

  card: { maxWidth: 350 ,minHeight:450,margin:100 },
  media: { height: 450 ,width:350},
  horizontal: {float:"left"},
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
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
                   <CardMedia
                    className={classes.media}
                    image={
                        people.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                        : `${process.env.PUBLIC_URL}/assets/actorplaceholder.png`
                    }
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