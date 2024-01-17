import React from "react";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import ClubinfoPage from "./ClubinfoPage";
import Search from "../HomePage/Search";
import ClubAdmission from "./ClubAdmission";

function ClubPage() {
  return (
    <div>
      <NavBar />
      <ClubAdmission />
      <Footer />
    </div>
  );
}

export default ClubPage;
