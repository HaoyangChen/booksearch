import React from "react";
import "./App.css";
import SidePanel from "./SidePanel.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer.js";


export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <SidePanel/>
      <Footer />
    </React.Fragment>
  );
}
