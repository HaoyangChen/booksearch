import React from "react";
import './SearchForm.css';
import SearchIcon from "@material-ui/icons/Search";
import 'whatwg-fetch';

export default class SearchForm extends React.Component {
  render() {
    return(
        <section class="search-form">
          <form action="" method="GET" name="search" role="search" onSubmit={this.props.handleSubmit}>
            <p class="inp-wrap search-wrap">
              <label for="search-field" class="search-label grid-25">Find</label>
              <input type="search" name="search-term" id="search-field" class="grid-75" placeholder="e.g. textbook, novel" onChange={this.props.handleInputChange}/></p>
            <p class="inp-wrap cat-wrap">
              <label for="categories" class="grid-20">by</label>
              <select name="search categories" id="categories" class="grid-80" onChange={this.props.handleCategoryChange}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="publisher">Publisher</option>
                <option value="subject">Subject</option>
                <option value="isbn">Isbn</option>
              </select>
            </p>
            <p class="inp-wrap submit-wrap">
              <button class="grid-100 btn">
                <span class="search-icon-container">
                  <SearchIcon />
                </span>
              </button>
            </p>
          </form>
        </section>  
    )
  }
}
