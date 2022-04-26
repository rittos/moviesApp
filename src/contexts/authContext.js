import React, { useState, createContext } from "react";
import { login, signup, getAccountByEmail } from "../api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");
  const [userid, setUserId] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  // const getAccountByEmail = async (email) => {

  //   const result = await getAccountByEmail(email);
  // }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setEmail(email);
      // getAccountByEmail();
      const resultAccount = await getAccountByEmail(email);
      setUserId(resultAccount.id);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName,lastName);
    console.log(result.code);
    return (result.code == 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        email,
        userid
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;