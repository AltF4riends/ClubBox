import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ViewEvent() {
  useParams(); // Get the event ID from the URL parameter

  // Simulated data for the event details
  const eventData = {
    title: "Leaders2You Summit",
    image: "public/L2YS Agenda Reveal.png",
    description:
      "Leaders2You Summit is a gathering of emerging leaders focused on personal and professional growth...",
    location: "Event Location: Dewan Sultan Iskandar, UTM, Johor, Malaysia",
    fee: "Event Fee: 55 RM",
    mapImage: "public/eventmap.png",
  };

  return (
    <div>
      <NavBar />
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
        <div className="container" style={{ margin: "0 150px" }}>
          <div className="row">
            {/* Event Title */}
            <div className="col-12">
              <h1>{eventData.title}</h1>
            </div>
          </div>
          <div className="row">
            {/* Event Image */}
            <div className="col-md-6">
              <img
                src={eventData.image}
                alt="L2YS Agenda Reveal"
                className="img-fluid"
              />
            </div>
            {/* Vertical Line */}
            <div className="col-md-1 border-right"></div>
            {/* About Event */}
            <div className="col-md-5" style={{ margin: "100 150px" }}>
              <h2>About Event</h2>
              <p>{eventData.description}</p>
              {/* Event Location */}
              <p>{eventData.location}</p>
              {/* Event Map */}
              <img
                src={eventData.mapImage}
                alt="eventmap"
                className="img-fluid"
              />
              {/* Event Fee and Pay Button */}
              <div
                className="d-flex justify-content-end"
                style={{ margin: "150 0px" }}
              >
                <p>{eventData.fee}</p>
                <button className="btn btn-primary ms-3">Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewEvent;
