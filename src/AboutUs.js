import React from "react";
// Firebase
import "firebase/auth";
import "firebase/database";
import "./AboutUs.css";
import haoyangchenImg from "./HaoyangChen.jpg";
import yinanguoImg from "./YinanGuo.jpg";

const content = [
  {
    name: "Haoyang Chen",
    title: "New Grad Software Engineer at University of Washington",
    description:
      "I am a new grad software engineer from the University of Washington. I specialize in full-stack software engineering (frontend/backend) and have built and deployed large-scale web and mobile applications for multiple enterprises, startups, and NGOs. I am currently looking for a full-time new grad Software Engineer position.",
    image: haoyangchenImg,
    description2:
      "I am passionate about developing mobile-first, user-friendly web applications. Through my previous internship experiences, I've developed my collaboration skills and learned how to enhance user experience to satisfy consumer requirements in real-world business situations. My exposure to these experiences has shaped me to be a more astute thinker and motivated me to explore front end engineering further. I hope to utilize my skills to develop well-organized web apps and to improve client relationships and business performance in various industries.",
  },
  {
    name: "Yinan Guo",
    title: "Informatics Student at the University of Washington",
    description:
      " I am an undergraduate student pursuing a double degree in Mathematics and Informatics at the University of Washington. ",
    description2:
      "My interest in science and technology rooted back to my high school study in New Hampshire. Since then, I have received one international award and three patents for my invention in technology and research in computer science. My current research interest lies in the interplay among information science, computer science and applied mathematics.",
    image: yinanguoImg,
  },
];

export default class AboutUS extends React.Component {
  render() {
    return (
      <div className="about-us">
        <h1>About Us</h1>
        {content.map((item, index) => (
          <div className="about-row" key={index}>
            <div className="col-sm-6">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={item.image}
                  alt={item.name}
                ></img>
                <p className="member-name">{item.name}</p>
                <p className="text-muted member-title">{item.title}</p>
              </div>
            </div>
            <div className="col-sm-6 mx-auto justify-text">
              <p className="description-detail text-muted">
                {item.description}
              </p>
              <p className="description-detail text-muted">
                {item.description2}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
