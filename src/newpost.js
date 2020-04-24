import React, { Component } from 'react'; //import React Component
import {FetchValue,MyCard} from './PostCard.js'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './yinanstyle.css';


export class NewPost extends Component{
    constructor(props) {
        super(props);
        this.uid = firebase.auth().currentUser.uid;
        this.cardRef = firebase.database().ref("cards");
        this.userCardRef = firebase.database().ref("user-cards");

        if (this.Count){
            this.countID = this.cardRef;
        }
        this.state = {
            userEmail:this.userEmail,
            stage: 1,
            author: '',
            title: '',
            topic: 'Science',
            condition : 'Likely New',
            descr:'',
            address:'',
            imgurl:''
        };
        this.handleChangeTopic = this.handleChangeTopic.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCondition = this.handleChangeCondition.bind(this);
        this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleSelectPost = this.handleSelectPost.bind(this);
        this.handleRemoveElement = this.handleRemoveElement.bind(this);
    }

    handleSubmitQuery(event) {
        this.setState({stage: 2});
        event.preventDefault();
    }
    handleRemoveElement(event,key){
        this.RemovePost(key);
        if(this.state.stage === 1 )
        {this.setState({stage:4})}
        else if(this.state.stage === 4 ){
          this.setState({stage:4});
        }else{this.forceUpdate();}


    }
    RemovePost(key) {
      var updates = {};
      updates['/cards/' + key] = null;
      updates['/user-cards/' + this.uid + '/' + key] = null;

      return firebase.database().ref().update(updates);
    }

    writeNewCard(uid, author, title, topic,condition,descr,address,imgurl, price) {
      // A Card entry.

      var newCardKey = firebase.database().ref().child('cards').push().key;
      var cardData = {
        uid: uid,
        key: newCardKey,
        author: author,
        title: title,
        topic: topic,
        condition : condition,
        descr:descr,
        address:address,
        imgurl:imgurl,
        price: price
      };
      // Write the new Cards's data simultaneously in the Cards list and the user's Card list.
      var updates = {};
      updates['/cards/' + newCardKey] = cardData;
      updates['/user-cards/' + uid + '/' + newCardKey] = cardData;

      return firebase.database().ref().update(updates);
    }

    handleSubmitPost(event) {
        event.preventDefault();
        this.writeNewCard(this.uid, this.state.author, this.state.title, this.state.topic,this.state.condition,this.state.descr,this.state.address,this.state.imgurl, this.state.price);
        this.setState({ stage: 1, author: '', title: '', topic: 'Science', condition : 'Likely New', descr:'', address:'',imgurl:'', price:''});
    }

    handleChangeTopic(event) {
        this.setState({topic: event.target.value});
    }
    handleChangeName(event) {
        this.setState({author: event.target.value});
    }
    handleChangeDescr(event) {
        this.setState({descr: event.target.value});
    }
    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    }
    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }
    handleChangeCondition(event) {
      this.setState({condition: event.target.value});
    }
    handleChangePrice(event) {
      this.setState({price: event.target.value});
    }

    handleSelectPost(event,state) {
        this.state.stage = 3;
        this.state.author = state.author;
        this.state.title = state.title;
        this.state.topic = state.topic;
        this.state.condition = state.condition;
        this.state.price = state.price;
        this.state.imgurl = state.imgurl;
        this.forceUpdate();
    }

    render(){
        if(this.state.stage === 1){
            return(<div className = "Postmain">
                  <PostContainer currentPost = {this.currentPost} handleRemoveElement={this.handleRemoveElement}/>
                  <QueryForm handleSubmit = {this.handleSubmitQuery} handleChangeTopic = {this.handleChangeTopic} handleChangeName = {this.handleChangeName} handleChangeTitle = {this.handleChangeTitle}/>
                  </div>);

        }else if (this.state.stage === 2){
            let fetchData = <FetchValue bookName ={this.state.title} authorName = {this.state.author} handleSelectPost = {this.handleSelectPost} />
            return(<div className = "Postmain">
                  <PostContainer currentPost = {this.currentPost} handleRemoveElement={this.handleRemoveElement}/>
                  <QueryContainer element = {fetchData} />
                  </div>);

        }else if (this.state.stage === 3){
            return(<div className = "Postmain">
                  <PostContainer currentPost = {this.currentPost} handleRemoveElement={this.handleRemoveElement}/>
                  <PostForm state = {this.state}  handleChangeDescr ={this.handleChangeDescr} handleChangeName = {this.handleChangeName} handleChangeTitle = {this.handleChangeTitle} handleChangePrice = {this.handleChangePrice} handleChangeAddress = {this.handleChangeAddress} handleSubmit = {this.handleSubmitPost} handleChangeTopic = {this.handleChangeTopic} handleChangeCondition = {this.handleChangeCondition} />
                  </div>);
        }else if(this.state.stage === 4){
            return(<div className = "Postmain">
                  <PostContainer currentPost = {this.currentPost} handleRemoveElement={this.handleRemoveElement}/>
                  <QueryForm handleSubmit = {this.handleSubmitQuery} handleChangeTopic = {this.handleChangeTopic} handleChangeName = {this.handleChangeName} handleChangeTitle = {this.handleChangeTitle}/>
                  </div>);
        }else{
            console.log("Stage error");
        }

    }
}

export class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[]
        }
    }
    componentDidMount() {
            var postss = []
            var userId = firebase.auth().currentUser.uid;
            // firebase.database().ref('/user-cards/' + userId ).once('value').then((snapshot)
            firebase.database().ref('/user-cards/' + userId ).on('value',(snapshot) => {
              postss = [];
              var userCards = snapshot.val();

              for (const key in userCards) {
                  postss.push(<li key={key}><MyCard state={userCards[key]} key = {key} handleRemoveElement = {this.props.handleRemoveElement}/></li>);
              }
              this.setState({
                  posts: postss
                });
            });

    }
    render(){
        return (<ul id="post-place" className="post-container mt-2">Your Current Posts
                  {this.state.posts}
                </ul>);
    }
}
export class QueryForm extends Component {
    render() {
        let queryForm = (
            <form className="sell-form" id="sell-book-form" onSubmit={this.props.handleSubmit}>
                <h1> Find the Book You Want To Sell</h1>
                <label  className="sr-only">Enter Book's Name:</label>
                <input type="text" id="BookName" className="form-control mt-1 sell-input" placeholder="Book's Name" required="" onChange={this.props.handleChangeTitle}/>
                <label className="sr-only">Enter Book's Author:</label>
                <input type="text" id="BookAuthor" className="form-control mt-1 sell-input" placeholder="Book's BookAuthor" required="" onChange={this.props.handleChangeName}/>
                <label className="sr-only">Select Your Subject: </label>
                <select id="topic" className="browser-default custom-select " onChange={this.props.handleChangeTopic}>
                    <option value = "Science">Science</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Infomatics">Infomatics</option>
                </select>
                <button className="btn btn-dark btn-primary btn-block mb-3 mt-3" type="submit"> Query Books Information</button>
            </form>
    );
        return queryForm;
    }
}
export class QueryContainer extends Component {
    constructor(props) {
        super(props);
        this.element = this.props.element
    }
    render() {
        let queryContainer = (<ul id="search-place" className="search-container">
        {this.element}
        </ul>);
        return queryContainer;
    }
}
export class PostForm extends Component {
    render() {
        let finalPostForm = (<form  className="sell-form"  id="final-submittion" onSubmit={this.props.handleSubmit}>
            <h1> Last Edit Before Posting Your Book </h1>
            <label className="sr-only">Enter Book's Name:</label>
            <input type="text" id="FinalBookName" className="form-control mt-1 sell-input" placeholder="Book's Name" required=""  value={this.props.state.title} onChange={this.props.handleChangeTitle} />
            <label className="sr-only">Enter Book's Author:</label>
            <input type="text" id="FinalBookAuthor" className="form-control mt-1 sell-input" placeholder="Book's Author" required="" value={this.props.state.author} onChange={this.props.handleChangeName} />

            <label className="sr-only">Select Your Subject: </label>
            <select id="FinalTopic" className="browser-default custom-select " value={this.props.state.topic} onChange={this.props.handleChangeTopic}>
                <option value = "Science">Science</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Infomatics">Infomatics</option>
            </select>
            <label className="sr-only">Condition</label>
            <select id="Condition" className="browser-default custom-select" value={this.props.state.condition} onChange={this.props.handleChangeCondition}>
                <option value="None-Usable">None-Usable</option>
                <option value="Likely New">Likely New</option>
                <option value="New">New</option>
                <option value="Usable">Usable</option>
            </select>
            <label className="sr-only">Book Price</label>
            <input type="text" id="BookPrice" className="form-control mt-1" placeholder="Enter your Price" required="" value={this.props.state.price} onChange={this.props.handleChangePrice}/>
            <label className="sr-only">More Description</label>
            <input type="text" id="moreDescription" className="form-control  mt-1"
                    placeholder="More Description"  onChange={this.props.handleChangeDescr}/>
            <label className="sr-only">Location</label>
            <input type="text" id="userLocation" className="form-control mt-1" placeholder="Address" required="" onChange={this.props.handleChangeAddress} />

            <button id="makepost" className="btn btn-dark btn-primary btn-block mb-3 mt-3" type="submit">Make Post</button>
        </form>);
        return finalPostForm;
    }
}
