import React, { Component } from 'react';
import {FavCard} from './PostCard.js'
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class Favorite extends Component{
    render(){
        return(<div className = "Postmain">
                  <FavContainer currentPost = {this.currentPost}/>
                </div>);

    }
}

export class FavContainer extends Component {
    constructor(props) {
        super(props);
        this.uid = firebase.auth().currentUser.uid;
        this.state = {
            favPost:[]
        }
    }
    handleRemoveElement(event,key){
        this.RemovePost(key);

    }
    RemovePost(key) {
      var updates = {};
      updates['/fav-cards/' + this.uid + '/' + key] = null;

      return firebase.database().ref().update(updates);
    }
    componentDidMount() {
            var favposts = []
            firebase.database().ref('/fav-cards/' + this.uid ).on('value',(snapshot) => {
              favposts = [];
              var favCards = snapshot.val();
              for (const key in favCards) {
                  favposts.push(<li key={key}><FavCard state={favCards[key]} handleRemoveElement = {this.handleRemoveElement.bind(this)}/></li>);
              }
              this.setState({
                  favPost: favposts
                });
            });

    }
    render(){
        return (<ul id="post-place" className="post-container mt-2">Your Favorited Posts
                  {this.state.favPost}
                </ul>);
    }
}
