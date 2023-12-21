import "./HomePage/Slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LeftBoxRegP1 from "./RegisterPagePD/LeftBoxRegP1";
import BackgroundLogin from "./RegisterPagePD/BackgroundLogin";
import RightBoxRegP1 from "./RegisterPagePD/RightBoxRegP1";
import { multiStepForm } from "./RegisterPagePD/multiStepForm";
import RegisterUserInfo from "./RegisterPagePD/RegisterUserInfo";
import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "./RegisterPagePD/AuthContextAlpha";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Alert } from "react-bootstrap";
import ForgotPasswordQNA from "./RegisterPagePD/ForgotPasswordQNA";
import { multiStepTitle } from "./RegisterPagePD/multiStepTitle";

const RegisterForm = () => {
  
  type FormData = {
    fName: String,
    lName: String,
    matricNo: String,
    yearCourse: String,
    phoneNum: String,
    curAddress: String,
    email: String,
    password: String,
    cpassword: String,
    ans1: String,
    ans2: String,
    ans3: String,
    aboutMe: String,
    photo: String,
    videoURL: String,
    accessLvl: number,
    clubID: String
  }
  
  const initial_data: FormData = {
    fName: "",
    lName: "",
    matricNo: "",
    yearCourse: "",
    phoneNum: "",
    curAddress: "",
    email: "",
    password: "",
    cpassword: "",
    ans1: "",
    ans2: "",
    ans3: "",
    aboutMe: "",
    photo: "",
    videoURL: "",
    accessLvl: 1,
    clubID: ""
  }

  const [data, setData] = useState(initial_data);

  function updateFields(fields: Partial<FormData>)
  {
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, goTo, next, back} 
  = multiStepForm([
  <RegisterUserInfo {...data} updateFields={updateFields}/>, 
  <ForgotPasswordQNA {...data} updateFields={updateFields}/>,
  ])

  const {curStepIndex, title, titles, isFirstTitle, isLastTitle, goToTitle, nextTitle, backTitle}
  = multiStepTitle([
    "Register New User",
    "Forget Password QNA",
  ])

  //Database
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Clicked");

    if (data.email != null && data.password != null && data.cpassword != null) {
      console.log("Checked");
      if (data.password != data.cpassword) {
        return setError("Passwords do not match!");
      }
      try {
        console.log(1);

        setError("");
        setLoading(true);

        console.log(2);
        await createUser(data.email, data.password);

        console.log(3);
        const docRef = await setDoc(doc(db, "Student", userID), {
          firstName: data.fName,
          lastName: data.lName,
          matricNo: data.matricNo,
          yearCourse: data.yearCourse,
          phoneNumber: data.phoneNum,
          address: data.curAddress,
          utmEmail: data.email,
          password: data.password,
          
        });
        console.log("Signedup");
        navigate("/additional_info");//
      } catch {
        setError("Failed to create an account");
        console.log(userID); 
      }
      setLoading(false);
    }
  }

  function submitLogic(e: FormEvent)
  {
    e.preventDefault()
    console.log(currentStepIndex)
    console.log(data.fName)
    console.log(data.password)
    console.log(data.ans3)

    next(); 
    nextTitle();
  }

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
      <LeftBoxRegP1/>
      <RightBoxRegP1>
        <div>
          <div
            className="form-header"
            style={{
              width: 500 + "px",
              height: 100 + "px",
              marginBottom: "25px",
            }}>

            <h1 style={{textAlign: "center",}}>
                {title}
            </h1>
          </div>
            
          <div
          className="form-body"
          style={{
            width: 575 + "px",
            height: 425 + "px",
          }}>

            {error && <Alert variant="danger">{error}</Alert>}

            <form onSubmit={isLastStep ? handleSubmit : submitLogic} 
            className="row g-3">
            
            {step}

              <div>
                {!isFirstStep && (<button type="button" onClick={back}>Back</button>)}

                <button 
                type="submit" 
                className="btn btn-light btn-lg"
                style={buttonFormat}
                disabled={loading}
                >
                {isLastStep ? "Finish" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </RightBoxRegP1>
    </BackgroundLogin>
  );
};

export default RegisterForm;
