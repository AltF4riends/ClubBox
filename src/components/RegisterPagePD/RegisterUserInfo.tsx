import { ReactElement, useState } from "react";
import "../HomePage/Slider.css";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../ProfilePage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../RegisterPagePD/AuthContextAlpha";

type RFData = {
  fName: String,
  lName: String,
  matricNo: String,
  yearCourse: String,
  phoneNum: String,
  curAddress: String,
  email: String,
  password: String,
  cpassword: String,
  //aboutMe: "",
  //photo: null,
  //videe: null
}

type RFProps = RFData & {
  updateFields:(fields: Partial<RFData>) => void
}

const RegisterForm = 
({fName, 
  lName, 
  matricNo, 
  yearCourse, 
  phoneNum, 
  curAddress, 
  email, 
  password, 
  cpassword,
  updateFields,
}:RFProps) => {

  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let heading1 = "Register New User";

  return (
    <div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  aria-label="First Name"
                  onChange={(e) => updateFields({fName: e.target.value})}
                />
                <br />
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  aria-label="Last Name"
                  onChange={(e) => updateFields({lName: e.target.value})}
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
                  onChange={(e) => updateFields({matricNo: e.target.value})}
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
                  onChange={(e) => updateFields({yearCourse: e.target.value})}
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
                  onChange={(e) => updateFields({phoneNum: e.target.value})}
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
                  onChange={(e) => updateFields({curAddress: e.target.value})}
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
                  onChange={(e) => updateFields({email: e.target.value})}
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
                  onChange={(e) => updateFields({password: e.target.value})}
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
                  onChange={(e) => updateFields({cpassword: e.target.value})}
                />
                <br />
              </div>
            </div>
    </div>
  );
};

export default RegisterForm;
