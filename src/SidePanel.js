import React, { useState } from "react";

// import {fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

// import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ToolBar from './ToolBar.js';
import DrawerRouter from './DrawerRouter.js';
import styles from './ToolBarStyle.js';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyCCw87mQWqYoCNeHO1mUVXsUxEC9rDtkpc",
  authDomain: "iinbo-268401.firebaseapp.com",
  databaseURL: "https://iinbo-268401.firebaseio.com",
  projectId: "iinbo-268401",
  storageBucket: "iinbo-268401.appspot.com",
  messagingSenderId: "615803115188",
  appId: "1:615803115188:web:0b75b8a2b37829877c69e1",
  measurementId: "G-7H194ZDFFV"
};

firebase.initializeApp(firebaseConfig);

export function AppBarInteraction(props) {
  const classes = styles;
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Info In, Book Out");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(!drawer);
  };
 //testing
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <ToolBar title={title} onMenuClick={toggleDrawer} mobileMenu={renderMobileMenu} renderMenu={renderMenu} handleMobileMenuOpen={handleMobileMenuOpen} isSignedIn={props.isSignedIn}/>
      <DrawerRouter
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
      />
    </div>
  );
}

export default class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

   // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignedIn: !!user
      })
    })
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
    <div>
      <AppBarInteraction isSignedIn={this.state.isSignedIn}/>
    </div>);
  }
}
