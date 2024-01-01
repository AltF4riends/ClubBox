import React, { useState, useEffect } from "react";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Spinner } from "react-bootstrap";
import { onAuthStateChanged } from "@firebase/auth";

interface CartInfo {
  eventID: string;
  clubID: string;
  studentID: string;
  paymentAmount: string;
  paymentDate: string;
  paymentStatus: string;
  paymentDue: string;
  paymentMethod: string;
}

function ViewEvent() {
  const [userID, setUserID] = useState<string | null>(null);
  const [useName, setuserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        console.log(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount
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

  if (loading) {
    return <Spinner />; // Replace with your loading spinner component
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const onAddCart = async () => {
    try {
      const docClubRef = collection(db, "Payment");
      const docClubSnap = await addDoc(docClubRef, cartData);
    } catch (error) {
      console.error("Error fetching club data:", error);
      setError("Error fetching club data");
    }
  };

  return (
    <div>
      <NavBar />
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
        <div className="container" style={{ margin: "0 150px" }}>
          <div className="row">
            <div className="col-12">
              <h1>{eventData.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src={eventData.image}
                alt="Event Image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-1 border-right"></div>
            <div className="col-md-5" style={{ margin: "100 150px" }}>
              <h2>About Event</h2>
              <p>{eventData.description}</p>
              <p>{eventData.location}</p>
              <img
                src={eventData.image}
                alt="Event Map"
                className="img-fluid"
              />
              <div
                className="d-flex justify-content-end"
                style={{ margin: "150 0px" }}
              >
                <p>{eventData.price}</p>
                <button className="btn btn-primary ms-3" onClick={onAddCart}>
                  Add To Cart
                </button>
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
