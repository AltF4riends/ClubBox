import React, { useRef, useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useImageContext } from "../ImageContext";
import "./CreateClub.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

interface FormData {
  clubID: string;
  ClubName: string;
  ClubTime: string;
  ClubDate: string;
  ClubDesc: string;
  ClubCond: string;
  ClubType: string;
  ClubImage: string;
}

const CreateClub: React.FC = () => {
  const [Clubtempid, setClubTempId] = useState("");
  const { imageUrl, image, setImageInfo } = useImageContext();
  const [formData, setFormData] = useState<FormData>({
    clubID: "",
    ClubName: "",
    ClubTime: "",
    ClubDate: new Date().toISOString().split("T")[0],
    ClubDesc: "",
    ClubCond: "",
    ClubType: "",
    ClubImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Add the document to the "Club" collection without specifying a document ID
      const docRef = await addDoc(collection(db, "Club"), formData);

      // Wait for the promise to resolve before calling saveInfo
      await saveInfo(docRef.id);

      setClubTempId(docRef.id); // Set Clubtempid after saveInfo

      // Clear form fields
      setFormData({
        clubID: "",
        ClubName: "",
        ClubTime: "",
        ClubDate: new Date().toISOString().split("T")[0],
        ClubDesc: "",
        ClubCond: "",
        ClubType: "",
        ClubImage: "",
      });

      // Show success message
      alert("Club added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Optionally, you can show an error message here
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    marginTop: "80px",
    marginBottom: "80px",
  };

  const formStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    width: "50vh",
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "15px",
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(formData.ClubDate) // Convert string to Date
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        ClubDate: date.toISOString().split("T")[0], // Convert Date to string
      }));
    }
  };
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const handleTimeChange = (time: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      ClubTime: time || "00:00", // Set a default time if time is null
    }));
  };

  const handleImageChange = (Club: React.ChangeEvent<HTMLInputElement>) => {
    const file = Club.target.files?.[0];

    if (file) {
      setImageInfo(URL.createObjectURL(file), file);
    }
  };
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const saveInfo = async (ClubId: string) => {
    try {
      if (image) {
        const storageRef = ref(getStorage(), `Club/${ClubId}/picture`);

        // Upload the image
        await uploadBytes(storageRef, image);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the updated image URL
        await updateDoc(doc(db, "Club", ClubId), {
          ...formData,
          ClubImage: downloadURL,
        });
      } else {
        console.log("No picture");
      }
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>New Club Info</h1>

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
              src={formData.ClubImage || "public/Club.png"}
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
          <h3>Club Name</h3>
          <input
            type="text"
            className="inputField"
            name="ClubName"
            value={formData.ClubName}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Club Time</h3>
          <TimePicker onChange={handleTimeChange} value={formData.ClubTime} />
        </div>

        <div style={inputStyle}>
          <h3>Club Date</h3>
          <label htmlFor="ClubDate"></label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            id="ClubDate"
          />
        </div>

        <div style={inputStyle}>
          <h3>Club Description</h3>
          <textarea className="inputField" name="ClubDesc"></textarea>
        </div>

        <div style={inputStyle}>
          <h3>Club Conditions</h3>
          <input
            type="text"
            className="inputField"
            name="ClubCond"
            value={formData.ClubCond}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Club Type</h3>
          <label></label>

          <select name="ClubType" id="ClubType">
            <option value="Online">Online</option>
            <option value="Face-to-face">Face-to-face</option>
          </select>
        </div>

        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
