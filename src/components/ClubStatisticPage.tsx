import React, { useEffect, useState } from "react";
import LineChart from "./Statistics/LineChart";
import PieChart from "../components/Statistics/PieChart";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";

const ClubStatisticPage = () => {
  const { id } = useParams();
  // State for profile information
  const [clubInfo, setClubInfo] = useState({
    clubName: "",
    clubStatus: "",
    clubLinkedIn: "",
    clubTelegram: "",
    clubFacebook: "",
    clubAppReq: "",
    clubDesc: "",
    clubType: "",
    clubLogo: "",
  });

  return (
    <div>
      <NavBar />
      <div
        className="carousel-background"
        style={{
          backgroundColor: "rgba(240, 255, 255, 0.6)", // Azure with alpha for transparency
          borderRadius: "15px",
          paddingBottom: "30px",
          paddingTop: "30px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <PieChart />
        <LineChart />
      </div>
      <Footer />
    </div>
  );
};
export default ClubStatisticPage;
