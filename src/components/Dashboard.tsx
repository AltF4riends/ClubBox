// Dashboard.js

import React from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import Slider from "./HomePage/Slider";
import Search from "./HomePage/Search";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <Search />
      <Footer />
      <Slider />
    </div>
  );
}

export default Dashboard;
