import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AccountCircle from "@material-ui/icons/AccountCircle";
import ToolBarStyle from './ToolBarStyle.js';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { HashRouter as Router, Link} from 'react-router-dom';

const menuId = "primary-search-account-menu";
const useStyles = makeStyles(ToolBarStyle);

export default function ToolBar({title, onMenuClick, mobileMenu, renderMenu, handleMobileMenuOpen, isSignedIn}) {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar className={classes.aboveDrawer}>
            <Toolbar className={classes.toolStyle}>
                <Router>
                    <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={onMenuClick}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                    {isSignedIn && <IconButton aria-label="sign out" color="inherit" onClick={() => firebase.auth().signOut()}>
                        <ExitToAppIcon />
                    </IconButton>}
                    
                    {!isSignedIn && <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="/SignIn"
                    >
                        <AccountCircle />
                    </IconButton>}

                    {isSignedIn && <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="/UserProfile"
                    >
                        <AccountCircle />
                    </IconButton>}

                    </div>
                    <div className={classes.sectionMobile}>
                    </div>
                </Router>
            </Toolbar>
            </AppBar>
        {renderMenu}
        </Fragment>
    )
}