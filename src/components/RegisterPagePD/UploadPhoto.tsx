import React, { useContext, useState } from "react";
import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import RegDetailsAndSub from "./RegDetails";
import { FormPageContext } from "../../contexts/FormPageContext";

interface Props {
  children: ReactNode;
}

const UploadPhoto = ({ formData, setFormData }: any) => {
  const { regPage, setRegPage }: any = useContext(FormPageContext);

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

  return (
    <div>
      <h6
        style={{
          textAlign: "center",
        }}
      >
        Upload a maximum of 10MB size photo of your desired choice below
      </h6>
      <div style={dropArea}>
        <input style={fileInput} type="file" multiple />
      </div>
    </div>
  );
};

export default UploadPhoto;
