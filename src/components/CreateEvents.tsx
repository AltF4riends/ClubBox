import { useRef, useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useImageContext } from "./ImageContext";

function CreateEvent() {
  const { imageUrl, image, setImageInfo } = useImageContext();

  async function handleOnLoad(e: any) {
    e.preventDefault();
    const docRef = doc(db, "event", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().eventName);
      setEventInfo({
        ...setEventInfo,
        eventName: docSnap.data().eventName,

        location: docSnap.data().location,
        startDate: docSnap.data().startDate,
        endDate: docSnap.data().endDate,
        startTime: docSnap.data().startTime,
        endTime: docSnap.data().endTime,
        eventDescription: docSnap.data().eventDescription,
        eventImage: docSnap.data().eventImage,
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      console.log(userID);
    }
  }

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    eventDescription: "",
    eventImage: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log("Event Details:", eventDetails);
    // Add logic for sending data to backend or any other actions here

    toast.success("Event successfully created!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // milliseconds
    });

    const handleImageChange = (e: {
      preventDefault: () => void;
      target: { files: any[] };
    }) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        setImagePreviewUrl(null);
      }
    };
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageInfo(URL.createObjectURL(file), file);
    }
  };
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        minWidth: "100px",
        color: "white",
      }}
    >
      <NavBar />
      <div className="image-upload-container">
        <div className="box-decoration">
          <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
            {image ? (
              <img
                className="rounded-circle"
                height="150vh"
                width="160vw"
                src={URL.createObjectURL(image)}
                alt="Profile"
              />
            ) : (
              <img
                className="rounded-circle"
                height="150vh"
                width="160vw"
                src={eventDetails.eventImage || "public/profile.png"}
                alt="Profile"
              />
            )}

            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <h1
          style={{ textAlign: "center", position: "absolute", left: "800px" }}
        >
          Create Event
        </h1>
        <br />
        <br />

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <br />
                <br />
                <br />
                <br />
                <label
                  htmlFor="eventName"
                  className="form-label"
                  style={{ position: "absolute", left: "100px", width: "25%" }}
                >
                  Event Name
                  <input
                    type="text"
                    className="form-control"
                    id="eventName"
                    name="eventName"
                    value={eventDetails.eventName}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="location"
                  className="form-label"
                  style={{
                    position: "absolute",
                    left: "100px",
                    top: "300px",
                    width: "25%",
                  }}
                >
                  Location
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={eventDetails.location}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="startTime"
                  className="form-label"
                  style={{ position: "absolute", left: "100px", top: "400px" }}
                >
                  Starting Time
                  <input
                    type="text"
                    className="form-control"
                    id="startTime"
                    name="startTime"
                    value={eventDetails.startTime}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="endTime"
                  className="form-label"
                  style={{ position: "absolute", left: "360px", top: "400px" }}
                >
                  Ending Time
                  <input
                    type="text"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    value={eventDetails.endTime}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="startDate"
                  className="form-label"
                  style={{ position: "absolute", left: "100px", top: "500px" }}
                >
                  Starting Date
                  <input
                    type="text"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={eventDetails.startDate}
                    onChange={handleChange}
                  />
                </label>

                <label
                  htmlFor="endDate"
                  className="form-label"
                  style={{
                    position: "absolute",
                    left: "360px",
                    top: "500px",
                    width: "11%",
                  }}
                >
                  Ending Date
                  <input
                    type="text"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={eventDetails.endDate}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  position: "absolute",
                  right: "530px",
                  bottom: "300px",
                  width: "21%",
                  backgroundColor: "purple",
                  padding: "10px",
                }}
              >
                Create Event
              </button>
            </form>
          </div>
          {/* Event Picture and Description */}
          <div className="col-md-6">
            <div className="mb-3">
              <br />
              <br />
              <br />
              <br />

              <label htmlFor="eventImage" className="form-label">
                Event Picture
                <img
                  src="public\L2YS Agenda Reveal.png"
                  alt="L2YS Agenda Reveal"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
                <input
                  type="file"
                  className="form-control"
                  id="eventImage"
                  name="eventImage"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="eventDescription"
                className="form-label"
                style={{ width: "200%", height: "90%" }}
              >
                Event Description
                <textarea
                  className="form-control"
                  id="eventDescription"
                  name="eventDescription"
                  value={eventDetails.eventDescription}
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateEvent;
function setImagePreviewUrl(result: string | ArrayBuffer | null) {
  throw new Error("Function not implemented.");
}
function setEventInfo(arg0: any) {
  throw new Error("Function not implemented.");
}
