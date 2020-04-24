import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import bookIcon from './book-icon.png';
import './LogIn.css'

export default function LogIn(props) {
    return (
        <div class="loginPage">
            <h1>Sign in to your account</h1>
            <img src={bookIcon} alt="book icon" id="login-icon"/>
            <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.fbAuth()} />
        </div>
    )
}