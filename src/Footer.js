import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="sticky-footer py-4 bg-dark text-white mt-4">
        <div className="container text-sm-center">
          <small>Copyright © Haoyang Chen, Yinan Guo</small>
        </div>
      </footer>
    );
  }
}
