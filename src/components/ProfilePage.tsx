import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Breadcrumb, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Profile/Table.css";
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
            paddingTop: "30px",
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
          <div className="container mt-5" style={{ margin: "0 150px" }}>
            <h2 className="text-left">Personal Info</h2>
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
              <div
                className="position-absolute top-50 start-70 translate-middle"
                style={{
                  flex: "0 0 80%",
                  margin: "0 1200px",

                  padding: "60px",
                }}
              >
                <Table
                  bordered
                  className="table-transparent"
                  style={{
                    width: "300px",
                  }}
                >
                  <tbody>
                    <tr className="table-transparent">
                      <td
                        style={{ padding: "30px 25px", verticalAlign: "top" }}
                        className="table-light"
                      >
                        <FontAwesomeIcon
                          icon={faLock}
                          style={{ fontSize: "40px" }}
                        />
                        <br />
                        <br />
                        <strong>Is my info safe?</strong>
                        <br />
                        <br />
                        Definitely, since we are hiding some account details to
                        protect your identity.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon
                          icon={faLock}
                          style={{ fontSize: "40px" }}
                        />
                        <br />
                        <br />
                        <strong>Which details can be edited?</strong>
                        <br />
                        <br />
                        Contact info and some other personal details to make
                        sure other sensitive information be hidden.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ fontSize: "40px" }}
                        />
                        <br />
                        <br />
                        <strong>
                          Which information is shared with others?
                        </strong>
                        <br />
                        <br />
                        Clubs that are signed under University Teknologi
                        Malaysia.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
