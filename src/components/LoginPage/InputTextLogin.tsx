import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../RegisterPagePD/AuthContextAlpha";
import { useState } from "react";
import { Alert } from "react-bootstrap";

import google from "../../../public/google.png";

interface Props {
  heading1: string;
  heading2: string;
}

const InputTextLogin = ({ heading1, heading2 }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { signInGoogle } = UserAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  const handleGoogle = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await signInGoogle();
      navigate("/home");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };
  return (
    <div
      style={{
        padding: 5 + "px",
        borderRadius: 1.25 + "rem",
        margin: 0,
        height: "40.11vw",
        width: " 46.87vh",
      }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading1}</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@graduate.utm.my"
            style={{ height: "6.30vh" }}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading2}</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            style={{ height: "6.30vh" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            color: "maroon",
            marginTop: 15 + "px",
            width: 21.09 + "vw",
            backgroundColor: "white",
            borderColor: "maroon",
            borderWidth: 0.31 + "vw",
            borderRadius: 50 + "px",
          }}
        >
          <b>Login</b>
        </button>
        <p
          style={{
            color: "maroon",
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "13px",
            margin: "10px",
          }}
        >
          <Link to={"/forgotpassword"} style={{ color: "maroon" }}>
            <b>Forgot Password?</b>
          </Link>
        </p>

        <button
          onClick={handleGoogle}
          style={{
            height: 6.0 + "vh",
            width: 2.81 + "vw",
            border: "2px solid black",
            borderRadius: "100%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "9.25vw",
          }}
        >
          <img
            src={google}
            style={{
              height: 4.5 + "vh",
              width: 2.41 + "vw",
              border: "2px solid white",
              borderRadius: "100%",
            }}
            alt="UTM Logo"
          ></img>
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.875em",
            marginTop: "3vh",
            marginBottom: "0.829vh",
          }}
        >
          <b>Do Not Have An Account?</b>
        </p>

        <p
          style={{
            color: "maroon",
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "0.875em",
            marginTop: "0.829vh",
          }}
        >
          <Link to={"/register_page"} style={{ color: "maroon" }}>
            <b>Click Here To Register Yourself Now</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InputTextLogin;
