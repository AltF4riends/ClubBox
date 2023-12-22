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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Alert } from "react-bootstrap";
import AdditionalInfo from "./RegisterPagePD/AdditionalInfo";
import { multiStepTitle } from "./RegisterPagePD/multiStepTitle";
import { useImageContext } from "./ImageContext";

const AddInfoPage = () => {
  
  type FormData = {
    aboutMe: String,
    photoURL: String,
    videoURL: String,
  }
  
  const initial_data: FormData = {
    aboutMe: "",
    photoURL: "",
    videoURL: ""
  }

  const [data, setData] = useState(initial_data);

  //Change initial_data as input comes
  function updateFields(fields: Partial<FormData>)
  {
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {stepsAI, currentStepIndexAI, stepAI, isLastStepAI, goToAI, nextAI, backAI} 
  = multiStepFormAI([
  <AdditionalInfo triggerAboutMe={triggerAboutMe} triggerUploadPhoto={triggerUploadPhoto} triggerUploadVideo={triggerUploadVideo}/>,
  <AboutMe {...data} updateFields={updateFields}/>, 
  <UploadPhoto {...data} updateFields={updateFields}/>,
  <UploadVideo {...data} updateFields={updateFields}/>,
  ])

  const {curStepIndex, title, titles, isFirstTitle, isLastTitle, goToTitle, nextTitle, backTitle}
  = multiStepTitle([
    "Add Your Details Now",
    "About Me",
    "Upload Photo",
    "Upload CV Video URL"
  ])

  function triggerAboutMe()
  {
    goToTitle(1);
    goToAI(1);
  }

  function triggerUploadPhoto()
  {
    goToTitle(2);
    goToAI(2);
  }

  function triggerUploadVideo()
  {
    goToTitle(3);
    goToAI(3);
  }

  //Database
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State for uploading status
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmitAI(e: any) {
    e.preventDefault();
    console.log("Clicked");

      try {
        setError("");
        setLoading(true);
        console.log("Checked");

        const docRef = await setDoc(doc(db, "Student", userID), {
          aboutMe: data.aboutMe,
          photoURL: data.photoURL,
          videoURL: data.videoURL
        }, { merge: true });
        console.log("Updated Database");
        navigate("/home");//
      } catch {
        setError("Failed to update");
        console.log(userID); 
      }
      setLoading(false);
  }

  async function submitLogicAI(e: any)
  {
    e.preventDefault()
    console.log(currentStepIndexAI)
    console.log(data.aboutMe)
    console.log(data.photoURL)
    console.log(data.videoURL)

    if(currentStepIndexAI <= 2)
    {
      if(currentStepIndexAI === 2)
      {
        console.log("Hello")
        console.log(userID)
        
        //Import Photo Code
        console.log("Up Photo");
        const file = e.target[0]?.files[0]
        try {
          if (file) {
            console.log("Uploading Photo");
            let storageRef = ref(
              getStorage(),
              `Profilepics/${userID}/picture`
            );
    
            // Upload the image
            await uploadBytes(storageRef, file);
    
            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
    
            // Update the data state with the new image URL
            setData({ ...data, photoURL: downloadURL });
    
            // Update the Firestore document with the updated data
            await updateDoc(doc(db, "Student", userID!), {
              ...data,
              photoURL: downloadURL, //Just overwrites the one in the state when insert into DB
            });
    
            console.log("In If Main");
            
          } else {
            // If no new image is selected, update only the non-image fields
            await updateDoc(doc(db, "Student", userID!), data);
            console.log("In Else");
          }
    
          setIsUploading(false);
        } catch (error) {
          console.error("Error saving information:", error);
          setIsUploading(false);
        }
      }

      nextAI(); 
      nextTitle();
    }

    else if(currentStepIndexAI == 3){
      console.log("why")
      goToTitle(0);
      goToAI(0);
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

            <form onSubmit={isLastStepAI ? handleSubmitAI : submitLogicAI} 
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
