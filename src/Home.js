import React from "react";
import Carousel from "./Carousel.js";
import CategorySlider from "./CategorySlider.js";
import './Home.css';

export default class Home extends React.Component {
  render() {
    return(
      <div>
          <Carousel />
          <section>
            <h1>Categories</h1>
            <CategorySlider />
          </section>
      </div>
    )
  }
}