import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = () => {
  const classes = useStyles();
  const  history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const authcontext = useContext(AuthContext)

  const open = Boolean(anchorEl);
  var menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Fantasy Movie", path: "/fantasymovie" },
    { label: "Popular People", path: "/people/popular" },
    { label: "Latest People", path: "/people/latest" },
    { label: "Search Movies", path: "/movies/searchmovie" },
    
  ];

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlelogout= (e) =>{
    console.log("logout");
    localStorage.clear(); //for clearing localStorage
    if(authcontext != null){
    authcontext.signout();
    }
  }
  const handlelogin= (e) =>{
    history.push('/login');
  }

  const renderLogoutButton = () => {
    if(authcontext != null)
    {
      if(authcontext.isAuthenticated)
      {
        return  <Button key={"logout"} color="inherit" onClick={() => handlelogout()}>{"logout"}</Button>
      }
    }
  }
  const renderLoginButton = () => {
    if(authcontext != null)
    {
      if(!authcontext.isAuthenticated)
      {
        return  <Button key={"login"} color="inherit" onClick={() => handlelogin()}>{"login"}</Button>
      }
    }
  }

  return ( 
    <>
      <AppBar className={classes.appbar}
      position="fixed" elevation={0} color='primary'> 
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          {/* <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies!
          </Typography> */}
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              {renderLoginButton()}
              {renderLogoutButton()}
             

            </>
          )}
        </Toolbar>
      </AppBar>
      
    </>
  );
};

export default SiteHeader;