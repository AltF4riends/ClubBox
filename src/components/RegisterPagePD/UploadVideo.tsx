import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import { Link } from "react-router-dom";

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

const chooseFile = {
  flexShrink: 0,
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 3 + "px",
  padding: "8px 15px",
  marginRight: "10px",
  fontSize: "12px",
};

const fileMsg = {
  fontSize: "small",
  fontWeight: 300,
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
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

type UVData = {
  videoURL: String;
};

type UVProps = UVData & {
  updateFields: (fields: Partial<UVData>) => void;
};

const UploadVideo = ({ videoURL, updateFields }: UVProps) => {
  let heading1 = "Upload Video of Introduction";
  return (
    <div>
      <h6>
        Upload a maximum of 3000MB size video of your desired choice below
      </h6>
      <div style={dropArea}>
        <input
          type="text"
          className="form-control"
          id="vURL"
          placeholder="eg. Video Link"
          aria-label="Video Link"
          onChange={(e) => updateFields({ videoURL: e.target.value })}
        />
      </div>
    </div>
  );
};

export default UploadVideo;
