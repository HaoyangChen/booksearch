import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./slider-animations.css";
import "./carouselStyle.css";
import { Redirect} from 'react-router-dom';
import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";
import banner3 from "./banner3.jpg";
import portrait from "./portrait.jpg";

const content = [
  {
    title: "Info In, Book Out",
    description:
      "The overarching goal of our application is to help students to find the cheapest book they want to buy quickly",
    button: "Search Book",
    image: banner1,
    user: "Haoyang Chen, Yinan Guo",
    userProfile: portrait
  },
  {
    title: "Info In, Book Out",
    description:
      "Start by searching the book your are looking for, or simply click one of the categories below to find out what books are available",
    button: "Search Book",
    image: banner2,
    user: "Haoyang Chen, Yinan Guo",
    userProfile: portrait
  },
  {
    title: "Info In, Book Out",
    description:
      "Our application is built using React.js and we utilize the Google Books API to fetch book information and Google's Firebase to store your information",
    button: "Search Book",
    image: banner3,
    user: "Haoyang Chen, Yinan Guo",
    userProfile: portrait
  }
];

export default class Carousel extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/Search' />
    }
  }

  render() {
    return (
      <div>
        <Slider className="slider-wrapper">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                {this.renderRedirect()}
                <button onClick={this.setRedirect}>{item.button}</button>
              </div>
              <section>
                <img src={item.userProfile} alt={item.user} />
                <span>
                  Created by <strong>{item.user}</strong>
                </span>
              </section>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
