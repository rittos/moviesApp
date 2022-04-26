import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { MoviesContext } from "../contexts/moviesContext";

const useStyles = makeStyles((theme) => ({
    horizontal: {float:"left"},
    stack: {margin:25},
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
      backgroundColor: "rgb(255, 255, 255)",
    },
  }));

const LoginPage = props => {
  const context = useContext(AuthContext)
  const moviesContext = useContext(MoviesContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const login = () => {
    context.authenticate(email, password);
  };

  // Set 'from' to path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (context.isAuthenticated === true) {
    moviesContext.setAuthenticated(context.isAuthenticated)  //ADD THIS: set the authenticated to true in movies context. Will result in movie data request.
    return <Redirect to={from} />;
  }
  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      {/* <input id="email" placeholder="email" onChange={e => {
        setEmail(e.target.value);
      }}></input><br /> */}
      <div className={classes.stack}>
     <TextField id="email" onChange={e => {
        setEmail(e.target.value);
      }} required  label="Email" variant="outlined" /></div>
     {/* 
      <input id="password" type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br /> */}
     <div className={classes.stack}>
     <TextField id="password" onChange={e => {
        setPassword(e.target.value);
      }} required  label="Password" variant="outlined" /></div>
      {/* Login web form  */}
      {/* <button onClick={login}>Log in</button> */}
      <div className={classes.stack}>
      <Button variant="contained" onClick={login} style={{
              borderRadius: 35,
              backgroundColor: "#d53855",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white"
          }}>Log In</Button></div>

      <p>Not Registered?
      <Link to="/signup">Sign Up!</Link></p>
    </>
  );
};

export default LoginPage;