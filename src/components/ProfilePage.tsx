import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Breadcrumb, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    legalName: "",
    email: "",
    phoneNumber: "",
    governmentId: "",
    address: "",
    emergencyContact: "",
    forgetPassowrdQuestion: "",
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
      <div>
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
              <div className="form-group" style={{ textAlign: "left" }}>
                <label htmlFor="governmentId">Government ID</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="governmentId"
                  name="governmentId"
                  value={profileInfo.governmentId}
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
              <div className="form-group" style={{ textAlign: "left" }}>
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={profileInfo.emergencyContact}
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
