import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import Cards from "./HomePage/Cards";

const eventData = [
  {
    id: 1,
    title: "Event 1",
    description: "Description for Event 1",
    image: "event1.jpg", // Replace with actual image path
  },
  {
    id: 2,
    title: "Event 2",
    description: "Description for Event 2",
    image: "event2.jpg", // Replace with actual image path
  },
  // Add more events as needed
];

// Club Admission Page Component
const ClubAdmission = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadFile(file || null);
  };

  const handleEnroll = () => {
    // Logic to handle enrollment and file upload
    console.log(
      "Enrolled in event:",
      selectedEvent?.title,
      "and uploaded file:",
      uploadFile
    );
  };

  return (
    <>
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
          <h1>Club Admission</h1>
          <div
            className="d-flex justify-content-between"
            style={{ margin: "0 150px" }}
          >
            <Cards
              image="public/L2YS Agenda Reveal.png"
              title="AEISEC"
              desc=""
              price=""
              logo="public/aeisec logo.png"
            ></Cards>
            <Cards
              image="public/ted.jpg"
              title="TEDxUTM"
              desc={""}
              price={""}
              logo="public/TED logo.png"
            ></Cards>
            <Cards
              image="public/Compfair.jpg"
              title="PERSAKA"
              desc={""}
              price={""}
              logo="public/PERSAKA logo.jpeg"
            ></Cards>
            <button onClick={() => handleEventSelect(event)}>Select</button>
          </div>

          {selectedEvent && (
            <div>
              <h2>Enroll in {selectedEvent.title}</h2>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleEnroll}>Enroll</button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ClubAdmission;
