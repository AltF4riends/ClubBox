import React, { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewEvent.css";
import TimePicker from "react-time-picker";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import "react-time-picker/dist/TimePicker.css";
import { useImageContext } from "../ImageContext";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

interface FormData {
  clubID: string;
  eventName: string;
  eventTime: string;
  eventDate: string;
  eventDesc: string;
  eventCond: string;
  eventType: string;
  eventImage: string;
  eventPrice: number;
}

const NewEvent: React.FC = () => {
  const [eventtempid, setEventTempId] = useState("");

  const [userClub, setUserClub] = useState<string | null>(null); // State to store user access level
  const [userID, setUserID] = useState<string | null>(null);
  const { imageUrl, image, setImageInfo } = useImageContext();
  const [formData, setFormData] = useState<FormData>({
    clubID: "cl001",
    eventName: "",
    eventTime: "",
    eventDate: new Date().toISOString().split("T")[0],
    eventDesc: "",
    eventCond: "",
    eventType: "Online",
    eventImage: "",
    eventPrice: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchUserClub = async () => {
      if (userID) {
        const docRef = doc(db, "Student", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserClub(userData.clubID);
          console.log(userClub); // This might not log the updated value
        } else {
          console.log("No document");
        }
      }
    };

    fetchUserClub();
  }, [userID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "eventPrice" && !/^\d*\.?\d*$/.test(value)) {
      alert("Please insert the price in numbers or decimals only.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handletextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(userClub);
  }, [userClub]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Include clubID in formData
      const formDataWithClubID: FormData = {
        ...formData,
        clubID: userClub || "cl001", // Assuming userClub is a string or providing a default value
      };

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "Event"), formDataWithClubID);
      setEventTempId(docRef.id);

      // Save additional information including the image
      saveInfo(docRef.id);

      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  useEffect(() => {
    console.log(userClub);
  }, [userClub]);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh",
  };

  const formStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "2vw",
    border: "1px solid #ccc",
    borderRadius: "1vw",
    backgroundColor: "#f4f4f4",
    width: "40vw",
    maxHeight: "75vh",
    overflowY: "auto",
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "1vw",
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "1vw 2vw",
    borderRadius: "0.5vw",
    cursor: "pointer",
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(formData.eventDate)
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        eventDate: date.toISOString().split("T")[0],
      }));
    }
  };
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      eventTime: value,
    }));
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

  const saveInfo = async (eventId: string) => {
    try {
      console.log("saveInfo");
      console.log(eventtempid);
      if (image) {
        let storageRef = ref(getStorage(), `Event/${eventtempid}/picture`);
        console.log("saveInfo2");

        await uploadBytes(storageRef, image);

        const downloadURL = await getDownloadURL(storageRef);

        setFormData({ ...formData, eventImage: downloadURL });

        await updateDoc(doc(db, "Event", eventId), {
          ...formData,
          imageUrl: downloadURL,
        });
      } else {
      }
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>New Event Info</h1>

        <div
          onClick={handleImageClick}
          style={{ cursor: "pointer", marginTop: "30px", marginBottom: "30px" }}
        >
          {image ? (
            <img
              height="150vh"
              width="160vw"
              src={URL.createObjectURL(image)}
              alt="Profile"
            />
          ) : (
            <img
              height="150vh"
              width="160vw"
              src={formData.eventImage || "public/event.png"}
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
        <div style={inputStyle}>
          <h3>Event Name</h3>
          <input
            type="text"
            className="inputField"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Time</h3>
          <input
            className="inputField"
            type="text"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleTimeChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Date</h3>
          <label htmlFor="eventDate"></label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            id="eventDate"
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Description</h3>
          <textarea
            className="inputField"
            name="eventDesc"
            value={formData.eventDesc}
            onChange={handletextareaChange}
          ></textarea>
        </div>

        <div style={inputStyle}>
          <h3>Event Conditions</h3>
          <input
            type="text"
            className="inputField"
            name="eventCond"
            value={formData.eventCond}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Type</h3>
          <label></label>
          <select
            name="eventType"
            id="eventType"
            value={formData.eventType}
            onChange={handleSelectChange}
            defaultValue="Online"
          >
            <option value="Online">Online</option>
            <option value="Face-to-face">Face-to-face</option>
          </select>
        </div>

        <div style={inputStyle}>
          <h3>Event Price</h3>
          <input
            type="text"
            className="inputFieldPrice"
            name="eventPrice"
            value={formData.eventPrice}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewEvent;
