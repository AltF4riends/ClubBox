import React, { useContext, useState } from "react";
import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import RegDetails from "./RegDetails";
import { FormPageContext } from "../../contexts/FormPageContext";

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

const UploadVideo = ({ formData, setFormData }: any) => {
  const { regPage, setRegPage }: any = useContext(FormPageContext);
  return (
    <div>
      <h6>
        Upload a maximum of 3000MB size video of your desired choice below
      </h6>
      <div style={dropArea}>
        <input style={fileInput} type="file" multiple />
      </div>
    </div>
  );
};

export default UploadVideo;
