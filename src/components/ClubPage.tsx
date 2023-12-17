import React from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import ClubinfoPage from "./ClubinfoPage";
import Search from "./HomePage/Search";

function ClubPage() {
  return (
    <div>
      <NavBar />
      <Search />
      <ClubinfoPage />
      <Footer />
    </div>
  );
}

export default ClubPage;
