import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
import "./Slider.css"; // Import the CSS file
import { Popover } from "antd";
import { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "@firebase/firestore";
import { db } from "../../firebase";

interface EventInfo {
  id: string;
  title: string;
  description: string;
  image: string; // Replace with actual image path
  clubId: string;
  logo: string;
  price: string;
  date: string;
  location: string;
}

const eventData = [
  {
    id: "1",
    title: "",
    description: "Description for Event 1",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "2",
    title: "",
    description: "Description for Event 2",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "3",
    title: "",
    description: "Description for Event 3",
    image: "event3.jpg", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  // Add more events as needed
  {
    id: "4",
    title: "",
    description: "Description for Event 4",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "5",
    title: "",
    description: "Description for Event 5",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "6",
    title: "",
    description: "Description for Event 6",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },

  {
    id: "7",
    title: "",
    description: "",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "8",
    title: "",
    description: "",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
  {
    id: "9",
    title: "",
    description: "",
    image: "", // Replace with actual image path
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  },
];

function Slider() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    const newIndex = startIndex + 3;
    setStartIndex(newIndex >= eventData.length ? 0 : newIndex);
  };
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  async function handleLogo(i = 1) {
    var docClubRef = doc(db, "Club", eventData[i].clubId);
    const docClubSnap = await getDoc(docClubRef);
    if (docClubSnap.exists()) {
      const data = docClubSnap.data();
      eventData[i].logo = data.clubLogo;
    } else {
      console.log("The Club Does not exist");
    }
  }
  useEffect(() => {
    const handleLoad = async () => {
      try {
        console.log("handleLoad");
        const docRef = collection(db, "Event");
        const docSnap = await getDocs(docRef);
        var i = 0;
        var date = getCurrentDate("-");
        console.log(date);
        const q = query(
          collection(db, "Event"),
          where("eventDate", ">=", date)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((e) => {
          eventData[i].id = e.id;
          console.log(eventData[i].id);
          eventData[i].title = e.data().eventName;
          eventData[i].description = e.data().eventDesc;
          eventData[i].clubId = e.data().clubID;
          eventData[i].image = e.data().eventImage;
          handleLogo(i);
          console.log(eventData[i].image);

          i++;
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };
    handleLoad();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          {eventData.map((event, index) =>
            event.title ? (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ margin: "0 150px" }}
                >
                  {eventData
                    .slice(startIndex, startIndex + 3)
                    .map((event, cardIndex) => (
                      <Cards
                        key={cardIndex}
                        image={event.image}
                        title={event.title}
                        desc={event.description}
                        price="55RM"
                        logo={event.logo}
                        eventId={event.id}
                      />
                    ))}
                </div>
              </div>
            ) : null
          )}

          {/*
          <div className="carousel-item">
            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <Cards
                image={eventData[3].image}
                title={eventData[3].title}
                desc={eventData[3].description}
                price="55RM"
                logo={eventData[3].logo}
                eventId={eventData[3].id}
              ></Cards>
              <Cards
                image={eventData[4].image}
                title={eventData[4].title}
                desc={eventData[4].description}
                price="55RM"
                logo={eventData[4].logo}
                eventId={eventData[4].id}
              ></Cards>
              <Cards
                image={eventData[5].image}
                title={eventData[5].title}
                desc={eventData[5].description}
                price="55RM"
                logo={eventData[5].logo}
                eventId={eventData[5].id}
              ></Cards>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="d-flex justify-content-between"
              style={{ margin: "0 150px" }}
            >
              <Cards
                image={eventData[6].image}
                title={eventData[6].title}
                desc={eventData[6].description}
                price="55RM"
                logo={eventData[6].logo}
                eventId={eventData[6].id}
              ></Cards>
              <Cards
                image={eventData[7].image}
                title={eventData[7].title}
                desc={eventData[7].description}
                price="55RM"
                logo={eventData[7].logo}
                eventId={eventData[7].id}
              ></Cards>
              <Cards
                image={eventData[8].image}
                title={eventData[8].title}
                desc={eventData[8].description}
                price="55RM"
                logo={eventData[8].logo}
                eventId={eventData[8].id}
              ></Cards>
            </div>
          </div>
          */}
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
        onClick={handleNext}
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
