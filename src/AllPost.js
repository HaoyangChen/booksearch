import React, { Component } from 'react';
import {PostCard} from './PostCard.js'
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


export class AllPost extends React.Component {
  render() {
    return(
      <div>
      <AllContainer/>
      </div>
    )
  }
}

export class AllContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allposts:[]
        }
        this.uid = firebase.auth().currentUser.uid;

    }
    handleAddFav(event,key){
        this.AddToFavPost(key);
    }


    AddToFavPost(key) {
        firebase.database().ref('/cards/'+key).once('value').then((snapshot) => {
            var cardData=snapshot.val();
            var updates = {};
            updates['/fav-cards/' + this.uid + '/' + key] = cardData;
            return firebase.database().ref().update(updates);
        });

    }
    componentDidMount() {
            var allpost = []
            firebase.database().ref('/cards/').on('value',(snapshot) => {
              allpost = [];
              var cards = snapshot.val();


              for (const key in cards) {
                  allpost.push(<li key={key}><PostCard state={cards[key]} handleAddFav = {this.handleAddFav.bind(this)}/></li>);
              }
              this.setState({
                  allposts: allpost
                });
            });

    }
    render(){
        return (<ul id="post-place" className="post-container mt-2">View All Posts
                  {this.state.allposts}
                </ul>);
    }
}
