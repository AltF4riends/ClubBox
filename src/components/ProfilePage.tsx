import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Breadcrumb } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ProfilePage.css"; // Import the CSS file
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useImageContext } from "./ImageContext";

function ProfilePage() {
  const { imageUrl, image, setImageInfo } = useImageContext();
  const [userID, setUserID] = useState<string | null>(null);

  // State for profile information
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    forgetPasswordQuestion: "",
    imageUrl: "", // Add imageUrl property to the state
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for uploading status
  const [isUploading, setIsUploading] = useState(false);

  // Effect to handle user authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    const handleOnLoad = async () => {
      if (userID) {
        const docRef = doc(db, "Student", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileInfo({
            ...profileInfo,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.utmEmail,
            phoneNumber: data.phoneNumber,
            address: data.address,
          });
        } else {
          console.log("No such document!");
        }
      }
    };

    handleOnLoad();
  }, [userID]); // Dependency array to rerun the effect when userID changes

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  // Toggle editing mode
  const toggleEdit = async () => {
    if (isEditing) {
      // Save data to Firebase when exiting edit mode
      await updateDoc(doc(db, "Student", userID!), profileInfo);
    }
    setIsEditing(!isEditing);
  };

  // Event handler for image click
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  // Event handler for image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageInfo(URL.createObjectURL(file), file);
    }
  };

  // Event handler for saving information
  // Event handler for saving information
  const saveInfo = async () => {
    setIsEditing(!isEditing);

    try {
      if (image) {
        let storageRef = ref(
          getStorage(),
          `Profilepics/${userID}/${image.name}`
        );

        // Upload the image
        await uploadBytes(storageRef, image);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the profileInfo state with the new image URL
        setProfileInfo({ ...profileInfo, imageUrl: downloadURL });

        // Update the Firestore document with the updated profileInfo
        await updateDoc(doc(db, "Student", userID!), {
          ...profileInfo,
          imageUrl: downloadURL,
        });
      } else {
        // If no new image is selected, update only the non-image fields
        await updateDoc(doc(db, "Student", userID!), profileInfo);
      }

      setIsUploading(false);
    } catch (error) {
      console.error("Error saving information:", error);
      setIsUploading(false);
    }
  };

  // Ref for file input
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div>
        <NavBar />

        <div
          className="carousel-background"
          style={{
            backgroundColor: "rgba(240, 255, 255, 0.6)",
            borderRadius: "15px",
            paddingBottom: "15px",
            paddingTop: "20px",
            marginRight: "30px",
            marginLeft: "30px",
          }}
        >
          <div>
            <Breadcrumb>
              <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="container mt-5">
            <div className="image-upload-container">
              <div className="box-decoration">
                <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                  {image ? (
                    <img
                      className="rounded-circle"
                      height="150vh"
                      width="160vw"
                      src={URL.createObjectURL(image)}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="rounded-circle"
                      height="150vh"
                      width="160vw"
                      src={profileInfo.imageUrl || "public/profile.png"}
                      alt="Profile"
                    />
                  )}

                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="col-md-12" style={{ margin: "0 400px" }}>
                  <h2 className="text-left">Personal Info</h2>
                  <button
                    className="image-upload-button"
                    onClick={toggleEdit}
                    disabled={isUploading}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="firstName"
                          name="firstName"
                          value={profileInfo.firstName}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          style={{
                            backgroundColor: "rgba(240, 255, 255, 0.6)",
                            width: "61%",
                          }}
                        />
                      </div>

                      <hr
                        style={{
                          borderTop: "2px solid white",
                          width: "35%",
                          marginLeft: 0,
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      {" "}
                      {/* Add a new column for the last name */}
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="lastName"
                          name="lastName"
                          value={profileInfo.lastName}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          style={{
                            backgroundColor: "rgba(240, 255, 255, 0.6)",
                            width: "61%",
                          }}
                        />
                      </div>
                      <hr
                        style={{
                          borderTop: "2px solid white",
                          width: "35%",
                          marginLeft: 0,
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="email"
                          name="email"
                          value={profileInfo.email}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          style={{
                            backgroundColor: "rgba(240, 255, 255, 0.6)",
                            width: "61%",
                          }}
                        />
                      </div>

                      <hr
                        style={{
                          borderTop: "2px solid white",
                          width: "35%",
                          marginLeft: 0,
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profileInfo.phoneNumber}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          style={{
                            backgroundColor: "rgba(240, 255, 255, 0.7)",
                            width: "61%",
                          }}
                        />
                      </div>
                      <hr
                        style={{
                          borderTop: "2px solid white",
                          width: "35%",
                          marginLeft: 0,
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="address"
                          name="address"
                          value={profileInfo.address}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          style={{
                            backgroundColor: "rgba(240, 255, 255, 0.7)",
                            width: "61%",
                          }}
                        />
                      </div>
                      <hr
                        style={{
                          borderTop: "2px solid white",
                          width: "35%",
                          marginLeft: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
