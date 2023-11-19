import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

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

const UploadVideo = () => {
  let heading1 = "Upload Video of Introduction";
  return (
    <div>
    <BackgroundLogin>
    <LeftBoxRegP1 children={undefined}></LeftBoxRegP1>
    <RightBoxRegP1>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            {heading1}
          </h1>
      <h6>
        Upload a maximum of 3000MB size video of your desired choice below
      </h6>
      <div style={dropArea}>
        <input style={fileInput} type="file" multiple />
      </div>

      <div
            style={{
              display: "flex",
              marginTop: "25px",
              width: 520 + "px",
              height: 100 + "px",
              alignItems: "flex-end",
              justifyContent: "right",
            }}
          >
            <Link to={"/additional_info"}>
              <button
                type="button"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Save
              </button>
            </Link>
          </div>

    </RightBoxRegP1>
    </BackgroundLogin>
    </div>
  );
};

export default UploadVideo;
