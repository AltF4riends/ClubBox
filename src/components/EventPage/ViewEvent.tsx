import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import "../HomePage/Slider";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

function ViewEvent() {
  const { id: eventIDFound } = useParams();
  const [eventData, setEventData] = useState({
    id: "9",
    title: "Event 9",
    description: "Description for Event 9",
    image: "",
    clubId: "clubid1",
    logo: "",
    price: "RM",
    date: "date1",
    location: "location1",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleLogo() {
    try {
      const docClubRef = doc(db, "Club", eventData.clubId);
      const docClubSnap = await getDoc(docClubRef);

      if (docClubSnap.exists()) {
        const data = docClubSnap.data();
        setEventData((prevEventData) => ({
          ...prevEventData,
          logo: data.clubLogo,
        }));
      } else {
        console.log("The Club Does not exist");
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
      setError("Error fetching club data");
    }
  }

  const handleLoad = async () => {
    try {
      if (eventIDFound) {
        console.log("**handleLoad");
        const docRef = doc(db, "Event", eventIDFound);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const e = docSnap;
          setEventData((prevEventData) => ({
            ...prevEventData,
            id: e.id,
            title: e.data().eventName,
            description: e.data().eventDesc,
            clubId: e.data().clubID,
            image: e.data().eventImage,
          }));
          await handleLogo();
        }
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      setError("Error fetching event data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("UseEffect " + eventIDFound);
    handleLoad();
  }, [eventIDFound]);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
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
              <img src={eventData.image} alt="eventmap" className="img-fluid" />
              {/* Event Fee and Pay Button */}
              <div
                className="d-flex justify-content-end"
                style={{ margin: "150 0px" }}
              >
                <p>{eventData.price}</p>
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
