import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Breadcrumb, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProfilePage() {
  async function handleOnLoad(e: any) {
    e.preventDefault();
    const docRef = doc(db, "Student", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().firstName);
      setProfileInfo({
        ...profileInfo,
        legalName: docSnap.data().firstName,
        email: docSnap.data().utmEmail,
        phoneNumber: docSnap.data().phoneNumber,
        address: docSnap.data().address,
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      console.log(userID);
    }
  }
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    legalName: "",
    email: "",
    phoneNumber: "",
    address: "",
    forgetPasswordQuestion: "", // Corrected property name
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveInfo = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div onLoad={handleOnLoad}>
        <NavBar />

        <div
          className="carousel-background"
          style={{
            backgroundColor: "rgba(240, 255, 255, 0.6)", // Azure with alpha for transparency
            borderRadius: "15px",
            paddingBottom: "15px",
            paddingTop: "20px",
            marginRight: "30px",
            marginLeft: "30px",
          }}
        >
          <div>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="container mt-5" style={{ margin: "0 0px" }}>
            <div className="col-md-12">
              <h2 className="text-left">Personal Info</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="legalName">Legal Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="legalName"
                    name="legalName"
                    value={profileInfo.legalName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={{
                      backgroundColor: "rgba(240, 255, 255, 0.6)",
                      width: "61%",
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ margin: "0 400px" }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "60%",
                  marginLeft: 0,
                }}
              />
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
                    width: "30%",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ margin: "0 400px" }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "35%",
                  marginLeft: 0,
                }}
              />
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
                    width: "30%",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ margin: "0 400px" }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "35%",
                  marginLeft: 0,
                }}
              />
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "35%",
                  marginLeft: 0,
                }}
              />
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
                    width: "30%",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ margin: "0 400px" }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "35%",
                  marginLeft: 0,
                }}
              />
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "35%",
                  marginLeft: 0,
                }}
              />
              <div className="form-group" style={{ textAlign: "left" }}>
                <label htmlFor="forgetPasswordQuestion">
                  Forget Password Question
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="ForgetPasswordQuestion"
                  name="forgetPasswordQuestion"
                  value={profileInfo.forgetPasswordQuestion}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{
                    backgroundColor: "rgba(240, 255, 255, 0.7)",
                    width: "30%",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ margin: "0 400px" }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
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

      <Footer />
    </>
  );
}

export default ProfilePage;
