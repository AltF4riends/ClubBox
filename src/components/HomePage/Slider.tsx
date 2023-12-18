import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
import "./Slider.css"; // Import the CSS file
import { Popover } from "antd";
import { useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";

const eventData = [
  {
    id: "1",
    title: "Event 1",
    description: "Description for Event 1",
    image: "event1.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "2",
    title: "Event 2",
    description: "Description for Event 2",
    image: "event2.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "3",
    title: "Event 3",
    description: "Description for Event 3",
    image: "event3.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  // Add more events as needed
  {
    id: "4",
    title: "Event 4",
    description: "Description for Event 4",
    image: "event4.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "5",
    title: "Event 5",
    description: "Description for Event 5",
    image: "event5.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "6",
    title: "Event 6",
    description: "Description for Event 6",
    image: "event6.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },

  {
    id: "7",
    title: "Event 7",
    description: "Description for Event 7",
    image: "event7.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "8",
    title: "Event 8",
    description: "Description for Event 8",
    image: "event8.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "9",
    title: "Event 9",
    description: "Description for Event 9",
    image: "event9.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "logo1.png",
    price: "RM",
    date: "date1",
    location: "location1",
  },
];

const handleLoad = async () => {
  const docRef = collection(db, "Event");
  const docSnap = await getDocs(docRef);
  var i = 1;
  const q = query(collection(db, "Club"), where("capital", "==", true));
  const querySnapshot = await getDocs(q);

  docSnap.forEach((e) => {
    eventData[i].id = e.id;
    eventData[i].title = e.data().eventName;
    eventData[i].description = e.data().eventDesc;
    eventData[i].image = e.data().clubLogo;
    i++;
  });
};

function Slider() {
  const [loading, setLoading] = useState(false);
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        paddingTop: "10px",
        paddingBottom: "70px",
      }}
    >
      <div
        className="carousel-background"
        style={{
          backgroundColor: "rgba(240, 255, 255, 0.6)", // Azure with alpha for transparency
          borderRadius: "15px",
          paddingBottom: "15px",
          paddingTop: "30px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <Cards
                image="public/L2YS Agenda Reveal.png"
                title="AEISEC"
                desc="this event is very nice you should join please"
                price="55RM"
                logo="public/aeisec logo.png"
                eventId={1}
              ></Cards>
              <Cards
                image="public/ted.jpg"
                title="TEDxUTM"
                desc="this event is very nice you should join please"
                price="25RM"
                logo="public/TED logo.png"
                eventId={2}
              ></Cards>
              <Cards
                image="public/Compfair.jpg"
                title="PERSAKA"
                desc="this event is very nice you should join please"
                price="Free"
                logo="public/PERSAKA logo.jpeg"
                eventId={3}
              ></Cards>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <Cards
                image="public/L2YS Agenda Reveal.png"
                title="AEISEC"
                desc="this event is very nice you should join please"
                price="55RM"
                logo="public/aeisec logo.png"
              ></Cards>
              <Cards
                image="public/ted.jpg"
                title="TEDxUTM"
                desc="this event is very nice you should join please"
                price="25RM"
                logo="public/TED logo.png"
              ></Cards>
              <Cards
                image="public/Compfair.jpg"
                title="PERSAKA"
                desc="this event is very nice you should join please"
                price="Free"
                logo="public/PERSAKA logo.jpeg"
              ></Cards>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <Cards
                image="public/L2YS Agenda Reveal.png"
                title="AEISEC"
                desc="this event is very nice you should join please"
                price="55RM"
                logo="public/aeisec logo.png"
              ></Cards>
              <Cards
                image="public/ted.jpg"
                title="TEDxUTM"
                desc="this event is very nice you should join please"
                price="25RM"
                logo="public/TED logo.png"
              ></Cards>
              <Cards
                image="public/Compfair.jpg"
                title="PERSAKA"
                desc="this event is very nice you should join please"
                price="Free"
                logo="public/PERSAKA logo.jpeg"
              ></Cards>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          style={{ backgroundColor: "black", borderRadius: "50%" }}
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span
          style={{ backgroundColor: "black", borderRadius: "50%" }}
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
