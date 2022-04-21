import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CakeIcon from '@material-ui/icons/Cake';
import Container from "@material-ui/core/Container";
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chipLabel: {
    margin: theme.spacing(0.5),
  },
  fab: { 
    position: "fixed",
    top: theme.spacing(15),
    right: theme.spacing(2),
  },
}));

const PeopleDetails = ( {people}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
       <CakeIcon></CakeIcon>Birthday : {people.birthday}
      </Typography>
      <Typography variant="h6" component="p">
        <PlaceIcon></PlaceIcon>Place of Birth : {people.place_of_birth}
      </Typography>
      <Container fixed style={{ backgroundColor: "skyblue", padding:30, borderRadius:10, color:"white", marginTop:20}}>
      <Typography variant="h6" component="p">
        {people.biography}
      </Typography></Container>
    </>
  );
};
export default  PeopleDetails ;