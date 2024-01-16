import React, { useRef, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./NewStatistic.css";
import { ref } from "@firebase/storage";

interface StatisticFormData {
  eventId: string;
  clubId: string;
  id: number[];
  value: number[];
  label: string[];
  xData: number[];
  yData: number[];
  xLabel: string[];
}

const NewStatistic: React.FC = () => {
  const [statistictempid, setStatisticTempId] = useState("");
  const [formData, setFormData] = useState<StatisticFormData>({
    eventId: "",
    clubId: "",
    id: [],
    value: [],
    label: [],
    xData: [],
    yData: [],
    xLabel: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name === "Id" ||
      name === "value" ||
      name === "label" ||
      name === "xData" ||
      name === "yData" ||
      name === "xLabel"
    ) {
      // Handle array inputs
      const arrayValue = value.split(",").map(Number);
      setFormData({
        ...formData,
        [name]: arrayValue,
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Add the document to the "Statistics" collection without specifying a document ID
      const docRef = await addDoc(collection(db, "Statistic"), formData);
      console.log("Document written with ID: ", docRef.id);

      setStatisticTempId(docRef.id);

      setFormData({
        eventId: "",
        clubId: "",
        id: [],
        value: [],
        label: [],
        xData: [],
        yData: [],
        xLabel: [],
      });

      // Show success message
      alert("Statistic added successfully!");
    } catch (error) {
      console.error("Error adding statistic: ", error);
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1>New Statistics</h1>

          <div style={inputStyle}>
            <h3>Event ID</h3>
            <input
              type="text"
              className="inputField"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Club ID</h3>
            <input
              type="text"
              className="inputField"
              name="clubId"
              value={formData.clubId}
              onChange={handleChange}
            />
          </div>
          <div style={inputStyle}>
            <h3>Statistic Type</h3>
            <textarea className="inputField" name="statistictype"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>ID</h3>
            <textarea className="inputField" name="id"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>Value</h3>
            <textarea className="inputField" name="value"></textarea>
          </div>
          <div style={inputStyle}>
            <h3>Label</h3>
            <textarea className="inputField" name="label"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>Data For X-Axis</h3>
            <textarea className="inputField" name="xdata"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>Data For Y-Axis</h3>
            <textarea className="inputField" name="ydata"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>xLabels</h3>
            <textarea className="inputField" name="xlabel"></textarea>
          </div>

          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewStatistic;
