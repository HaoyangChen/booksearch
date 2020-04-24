import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import comicBook from "./comic-book.jpg";
import fairytaleBook from "./fairytale-book.jpg";
import horrorBook from "./horror-book.jpg";
import romanceBook from "./romance-book.jpg";
import textBook from "./textbook.jpg";
import actionBook from "./action-book.jpg";
import Category from './Category.js';
 
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default class CategorySlider extends React.Component {
  render() {
    return(
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType === "mobile" ? true : false}
            // autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <Category imageLink={actionBook} buttonText="Action »" alt="action"/>
            <Category imageLink={comicBook} buttonText="Comic »" alt="comic"/>
            <Category imageLink={fairytaleBook} buttonText="Fairy Tale »" alt="fairy tale"/>
            <Category imageLink={horrorBook} buttonText="Horror »" alt="horror"/>
            <Category imageLink={textBook} buttonText="Textbook »" alt="textbook"/>
            <Category imageLink={romanceBook} buttonText="Romance »" alt="romance"/>
        </Carousel>
    )
  }
}
