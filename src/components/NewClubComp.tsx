// Dashboard.js

import React from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import Search from "./HomePage/Search";
import NewClub from "./Club_Admission/CreateClub";
function NewClubComp() {
  return (
    <div>
      <NavBar />
      <NewClub />
      <Footer />
    </div>
  );
}

export default NewClubComp;
