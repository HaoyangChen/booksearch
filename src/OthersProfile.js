import React from "react"
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserProfile.css';

export default class OthersProfile extends React.Component {
    constructor(props) {
        super(props);
        this.uid = this.props.location.state.uid;
        this.state = {
            hiddenUID : this.uid,
            providerID:0,
            uid: 0,
            displayName: '',
            email: '',
            photoURL: ''
        }
    }
    componentDidMount() {
        firebase.database().ref('/user/' + this.uid ).on('value',(snapshot) => {
          var userCard = snapshot.val();
          this.setState({
              hiddenUID : userCard.hiddenUID,
              providerID:userCard.providerID,
              uid: userCard.uid,
              displayName: userCard.displayName,
              email: userCard.email,
              photoURL: userCard.photoURL})
          });
    }

    render() {
        return (
            <div className="user-profile">
                <h1>{this.state.displayName}'s Profile</h1>
                <div className="profile-flex">
                    <div className="profile-img">
                        <img src={this.state.photoURL} alt={this.state.displayName}></img>
                    </div>
                    <div className="profile-description">
                        <p><span>Username: </span>{this.state.displayName}</p>
                        <p><span>Email Address: </span>{this.state.email}</p>
                        <p><span>User ID: </span>{this.state.uid}</p>
                    </div>
                </div>
            </div>
        )
    }
}