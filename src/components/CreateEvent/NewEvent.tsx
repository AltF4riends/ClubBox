import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface FormData {
  clubID: string;
  eventName: string;
  eventTime: string;
  eventDate: string;
  eventDesc: string;
  eventCond: string;
  eventType: string;
}

const NewEvent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    clubID: "",
    eventName: "",
    eventTime: "",
    eventDate: "",
    eventDesc: "",
    eventCond: "",
    eventType: "",
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
      // Add the document to the "Event" collection without specifying a document ID
      await addDoc(collection(db, "Event"), formData);

      // Clear form fields
      setFormData({
        clubID: "",
        eventName: "",
        eventTime: "",
        eventDate: "",
        eventDesc: "",
        eventCond: "",
        eventType: "",
      });

      // Show success message
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Optionally, you can show an error message here
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "75%",
    maxHeight: "75%",
  };

  const formStyle: React.CSSProperties = {
    width: "70%",
    height: "80%",
    maxHeight: "75%",
    marginTop: "30px",
    marginBottom: "30px",

    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: "10px",
    padding: "20px",
  };

  const inputStyle: React.CSSProperties = {
    margin: "10px 0",
    padding: "10px",
  };

  const submitButtonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>Event Info</h1>

        <div style={inputStyle}>
          <h3>Club ID</h3>
          <input
            type="text"
            className="form-control"
            name="clubID"
            value={formData.clubID}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Name</h3>
          <input
            type="text"
            className="form-control"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Time</h3>
          <input
            type="text"
            className="form-control"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Date</h3>
          <input
            type="text"
            className="form-control"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Description</h3>
          <input
            type="text"
            className="form-control"
            name="eventDesc"
            value={formData.eventDesc}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Conditions</h3>
          <input
            type="text"
            className="form-control"
            name="eventCond"
            value={formData.eventCond}
            onChange={handleChange}
          />
        </div>

        <div style={inputStyle}>
          <h3>Event Type</h3>
          <input
            type="text"
            className="form-control"
            name="eventType"
            value={formData.eventType}
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
