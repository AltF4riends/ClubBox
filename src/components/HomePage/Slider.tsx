import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
import "./Slider.css"; // Import the CSS file

function Slider() {
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
