import { useState, useEffect } from "react";
import { Card } from "antd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref } from "firebase/storage";
import "./ClubAdmission.css";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    id: "0",
    title: "Event 1",
    description: "Description for Event 1",
    image: "event1.jpg", // Replace with actual image path
  },
  {
    id: "1",
    title: "Event 2",
    description: "Description for Event 2",
    image: "event2.jpg", // Replace with actual image path
  },
  {
    id: "2",
    title: "Event 3",
    description: "Description for Event 3",
    image: "event3.jpg", // Replace with actual image path
  },
  // Add more events as needed
];

const handleLoad = async () => {
  const docRef = collection(db, "Club");
  const docSnap = await getDocs(docRef);
  var i = 0;

  docSnap.forEach((e) => {
    eventData[i].id = e.id;
    eventData[i].title = e.data().clubName;
    eventData[i].description = e.data().B_Desc;
    eventData[i].image = e.data().clubLogo;
    i++;
  });
};
// Club Admission Page Component
const ClubAdmission = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleEventSelect = (event: any) => {
    navigate(`/manage_club/${event.id}`);
    console.log("id: ", event.id);
    console.log("Done");
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

  useEffect(() => {
    const fetchData = async () => {
      await handleLoad();
    };

    fetchData();
  }, []); // This useEffect runs once when the component mounts

  return (
    <>
      <div className="club-admission-container">
        <div>
          <div>
            <h1 style={{ color: "white" }}>Clubs</h1>

            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <div className="card-grid">
                <Card
                  cover={
                    <img alt={eventData[0].title} src={eventData[0].image} />
                  }
                  title={eventData[0].title}
                  onClick={() => handleEventSelect(eventData[0])} // Pass the entire object
                >
                  <p>{eventData[0].description}</p>
                </Card>
              </div>

              <div className="card-grid">
                <Card
                  cover={
                    <img alt={eventData[1].title} src={eventData[1].image} />
                  }
                  title={eventData[1].title}
                  onClick={() => handleEventSelect(eventData[1])} // Pass the entire object
                >
                  <p>{eventData[1].description}</p>
                </Card>
              </div>
              <div className="card-grid">
                <Card
                  cover={
                    <img alt={eventData[2].title} src={eventData[2].image} />
                  }
                  title={eventData[2].title}
                  onClick={() => handleEventSelect(eventData[2])} // Pass the entire object
                >
                  <p>{eventData[2].description}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubAdmission;
