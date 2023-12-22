import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import { Link } from "react-router-dom";

type UPData = {
  photoURL: String,
}

type UPProps = UPData & {
  updateFields:(fields: Partial<UPData>) => void
}

const UploadPhoto = ({photoURL, updateFields}:UPProps) => {

  const dropArea = {
    display: "flex",
    alignItems: "center",
    width: 500 + "px",
    height: 300 + "px",
    padding: 25 + "px",
    border: "1px dashed rgba(255, 20, 255, 0.4)",
    borderRadius: "3px",
    transition: 0.2 + "s",
  };

  const fileInput = {
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    cursor: "pointer",
    opacity: 100,
  };

  const buttonFormat = {
    border: "2px solid maroon",
    color: "maroon",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "50px",
    width: "225px",
    fontWeight: "bold",
  };

  return (
    <div>
      <h6 style={{textAlign: "center",}}>
        Upload a maximum of 10MB size photo of your desired choice below
      </h6>

      <div style={dropArea}>
        <input style={fileInput} type="file" multiple />
      </div>
    </div>
  );
};

export default UploadPhoto;
