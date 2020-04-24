import React from "react"
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserProfile.css';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        let user = firebase.auth().currentUser;
        let userUID = user.uid;
        let profile;
        if (user) {
            profile = user.providerData[0];
        }
        this.state = {
            hiddenUID : userUID,
            providerID: profile.providerId,
            uid: profile.uid,
            displayName: profile.displayName,
            email: profile.email,
            photoURL: profile.photoURL
        }
    }
    addUserToDatabase(state) {
        let userKey = state.hiddenUID;
        // Write the new Cards's data simultaneously in the Cards list and the user's Card list.
        let updates = {};
        updates['/user/' + userKey] = state;
        return firebase.database().ref().update(updates);
    }
    componentDidMount() {
        this.addUserToDatabase(this.state);
    }
    render() {
        return (
                <div className="user-profile">
                <h1>Your Profile</h1>
                <div className="profile-flex">
                    <div className="profile-img">
                        <img src={this.state.photoURL} alt={this.state.displayName}></img>
                    </div>
                    <div className="profile-description">
                        <p><span>Username: </span>{this.state.displayName}</p>
                        <p><span>Email Address: </span>{this.state.email}</p>
                        <p><span>Sign In Provider: </span>{this.state.providerID}</p>
                        <p><span>User ID: </span>{this.state.uid}</p>
                    </div>
                    </div>
                </div>
        )
    }
}