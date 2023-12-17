import { useState } from "react";

import "./HomePage/Slider.css";
import "./ClubAdmission.css";

import { Card, Col, Row } from "antd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
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
        <div>
          <h1 color="white">Clubs</h1>

          <div
            className="d-flex justify-content-between"
            style={{ margin: "0 150px" }}
          >
            <div className="card-grid">
              <Card
                cover={
                  <img alt={eventData[1].title} src={eventData[1].image} />
                }
                title={eventData[1].title}
              >
                <p>{eventData[1].description}</p>
              </Card>
              <Card
                cover={
                  <img alt={eventData[2].title} src={eventData[2].image} />
                }
                title={eventData[2].title}
              >
                <p>{eventData[2].description}</p>
              </Card>
              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>
            </div>

            <div className="card-grid">
              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>

              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>

              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>
            </div>
            <div className="card-grid">
              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>

              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>

              <Card
                cover={<img alt="PERSAKA" src="public/Compfair.jpg" />}
                title="PERSAKA"
                extra={<div>{/* Price or any other extra content */}</div>}
              >
                {/* Description or any other content */}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubAdmission;
