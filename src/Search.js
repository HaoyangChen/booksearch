import React from "react";
import bookIcon from './book-icon.png'
import 'whatwg-fetch';
import SearchForm from './SearchForm.js'
import {FetchValue} from './PostCard.js'
import './Search.css';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        isSubmitted: false,
        searchCategory: "title",
        searchValue: "" //initialize data as "empty"
    }; 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    this.renderCategoryButtonResult = this.renderCategoryButtonResult(this); 
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSubmitted: true});
  }

  handleInputChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({searchCategory: event.target.value});
  }

  handleSearchCategory() {
    console.log("handleSearchCategory");
  }

  renderSearchResult() {
    return <FetchValue searchValue ={this.state.searchValue} searchCategory = {this.state.searchCategory} handleSearchCategory={this.handleSearchCategory} />;
  }

  renderCategoryButtonResult() {
    if (this.props.location.state) {
      if (this.props.location.state.categoryText) {
        return <FetchValue categoryButtonText={this.props.location.state.categoryText}/>;
      }
    }
  }

  render() {
      return(
          <div class="SearchPageDiv">
            <div className="bookIconDiv">
              <img src={bookIcon} alt="book icon"/>
            </div>
            <SearchForm handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleCategoryChange={this.handleCategoryChange}/>
            <p id="searchResultP">Your search result will be shown below </p>
            {!this.state.isSubmitted && this.renderCategoryButtonResult}
            {this.state.isSubmitted && this.renderSearchResult()}
          </div>
      )
  }
}
