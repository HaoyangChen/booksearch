import React from "react";
import clsx from "clsx";
import { HashRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ContactsIcon from '@material-ui/icons/Contacts';

import Home from "./Home.js";
import Search from "./Search.js";
import Favorite from "./Favorite.js";
import OthersProfile from './OthersProfile.js';
import AboutUs from './AboutUs.js';
import {NewPost} from "./newpost.js";
import {AllPost} from "./AllPost.js";
import LogIn from './LogIn.js';
import UserProfile from "./UserProfile.js";
import ToolBarStyle from './ToolBarStyle.js';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Divider } from "@material-ui/core";

const history = createBrowserHistory();

// UI config
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/project-iinbo',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

const useStyles = makeStyles(ToolBarStyle);

// React Router Configuration
export default function DrawerRouter({variant, open, onClose, onItemClick }) {
    const classes = useStyles();
    return (
        <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Info In, Book Out")}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText>Homepage</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Search"
            onClick={onItemClick("Search Book")}
          >
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText>Search Book</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/Favorite"
            onClick={onItemClick("Favorite")}
          >
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText>Favorite</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to="/NewPost"
            onClick={onItemClick("Make a New Post")}
          >
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText>Make a New Post</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/AllPost"
            onClick={onItemClick("View All Posts Availabile")}
          >
            <ListItemIcon><VisibilityIcon /></ListItemIcon>
            <ListItemText>View All Posts</ListItemText>
          </ListItem>

          <Divider />
          <ListItem
            button
            component={Link}
            to="/UserProfile"
            onClick={onItemClick("View Your Profile")}
          >
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/AboutUs"
            onClick={onItemClick("About Us")}
          >
            <ListItemIcon><ContactsIcon /></ListItemIcon>
            <ListItemText>About Us</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/signIn">
              {!!firebase.auth().currentUser ? <Redirect to="/" />: <LogIn uiConfig ={uiConfig} fbAuth = {firebase.auth}/> }
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/Home" component={Home} />
          <Route path="/Search" component={Search} />
          {/* <Route path="/project-iinbo/Favorite" component={Favorite}> */}
          <Route path="/Favorite">
            {!firebase.auth().currentUser ? <Redirect to="/signIn" /> : <Favorite /> }
          </Route>
          <Route path="/AllPost">
            {!firebase.auth().currentUser ? <Redirect to="/signIn" /> : <AllPost /> }
          </Route>
          <Route path="/NewPost">
            {!firebase.auth().currentUser ? <Redirect to="/signIn" /> : <NewPost /> }
          </Route>
          <Route path="/UserProfile">
            {!firebase.auth().currentUser ? <Redirect to="/signIn" /> : <UserProfile /> }
          </Route>
          <Route path="/AboutUS" component={AboutUs} />
          <Route path="/OthersProfile" component={OthersProfile} />
        </Switch>
      </main>
    </Router>
    )
}
