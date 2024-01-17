import React, { useRef, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./NewStatistic.css";
import { ref } from "@firebase/storage";
import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";

interface StatisticFormData {
  clubID: string;
  id: number[];
  value: number[];
  label: string[];
  xdata: number[];
  ydata: number[];
  xlabel: string[];
}

const NewStatistic: React.FC = () => {
  const [statistictempid, setStatisticTempId] = useState("");
  const [formData, setFormData] = useState<StatisticFormData>({
    clubID: "",
    id: [],
    value: [],
    label: [],
    xdata: [],
    ydata: [],
    xlabel: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "id" ||
      name === "value" ||
      name === "xdata" ||
      name === "ydata"
    ) {
      // Handle number array inputs
      const arrayValue = value
        .split(",")
        .map(Number)
        .filter((num) => !isNaN(num)); // Filter out NaN values
      setFormData({
        ...formData,
        [name]: arrayValue,
      });
    } else if (name === "label" || name === "xlabel") {
      // Handle string array inputs
      const arrayValue = value.split(",");
      setFormData({
        ...formData,
        [name]: arrayValue,
      });
    } else {
      // Handle non-array inputs
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "Statistic"), formData);
      console.log("Document written with ID: ", docRef.id);

      setStatisticTempId(docRef.id);

      setFormData({
        clubID: "",
        id: [],
        value: [],
        label: [],
        xdata: [],
        ydata: [],
        xlabel: [],
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
      <NavBar />
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1>New Statistics</h1>

          <div style={inputStyle}>
            <h3>Club ID</h3>
            <input
              type="text"
              className="inputField"
              name="clubID"
              value={formData.clubID}
              onChange={handleChange}
            />
          </div>
          <div style={inputStyle}>
            <h3>Statistic Type</h3>
            <textarea className="inputField" name="statistictype"></textarea>
          </div>

          <div style={inputStyle}>
            <h3>ID</h3>
            <textarea
              className="inputField"
              name="id"
              value={formData.id.join(",")}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Value</h3>
            <textarea
              className="inputField"
              name="value"
              value={formData.value.join(",")}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Label</h3>
            <textarea
              className="inputField"
              name="label"
              value={formData.label.join(",")}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Data For X-Axis</h3>
            <textarea
              className="inputField"
              name="xdata"
              value={formData.xdata.join(",")}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Data For Y-Axis</h3>
            <textarea
              className="inputField"
              name="ydata"
              value={formData.ydata.join(",")}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>xLabels</h3>
            <textarea
              className="inputField"
              name="xlabel"
              value={formData.xlabel.join(",")}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default NewStatistic;
