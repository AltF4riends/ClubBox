import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewEvent.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

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
    eventDate: new Date().toISOString().split("T")[0],
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
        eventDate: new Date().toISOString().split("T")[0],
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
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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
    new Date(formData.eventDate) // Convert string to Date
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        eventDate: date.toISOString().split("T")[0], // Convert Date to string
      }));
    }
  };
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const handleTimeChange = (time: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      eventTime: time || "00:00", // Set a default time if time is null
    }));
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1>New Event Info</h1>

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

        <div>
          <h3>Event Time</h3>
          <TimePicker onChange={handleTimeChange} value={formData.eventTime} />
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
          <textarea className="inputField" name="eventDesc"></textarea>
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

          <select name="eventType" id="eventType">
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

export default NewEvent;
