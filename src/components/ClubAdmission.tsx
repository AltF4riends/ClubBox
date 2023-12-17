import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import Cards from "./HomePage/Cards";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { storage } from "../firebase";
import { getStorage, ref } from "firebase/storage";

const eventData = [
  {
    id: "1",
    title: "Event 1",
    description: "Description for Event 1",
    image: "event1.jpg", // Replace with actual image path
  },
  {
    id: "2",
    title: "Event 2",
    description: "Description for Event 2",
    image: "event2.jpg", // Replace with actual image path
  },
  {
    id: "3",
    title: "Event 3",
    description: "Description for Event 3",
    image: "event3.jpg", // Replace with actual image path
  },
  // Add more events as needed
];
const handleLoad = async () => {
  const docRef = collection(db, "Club");
  const docSnap = await getDocs(docRef);
  var i = 1;

  docSnap.forEach((e) => {
    eventData[i].id = e.id;
    eventData[i].title = e.data().clubName;
    eventData[i].description = e.data().clubDesc;
    eventData[i].image = e.data().clubLogo;
    i++;
  });
};
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
      <div onLoad={handleLoad}>
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
              image={eventData[1].image}
              title={eventData[1].title}
              desc={eventData[1].description}
              price=""
              logo={eventData[1].image}
            ></Cards>
            <Cards
              image={eventData[2].image}
              title={eventData[2].title}
              desc={eventData[2].description}
              price={""}
              logo={eventData[2].image}
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
