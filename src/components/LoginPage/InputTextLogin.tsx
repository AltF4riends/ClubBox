import { Link, useHref } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useRef } from "react";

interface Props {
  heading1: string;
  heading2: string;
}

const InputTextLogin = ({ heading1, heading2 }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(emailRef.current?.value);
    window.location.href = "/home";
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 5 + "px",
        borderRadius: 1.25 + "rem",
        margin: 0,
        height: "40.11vw",
        width: " 46.87vh",
      }}
    >
      <form onSubmit={handleLogIn}>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading1}</label>
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@graduate.utm.my"
            style={{ height: "6.30vh" }}
          ></input>
        </div>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading2}</label>
          <input
            type="password"
            ref={passwordRef}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            style={{ height: "6.30vh" }}
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

        <p
          style={{
            textAlign: "center",
            fontSize: "0.875em",
            marginTop: "6.633vh",
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
          <Link to={"/register"} style={{ color: "maroon" }}>
            <b>Click Here To Register Yourself Now</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InputTextLogin;
