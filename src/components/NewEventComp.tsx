// Dashboard.js

import React from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import Slider from "./HomePage/Slider";
import Search from "./HomePage/Search";
import NewEvent from "./CreateEvent/NewEvent";
function NewEventComp() {
  return (
    <div>
      <NavBar />

      <NewEvent />
    </div>
  );
}

export default NewEventComp;
