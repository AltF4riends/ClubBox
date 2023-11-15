import React, { useState, useContext, ReactNode } from "react";
import { FormPageContext } from "../../contexts/FormPageContext";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import ForgotPasswordQNA from "./ForgotPasswordQNA";
import AdditionalInfo from "./AdditionalInfo";
import UploadPhoto from "./UploadPhoto";
import UploadVideo from "./UploadVideo";
import AboutMe from "./AboutMe";
import RegDetails from "./RegDetails";

interface Props {
  children: ReactNode;
}


const RegisterForm = () => {
  const { regPage, setRegPage }: any = useContext(FormPageContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    yearCourse: "",
    phoneNo: "",
    currAddress: "",
    utmEmail: "",
    password: "",
    confirmPassword: "",
    answerSQ1: "",
    answerSQ2: "",
    answerSQ3: "",
  });

  const MainFormTitles = [
    "Register New User",
    "Forgot Password QNA",
    "Fill In Your Additional Details Now",
    "About Me",
    "Upload Profile Picture",
    "Upload Video of Introduction",
  ];

  const pageDisplay = () => {
    if (regPage === 0) {
      return <RegDetails formData={formData} setFormData={setFormData} />;
    } else if (regPage === 1) {
      return (
        <ForgotPasswordQNA formData={formData} setFormData={setFormData} />
      );
    } else if (regPage === 2) {
      return <AdditionalInfo formData={formData} setFormData={setFormData} />;
    } else if (regPage === 3) {
      return <AboutMe formData={formData} setFormData={setFormData} />;
    } else if (regPage === 4) {
      return <UploadPhoto formData={formData} setFormData={setFormData} />;
    } else if (regPage === 5) {
      return <UploadVideo formData={formData} setFormData={setFormData} />;
    }
  };

  const getButtonDisp = () => {
    return regPage < 2 ? "Proceed" : "Submit";
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
    <BackgroundLogin>
      <LeftBoxRegP1 children={undefined}></LeftBoxRegP1>
      <RightBoxRegP1>
        <div
          className="form-header"
          style={{
            width: 500 + "px",
            height: 100 + "px",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            {MainFormTitles[regPage]}
          </h1>
          <br />
        </div>
        <div
          className="form-body"
          style={{
            width: 500 + "px",
            height: 450 + "px",
          }}
        >
          {pageDisplay()}
        </div>
        <div
          className="form-footer"
          style={{
            marginTop: "25px",
            marginLeft: 100 + "px",
            width: 100 + "px",
            height: 100 + "px",
          }}
        >
          <div>
            <button
              type="button"
              className="btn btn-light btn-lg"
              style={buttonFormat}
              onClick={() => setRegPage((currPage: any) => currPage + 1)}
            >
              {getButtonDisp()}
            </button>
          </div>
        </div>
      </RightBoxRegP1>
    </BackgroundLogin>
  );
};

export default RegisterForm;
