import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Slider.css";
import { Spin } from "antd";
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
  image: string;
  clubId: string;
  logo: string;
  price: string;
  date: string;
  location: string;
}

const eventData: EventInfo[] = [
  {
    id: "1",
    title: "",
    description: "",
    image: "",
    clubId: "",
    logo: "",
    price: "",
    date: "",
    location: "",
  },
];

function Slider() {
  const [startIndex, setStartIndex] = useState(0);
  const [loadingSlider, setLoadingSlider] = useState(true);

  const handleNext = () => {
    const newIndex = startIndex + 3;
    setStartIndex(newIndex >= eventData.length ? 0 : newIndex);
  };

  const handlePrev = () => {
    const newIndex = startIndex - 3;
    setStartIndex(newIndex >= eventData.length ? 0 : newIndex);
  };

  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleLogo(clubId: string) {
    try {
      const docClubRef = doc(db, "Club", clubId);
      const docClubSnap = await getDoc(docClubRef);
      if (docClubSnap.exists()) {
        const data = docClubSnap.data();
        return data.clubLogo;
      } else {
        console.log("The Club Does not exist");
        return "";
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
      return "";
    }
  }

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const currentDate = getCurrentDate("-");
        const q = query(
          collection(db, "Event"),
          where("eventDate", ">=", currentDate)
        );
        const querySnapshot = await getDocs(q);

        const newEventNames: string[] = [];
        for (const e of querySnapshot.docs) {
          const newEvent: EventInfo = {
            id: e.id,
            title: e.data().eventName,
            description: e.data().eventDesc,
            clubId: e.data().clubID,
            image: e.data().eventImage,
            logo: "",
            price: e.data().eventFee,
            date: e.data().eventDate,
            location: e.data().eventLocation,
          };
          var tempname: string = e.data().eventName;
          newEventNames.push(tempname.toLowerCase());

          eventData.push(newEvent);

          const logo = await handleLogo(e.data().clubID);
          newEvent.logo = logo;
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      } finally {
        setLoading(false);
        setLoadingSlider(false); // Set loadingSlider to false after data is loaded
      }
    };

    handleLoad();
  }, []);

  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  if (error) {
    return <p style={{ color: "white" }}>Error: {error}</p>;
  }

  return (
    <div>
      {loadingSlider ? (
        <Spin size="large" />
      ) : (
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
              backgroundColor: "rgba(240, 255, 255, 0.6)",
              borderRadius: "15px",
              paddingBottom: "15px",
              paddingTop: "30px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            <div className="carousel-inner">
              {[0, 1, 2].map((item, index) => (
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
                      .map(
                        (event, subIndex) =>
                          event.title && (
                            <Cards
                              key={subIndex}
                              image={event.image}
                              title={event.title}
                              desc={event.description}
                              price={event.price}
                              logo={event.logo}
                              eventId={event.id}
                            />
                          )
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
            onClick={handlePrev}
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
      )}
    </div>
  );
}

export default Slider;
