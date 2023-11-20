import { ReactNode, useRef } from "react";
import BackgroundLogin from "./components/RegisterPagePD/BackgroundLogin";
import LeftBoxRegP1 from "./components/RegisterPagePD/LeftBoxRegP1";
import RightBoxRegP1 from "./components/RegisterPagePD/RightBoxRegP1";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/RegisterPagePD/AuthContext";

interface Props {
  children: ReactNode;
}

const RegisterForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const cpasswordRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  function handleSubmit(e: any) {
    e.preventDefault();
    if (emailRef.current != null && passwordRef.current != null) {
      signup(emailRef.current.value, passwordRef.current.value);
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
    <AuthProvider>
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
            <form className="row g-3">
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
                    ref={emailRef}
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
                    ref={passwordRef}
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
                    ref={cpasswordRef}
                  />
                  <br />
                </div>
              </div>
            </form>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "25px",
              width: 520 + "px",
              height: 100 + "px",
              alignItems: "flex-end",
              justifyContent: "right",
            }}
          >
            <Link to={"/forget_password_qna"}>
              <button
                type="button"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Proceed
              </button>
            </Link>
          </div>
        </RightBoxRegP1>
      </BackgroundLogin>
    </AuthProvider>
  );
};

export default RegisterForm;
