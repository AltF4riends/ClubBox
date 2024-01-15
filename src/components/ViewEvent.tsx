import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import PieChart from "./Statistics/PieChart";
import { useParams } from "react-router-dom";
import { Pie } from "recharts";
import LineChart from "./Statistics/LineChart";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";

//npm install @mui/x-charts
//npm install @emotion/styled latest

function ViewEvent() {
  useParams(); // Get the event ID from the URL parameter

  // Simulated data for the event details
  const eventData = {
    title: "Leaders2You Summit",
    image: "/L2YS Agenda Reveal.png",
    description:
      "Leaders2You Summit is a gathering of emerging leaders focused on personal and professional growth...",
    location: "Event Location: Dewan Sultan Iskandar, UTM, Johor, Malaysia",
    fee: "Event Fee: 55 RM",
    mapImage: "/eventmap.png",
  };

  return (
    <div>
      <NavBar />
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
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container" style={{ margin: "0 150px" }}>
                  <div className="row">
                    {/* Event Title */}
                    <div className="col-12">
                      <h1 style={{ position: "absolute", left: "20px" }}>
                        {eventData.title}
                      </h1>
                    </div>

                    <br />
                    <br />
                    <br />
                    <div className="row">
                      {/* Event Image */}
                      <div className="col-md-6">
                        <img
                          src={eventData.image}
                          alt="L2YS Agenda Reveal"
                          className="img-fluid"
                          style={{ width: "70%", height: "auto" }}
                        />
                      </div>
                      {/* Vertical Line */}
                      <div className="col-md-1 border-right"></div>
                      {/* About Event */}
                      <div className="col-md-5" style={{ margin: "100 150px" }}>
                        <h2 style={{ position: "absolute", left: "700px" }}>
                          About Event
                        </h2>
                        <br />
                        <br />

                        <p style={{ position: "absolute", left: "700px" }}>
                          {eventData.description}
                        </p>
                        <br />
                        <br />
                        <br />
                        <br />
                        {/* Event Location */}
                        <p style={{ position: "absolute", left: "700px" }}>
                          {eventData.location}
                        </p>
                        {/* Event Map */}
                        <img
                          src={eventData.mapImage}
                          alt="eventmap"
                          className="img-fluid"
                          style={{ position: "absolute", left: "1200px" }}
                        />
                        {/* Event Fee and Pay Button */}
                        <div
                          className="d-flex justify-content-end"
                          style={{ margin: "150 0px" }}
                        >
                          <p
                            style={{
                              position: "absolute",
                              left: "1380px",
                              bottom: "30px",
                            }}
                          >
                            {eventData.fee}
                          </p>
                        </div>
                        <button
                          className="btn btn-primary ms-3"
                          style={{
                            position: "absolute",
                            left: "1500px",
                            bottom: "40px",
                          }}
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="container" style={{ margin: "0 150px" }}>
                  <div className="row">
                    {/* Event Title */}
                    <div className="col-12">
                      <h1
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "20px",
                        }}
                      >
                        {eventData.title}
                      </h1>
                    </div>

                    <br />
                    <br />
                    <br />
                    <div className="row">
                      {/* Event Image */}
                      <div className="col-md-6">
                        <img
                          src={eventData.image}
                          alt="L2YS Agenda Reveal"
                          className="img-fluid"
                          style={{
                            width: "70%",
                            height: "auto",
                          }}
                        />
                      </div>

                      {/* About Event */}
                      <div className="col-md-5" style={{ margin: "100 150px" }}>
                        <h2
                          style={{
                            position: "absolute",
                            left: "700px",
                          }}
                        >
                          Event Statistics
                        </h2>
                      </div>
                      <br />
                      <LineChart />
                      <br />
                      <PieChart />
                    </div>
                  </div>
                </div>
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
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default ViewEvent;
