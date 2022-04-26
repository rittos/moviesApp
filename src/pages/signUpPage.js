import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    horizontal: {float:"left"},
    stack: {margin:25},
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
      backgroundColor: "rgb(255, 255, 255)",
    },
  }));
  
const SignUpPage = props => {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const classes = useStyles();

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      console.log("reg")
      context.register(email, password, firstName, lastName);
      setRegistered(true);
    }
  }

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    return <Redirect to="./login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register an  username and password to log in </p>
      {/* <input value={email} placeholder="email" onChange={e => {
        setEmail(e.target.value);
      }}></input><br /> */}
    <div className={classes.stack}>
     <TextField id="email" value={email} onChange={e => {
        setEmail(e.target.value);
      }} required  label="Email" variant="outlined" />
    </div>
      {/* <input value={firstName} placeholder="first name" onChange={e => {
        setFirstName(e.target.value);
      }}></input><br /> */}

    <div className={classes.stack}>
    <TextField id="firstName" value={firstName} onChange={e => {
        setFirstName(e.target.value);
      }} required  label="First Name" variant="outlined" />
    </div>
      {/* <input value={lastName} placeholder="last name" onChange={e => {
        setLastName(e.target.value);
      }}></input><br /> */}
    <div className={classes.stack}>
    <TextField id="lastName" value={lastName} onChange={e => {
        setLastName(e.target.value);
      }} required  label="Last Name" variant="outlined" />
    </div>
      {/* <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br /> */}
    <div className={classes.stack}>
    <TextField id="password" type="password" value={password} onChange={e => {
        setPassword(e.target.value);
      }} required  label="Password" variant="outlined" />
      </div>
      {/* <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br /> */}
    <div className={classes.stack}>
    <TextField id="passwordagain" type="password" value={passwordAgain} onChange={e => {
        setPasswordAgain(e.target.value);
      }} required  label="Confirm Password" variant="outlined" />
    </div>
      {/* Login web form  */}
      {/* <button onClick={register}>Register</button> */}
      <div className={classes.stack}>
      <Button variant="contained" onClick={register} style={{
              borderRadius: 35,
              backgroundColor: "#d53855",
              padding: "10px 26px",
              fontSize: "14px",
              color: "white"
          }}>Register</Button>
    </div>
    </>
  );
};

export default SignUpPage;