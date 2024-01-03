import React, { useState, useEffect } from "react";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import PieChart from "../Statistics/PieChart";
import { Pie } from "recharts";
import LineChart from "../Statistics/LineChart";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Spinner } from "react-bootstrap";
import { onAuthStateChanged } from "@firebase/auth";
import { UserAuth } from "../RegisterPagePD/AuthContextAlpha";
import { useNavigate } from "react-router-dom";

//npm install @mui/x-charts
//npm install @emotion/styled latest

interface CartInfo {
  eventID: string;
  clubID: string;
  studentID: string | null;
  paymentAmount: string;
  paymentDate: string;
  paymentStatus: string;
  paymentDue: string;
  paymentMethod: string;
}

function ViewEvent() {
  const { user } = UserAuth();
  const [userID, setUserID] = useState<string | null>(user.uid);
  const navigate = useNavigate();

  const { id: eventId } = useParams();
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

  const [cartData, setCartData] = useState<CartInfo>({
    eventID: "",
    clubID: "",
    studentID: "",
    paymentAmount: "",
    paymentDate: "",
    paymentStatus: "",
    paymentDue: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

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
      if (eventId) {
        console.log("**handleLoad");
        const docRef = doc(db, "Event", eventId);
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

            price: "RM" + e.data().eventFee,
          }));

          console.log("bonkers " + userID);

          setCartData((prevCartData) => ({
            ...prevCartData,
            eventID: e.id,
            clubID: e.data().clubID,
            studentID: userID,
            paymentAmount: e.data().eventFee,
            paymentDate: e.data().eventDate,
            paymentStatus: "unpaid",
            paymentDue: "",
            paymentMethod: "",
          }));
          await handleLogo();
          console.log(eventData.id);
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
    console.log("UseEffect " + eventId);
    handleLoad();
  }, [eventId]);

  const onAddCart = async () => {
    try {
      setAddingToCart(true);
      const docClubRef = collection(db, "Payment");
      await addDoc(docClubRef, cartData);
      console.log("Item added to the cart successfully!");
    } catch (error) {
      console.error("Error adding item to the cart:", error);
      setError("Error adding item to the cart");
    } finally {
      setAddingToCart(false);
      navigate("/home");
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                          alt=""
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

                        <div
                          className="d-flex justify-content-end"
                          style={{ margin: "150 0px" }}
                        >
                          <p>{eventData.price}</p>
                          <button
                            className="btn btn-primary ms-3"
                            onClick={onAddCart}
                            disabled={addingToCart}
                          >
                            {addingToCart ? "Adding..." : "Add To Cart"}
                          </button>
                        </div>
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

                      <br />
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
