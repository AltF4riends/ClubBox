import "./HomePage/Slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LeftBoxRegP1 from "./RegisterPagePD/LeftBoxRegP1";
import BackgroundLogin from "./RegisterPagePD/BackgroundLogin";
import RightBoxRegP1 from "./RegisterPagePD/RightBoxRegP1";
import { multiStepFormAI } from "./RegisterPagePD/multiStepFormAI";
import RegisterUserInfo from "./RegisterPagePD/RegisterUserInfo";
import AboutMe from "./RegisterPagePD/AboutMe";
import UploadVideo from "./RegisterPagePD/UploadVideo";
import UploadPhoto from "./RegisterPagePD/UploadPhoto";
import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "./RegisterPagePD/AuthContextAlpha";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Alert } from "react-bootstrap";
import AdditionalInfo from "./RegisterPagePD/AdditionalInfo";
import ForgotPasswordQNA from "./RegisterPagePD/ForgotPasswordQNA";
import { multiStepTitle } from "./RegisterPagePD/multiStepTitle";

const AddInfoPage = () => {
  
  type FormData = {
    pageAddOn1: boolean,
    pageAddOn2: boolean,
    pageAddOn3: boolean,
    aboutMe: String,
    photo: null,
  }
  
  const initial_data: FormData = {
    pageAddOn1: false,
    pageAddOn2: false,
    pageAddOn3: false,
    aboutMe: "",
    photo: null,
  }

  const [data, setData] = useState(initial_data);

  function updateFields(fields: Partial<FormData>)
  {
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {stepsAI, currentStepIndexAI, stepAI, isLastStepAI, goToAI, nextAI, backAI} 
  = multiStepFormAI([
  <AdditionalInfo triggerAboutMe={triggerAboutMe}/>,
  <AboutMe {...data} updateFields={updateFields}/>, 
  //<UploadPhoto {...data} updateFields={updateFields}/>,
  ])

  const {curStepIndex, title, titles, isFirstTitle, isLastTitle, goToTitle, nextTitle, backTitle}
  = multiStepTitle([
    "Add Your Details Now",
    "About Me",
    "Upload Photo",
  ])

  function triggerAboutMe()
  {
    goToTitle(1);
    goToAI(1);
  }

  //Database
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Clicked");

    // if (data.email != null && data.password != null && data.cpassword != null) {
    //   console.log("Checked");
    //   if (data.password != data.cpassword) {
    //     return setError("Passwords do not match!");
    //   }
    //   try {

    //     setError("");
    //     setLoading(true);

    //     await createUser(data.email, data.password);

    //     const docRef = await setDoc(doc(db, "Student", userID), {
    //       firstName: data.fName,
    //       lastName: data.lName,
    //       matricNo: data.matricNo,
    //       yearCourse: data.yearCourse,
    //       phoneNumber: data.phoneNum,
    //       address: data.curAddress,
    //       utmEmail: data.email,
    //       password: data.password,
    //     });
    //     console.log("Signedup");
    //     navigate("/additional_info");//
    //   } catch {
    //     setError("Failed to create an account");
    //     console.log(userID); 
    //   }
    //   setLoading(false);
    // }
  }

  function submitLogic(e: FormEvent)
  {
    e.preventDefault()
    console.log(currentStepIndexAI)
    console.log(data.aboutMe)
    console.log(data.photo)

    if(currentStepIndexAI < 3)
    {
      nextAI(); 
      nextTitle();
    }
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

            <form onSubmit={isLastStepAI ? handleSubmit : submitLogic} 
            className="row g-3">
            
            {stepAI}

              <div>
                {!isLastStepAI && (<button type="button" onClick={backAI}>Back</button>)}

                <button 
                type="submit" 
                className="btn btn-light btn-lg"
                style={buttonFormat}
                disabled={loading}
                >
                {isLastStepAI ? "Finish" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </RightBoxRegP1>
    </BackgroundLogin>
  );
};

export default AddInfoPage;
