import { useState } from "react";
import "./HomePage/Slider.css";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ProfilePage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./RegisterPagePD/AuthContextAlpha";
import LeftBoxRegP1 from "./RegisterPagePD/LeftBoxRegP1";
import BackgroundLogin from "./RegisterPagePD/BackgroundLogin";
import RightBoxRegP1 from "./RegisterPagePD/RightBoxRegP1";

const RegisterForm = () => {
  //const emailRef = useRef<HTMLInputElement>(null);
  //const passwordRef = useRef<HTMLInputElement>(null);
  //const cpasswordRef = useRef<HTMLInputElement>(null);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [matricNo, setmatricNo] = useState("");
  const [yearCourse, setyearCourse] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [curAddress, setCurAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Clicked");

    if (email != null && password != null && cpassword != null) {
      console.log("Checked");
      if (password != cpassword) {
        return setError("Passwords do not match!");
      }
      try {
        setError("");
        setLoading(true);
        await createUser(email, password);
        const docRef = await setDoc(doc(db, "Student", userID), {
          firstName: fName,
          lastName: lName,
          matricNo: matricNo,
          yearCourse: yearCourse,
          phoneNumber: phoneNum,
          address: curAddress,
          utmEmail: email,
          password: password,
        });
        console.log("Signedup");
        navigate("/forget_password_qna");
      } catch {
        setError("Failed to create an account");
        console.log(userID); 
      }
      setLoading(false);
    }
  }

  let heading1 = "Register New User";

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
            {heading1}
          </h1>
        </div>

        <div
          className="form-body"
          style={{
            width: 575 + "px",
            height: 425 + "px",
          }}
        >
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  aria-label="First Name"
                  onChange={(e) => setFName(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  aria-label="Last Name"
                  onChange={(e) => setLName(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="mtrNum" className="form-label">
                  Matric No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mtrNum"
                  placeholder="eg. A20EC0000"
                  aria-label="Matric Number"
                  onChange={(e) => setmatricNo(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="yrcse" className="form-label">
                  Year/Course
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="yrcse"
                  placeholder="eg. 3/SECJH"
                  aria-label="YearCourse"
                  onChange={(e) => setyearCourse(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="phNum" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phNum"
                  placeholder="eg. 0123456789"
                  aria-label="Phone Number"
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="curAddress" className="form-label">
                  Current Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="curAddress"
                  placeholder=""
                  aria-label="Current Address"
                  onChange={(e) => setCurAddress(e.target.value)}
                />
                <br />
              </div>

              <div className="col-12">
                <label htmlFor="utmEmail" className="form-label">
                  UTM Graduate Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="utmEmail"
                  placeholder="example@graduate.utm.my"
                  aria-label="UTM Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="pwd" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pwd"
                  placeholder=""
                  aria-label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="conPwd" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="conPwd"
                  placeholder=""
                  aria-label="Confirm Password"
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <br />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </RightBoxRegP1>
    </BackgroundLogin>
  );
};

export default RegisterForm;
