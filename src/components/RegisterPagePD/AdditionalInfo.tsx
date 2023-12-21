import { Link } from "react-router-dom";
import {multiStepForm} from "../RegisterPagePD/multiStepForm";
import { FormEvent, useEffect } from "react";
import { multiStepTitle } from "./multiStepTitle";

type AndInfoProps = {
  triggerAboutMe:() => void
  triggerUploadPhoto:() => void
  triggerUploadVideo:() => void
}

function AdditionalInfo({triggerAboutMe, triggerUploadPhoto, triggerUploadVideo}:AndInfoProps) {

  const buttonFormat = {
    border: "2px solid maroon",
    color: "maroon",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "50px",
    width: "300px",
  };

  return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>

          <h6 style={{textAlign: "center",}}>
            {" "}You May Perform This Later In the Settings {"->"} Profile{" "}
          </h6>

            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
                justifyContent: "space-around",
              }}>
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
                onClick={triggerAboutMe}>
                About Me
              </button>
            </div>

            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
              }}>
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
                onClick={triggerUploadPhoto}>
                Upload Profile Picture
              </button>
            </div>

            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
              }}>
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
                onClick={triggerUploadVideo}>
                Upload Video of Introduction
              </button>
            </div>
        </div>
  );
}

export default AdditionalInfo;
