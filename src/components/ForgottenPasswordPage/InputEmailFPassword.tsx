import { Link } from "react-router-dom";
import clubbox from "./ClubBox.jpg";

const InputEmailFPassword = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={clubbox}
        style={{
          height: 11.6 + "vh",
          width: 17.18 + "vw",
          marginBottom: 2 + "vh",
          objectFit: "cover",
          objectPosition: "50% 49%",
        }}
        alt="ClubBox Logo"
      ></img>
      <h5
        style={{
          textAlign: "center",
          width: 15 + "vw",
          marginBottom: 3.125 + "em",
          color: "black",
          fontSize: "1.7em",
        }}
      >
        <b>ClubBox System</b>
      </h5>

      <p
        style={{
          textAlign: "justify",
          fontSize: "0.875em",
          width: 30 + "vw",
          marginTop: "4vh",
          marginBottom: "0.829vh",
        }}
      >
        <b>
          Enter your email address in the specified input box below and we will
          send a verification email to authenticate your account
        </b>
      </p>

      <form action="/home">
        <label
          htmlFor="exampleInputEmail1"
          style={{
            color: "maroon",
            marginTop: " 10px",
          }}
        >
          <b>Email</b>
        </label>
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@graduate.utm.my"
            style={{ height: "6.30vh", width: "20vw", marginTop: " 10px" }}
          ></input>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              color: "maroon",
              marginTop: 15 + "px",
              width: 11.09 + "vw",
              backgroundColor: "white",
              borderColor: "maroon",
              borderWidth: 0.31 + "vw",
              borderRadius: 50 + "px",
            }}
          >
            <b>Submit</b>
          </button>
        </div>
      </form>

      <p
        style={{
          color: "maroon",
          textAlign: "center",
          textDecoration: "underline",
          fontSize: "13px",
          margin: "20px",
          width: "30vw",
        }}
      >
        <Link to={"/password_questions"} style={{ color: "maroon" }}>
          <b>Not Receiving The Email? Click Here For Another Alternative</b>
        </Link>
      </p>
    </div>
  );
};

export default InputEmailFPassword;
