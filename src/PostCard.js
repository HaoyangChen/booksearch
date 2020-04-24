import React, { Component } from 'react'; 
import imageNotAvailable from './img-not-available.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import './yinanstyle.css';
import Button from '@material-ui/core/Button';
import { Redirect} from 'react-router-dom';

export class FetchValue extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    componentDidMount() {
        let url;
        if (this.props.handleSelectPost) {
            url = this.getBookURL(this.props.bookName,this.props.authorName);
        }
        if (this.props.handleSearchCategory) {
             url = this.getCategoryURL(this.props.searchValue, this.props.searchCategory);
        }

        if (this.props.categoryButtonText) {
            url = this.getCategoryButtonTextURL(this.props.categoryButtonText);
        }  //testing
        fetch(url)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.items
                });
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }

    // update the component when the state in the serach page changes
    componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue || this.props.searchCategory !== prevProps.searchCategory) {
            let url = this.getCategoryURL(this.props.searchValue, this.props.searchCategory);
            fetch(url)
           .then(res => res.json())
           .then(
           (result) => {
               this.setState({
                   isLoaded: true,
                   items: result.items
               });
           },
           (error) => {
               this.setState({
               isLoaded: true,
               error
           });
           }
       )
       }
    }

    // get the url for the form in the make post page
    getBookURL(bookName,authorName){
        let newbookName = bookName.replace(/\s/g, '');
        authorName = authorName.replace(/\s/g, '');
        let titleTerm = "inauthor=";
        let maxResult = 40;

        let url = "https://www.googleapis.com/books/v1/volumes?q=" + newbookName + "+" + titleTerm + authorName + "&maxResults=" + maxResult;
        return url;
    }

    // get the value for the input of search form and return the url
    getCategoryURL(searchValue, categoryValue) {
        let newSearchValue = searchValue.replace(/\s/g, '');
        let newCategoryValue = categoryValue;
        let maxResult = 40;
        let categoryObj = {
            Title: "intitle",
            Author: "inAuthor",
            Publisher: "inpublisher",
            Subject: "subject",
            ISBN: "isbn"
        }
        if (categoryValue in categoryObj) {
            newCategoryValue = categoryObj[categoryValue];
        }
        let url = "https://www.googleapis.com/books/v1/volumes?q=" + newSearchValue + "+" + newCategoryValue + "&maxResults=" + maxResult;
        return url;
    }

    // get the category value from the homepage and return the url
    getCategoryButtonTextURL(categoryBtnText) {
        let maxResult = 40;
        let url = "https://www.googleapis.com/books/v1/volumes?q=" + categoryBtnText + "+subject&maxResults=" + maxResult;
        return url;
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="loadingIcon">
                    <CircularProgress />;
                </div>
            )
        } else {
            // only show "sell one like this when in the make new post"
            if (this.props.handleSelectPost) {
                return (
                    <ul>
                      {this.state.items.map(item => (
                        <li>
                             <CardItem inputItem = {item}  handleSelectPost = {this.props.handleSelectPost}/>
                        </li>
                      ))}
                    </ul>
                    )
            } else {
                return (
                    <ul>
                        {this.state.items.map(item => (
                        <li>
                            <CardItem inputItem = {item} />
                        </li>
                        ))}
                    </ul>
                )
            }
        }
    }
}

export class CardItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
        author: '',
        title: '',
        topic: 'Science',
        price: '',
        condition : 'Likely New',
        imgurl:''
    };
  }
  getISBN(){
      let returnNode=[];
      if (this.props.inputItem.volumeInfo.industryIdentifiers) {
          let identifierArray = this.props.inputItem.volumeInfo.industryIdentifiers;
          for (let i = 0; i < identifierArray.length; i++) {
            let type = this.props.inputItem.volumeInfo.industryIdentifiers[i].type + ": ";

              type = type.replace(/_/g, "-");
              if (type !== 'OTHER: ') {
                  returnNode.push(<span>{type}</span>);
              }
            let identifier = this.props.inputItem.volumeInfo.industryIdentifiers[i].identifier;

              let isbn = (<span>{identifier}</span>);
              returnNode.push(isbn);
              returnNode.push(<br />);
          }
      } else {
            returnNode.push(<span>Not Found</span>);
      }
      return returnNode;
  }

  setimageLink(){
    let imageLinks = this.props.inputItem.volumeInfo.imageLinks;
      if (imageLinks) {
        let thumbnailUrl = imageLinks.thumbnail.replace('http://','https://')
        this.state.imgurl = thumbnailUrl;
      } else {
          this.state.imgurl = imageNotAvailable;
      }
      return this.state.imgurl;
  }

  getAuthorName(){
      let authorName = "Author(s): "
      if (this.props.inputItem.volumeInfo.authors) {
          let authorNameArray = this.props.inputItem.volumeInfo.authors;
          authorName += authorNameArray[0];
          for (let i = 1; i < authorNameArray.length; i++) {
              authorName += ", " + authorNameArray[i];
          }
      } else {
          authorName += " Unknown"
      }
      return authorName;
  }
  getPrice(){
      let price = "Price: "
      if (this.props.inputItem.saleInfo.listPrice) {
          let bookListPirce = this.props.inputItem.saleInfo.listPrice;
          let bookPrice = bookListPirce.amount;
          let bookPriceCurrency = bookListPirce.currencyCode;
          price += bookPrice + " " + bookPriceCurrency;
      } else {
        let saleability = this.props.inputItem.saleInfo.saleability;
          if (saleability === 'NOT_FOR_SALE') {
              saleability = 'NOT FOR SALE';
          }
          price += saleability;
      }
      this.price = price;
      return price;
  }

  render(){
      var bookTitle = this.props.inputItem.volumeInfo.title;
      this.state.title = this.props.inputItem.volumeInfo.title;
      let searchInfoTitle = (<h2 className = "search-info-title">
                                {bookTitle}
                             </h2>);
      // display author
      let authorName = this.getAuthorName();
      this.state.author = authorName;
      let author = (<p>
                        {authorName}
                    </p>);
      let price = this.getPrice();
      this.state.price = price;
      let priceNode =(<p>
                        {price}
                    </p>);
      // Display EBook Availability
      if(this.props.inputItem.accessInfo.viewability !== "NO_PAGES") {
          if(this.props.inputItem.accessInfo.webReaderLink) {
            let googleBookLink = this.props.inputItem.accessInfo.webReaderLink;
            googleBookLink = googleBookLink.replace('http://','https://');
            var eTextLink = (<a target="_blank" href = {googleBookLink} rel="noopener noreferrer"> Availabile </a>)
          }
      } else {
            eTextLink =(<span> Not Availabile </span>);
      }
      let etextSpan =(<span className = "text-left">
                        E-Book Availability:
                        {eTextLink}
                    </span>);
      let eTextNode =(<p className = "text-left">
                        {etextSpan}
                    </p>);

      // Display ISBN
      let identifierNode = (<p className = "text-left">
                                {this.getISBN()}
                            </p>)
      let searchResultImg =(
          <div className = "search-result-img">
            <img src = {this.setimageLink()} alt={bookTitle}/>
          </div>
      );
      let searchInfo = (
          <div className = "search-info">
              {searchInfoTitle}
              {author}
              {priceNode}
              {eTextNode}
              {identifierNode}
              {this.props.handleSelectPost && <Button onClick= {(e) =>this.props.handleSelectPost(e,this.state)}>Sell One Like This</Button>}
          </div>
      );
      let searchCard =(
          <div className = "search-card">
              {searchResultImg}
              {searchInfo}
          </div>
      );
      return searchCard;
  }
}

//------------------------------------
export class MyCard extends Component{
    constructor(props) {
      super(props);
      this.state = this.props.state;
    }
    // setID(newid){
    //   this.id= newid;
    // }
    getID(){
      return this.state.uid;
    }
    render(){
      let searchInfoTitle = (<h2 className = "search-info-title">
                                {this.state.title}
                             </h2>);

      // display author
      let author = (<p>
                        {this.state.author}
                    </p>);

      let priceNode =(<p>
                        {this.state.price}
                    </p>);
      let topicNode = (<p className = "text-left">
                                  <span>Category: </span>{this.state.topic}
                              </p>)
      let conditionNode = (<p className = "text-left">
                                  <span>Condition: </span>{this.state.condition}
                              </p>)

      let descrNode = (<p className = "text-left">
                                <span>Description: </span>{this.state.descr}
                            </p>)
      let addressNode = (<p className = "text-left">
                                  <span>Address: </span>{this.state.address}
                              </p>)
      let searchResultImg =(
          <div className = "search-result-img">
            <img src = {this.state.imgurl} alt={searchInfoTitle}/>
          </div>
      );
      let searchInfo = (
          <div className = "search-info">
              {searchInfoTitle}
              {author}
              {priceNode}
              {topicNode}
              {conditionNode}
              {descrNode}
              {addressNode}
              <Button onClick= {(e) =>this.props.handleRemoveElement(e,this.state.key)}>Delete</Button>
          </div>
      );
      let postcard =(
          <div className = "search-card">
              {searchResultImg}
              {searchInfo}
          </div>
      );
      return postcard;
    }
}
//------------------------------------
export class PostCard extends Component{
    constructor(props) {
      super(props);
      this.state = this.props.state;
      this.state.redirect = false;
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/OthersProfile',
                state: { uid: this.state.uid}
            }}/>
        }
      }
    render(){
      let searchInfoTitle = (<h2 className = "search-info-title">
                                {this.state.title}
                             </h2>);

      // display author
      let author = (<p>
                        {this.state.author}
                    </p>);

      let priceNode =(<p>
                        {this.state.price}
                    </p>);
      let topicNode = (<p className = "text-left">
                                  <span>Category: </span>{this.state.topic}
                              </p>)
      let conditionNode = (<p className = "text-left">
                                  <span>Condition: </span>{this.state.condition}
                              </p>)

      let descrNode = (<p className = "text-left">
                                <span>Description: </span>{this.state.descr}
                            </p>)
      let addressNode = (<p className = "text-left">
                                  <span>Address: </span>{this.state.address}
                              </p>)
      let searchResultImg =(
          <div className = "search-result-img">
            <img src = {this.state.imgurl} alt={searchInfoTitle}/>
          </div>
      );
      let searchInfo = (
          <div className = "search-info">
              {searchInfoTitle}
              {author}
              {priceNode}
              {topicNode}
              {conditionNode}
              {descrNode}
              {addressNode}
              {this.renderRedirect()}
              <Button className="contact-seller-btn" onClick= {this.setRedirect}>Contact Seller</Button>
              <Button onClick= {(e) =>this.props.handleAddFav(e,this.state.key)}>Favorite</Button>
          </div>
      );
      let postcard =(
          <div className = "search-card">
              {searchResultImg}
              {searchInfo}
          </div>
      );
      return postcard;
    }
}
//------------------------------------
export class FavCard extends Component{
    constructor(props) {
      super(props);
      this.state = this.props.state;
      this.state.redirect = false;
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/OthersProfile',
                state: { uid: this.state.uid}
            }}/>
        }
      }
    render(){
      let searchInfoTitle = (<h2 className = "search-info-title">
                                {this.state.title}
                             </h2>);

      // display author
      let author = (<p>
                        {this.state.author}
                    </p>);

      let priceNode =(<p>
                        {this.state.price}
                    </p>);
      let topicNode = (<p className = "text-left">
                                  <span>Category: </span>{this.state.topic}
                              </p>)
      let conditionNode = (<p className = "text-left">
                                  <span>Condition: </span>{this.state.condition}
                              </p>)

      let descrNode = (<p className = "text-left">
                                <span>Descripion: </span>{this.state.descr}
                            </p>)
      let addressNode = (<p className = "text-left">
                                  <span>Address: </span>{this.state.address}
                              </p>)
      let searchResultImg =(
          <div className = "search-result-img">
            <img src = {this.state.imgurl} alt={searchInfoTitle}/>
          </div>
      );
      let searchInfo = (
          <div className = "search-info">
              {searchInfoTitle}
              {author}
              {priceNode}
              {topicNode}
              {conditionNode}
              {descrNode}
              {addressNode}
              {this.renderRedirect()}
              <Button className="contact-seller-btn" onClick= {this.setRedirect}>Contact Seller</Button>
              <Button onClick= {(e) =>this.props.handleRemoveElement(e,this.state.key)}>Delete</Button>
          </div>
      );
      let postcard =(
          <div className = "search-card">
              {searchResultImg}
              {searchInfo}
          </div>
      );
      return postcard;
    }
}
