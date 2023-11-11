import BackgroundLogin from "./LoginPage/BackgroundLogin";
import InputTextLogin from "./LoginPage/InputTextLogin";
import LeftBoxLogin from "./LoginPage/LeftBoxLogin";
import RightBoxLogin from "./LoginPage/RightBoxLogin";
import utm from "../Images/UTM-LOGO.png";
import clubbox from "../Images/4bd4b1b0-975c-4d88-9755-b6e3f16be011.jpg";
import clubgroup from "../Images/pngtree-group-people-back-view-png-image_5092405.png";

import { Link } from "react-router-dom";

const LoginPage = () => {
  let heading1 = "Email Address";
  let heading2 = "Password";
  return (
    <BackgroundLogin>
      <LeftBoxLogin>
        <img
          src={clubbox}
          style={{
            height: 11.6 + "vh",
            width: 17.18 + "vw",
            marginBottom: 3.316 + "vh",
            objectFit: "cover",
            objectPosition: "30% 49%",
          }}
          alt="ClubBox Logo"
        ></img>
        <h5
          style={{
            textAlign: "center",
            width: 19.53 + "vw",
            marginBottom: 3.125 + "rem",
            color: "white",
            fontSize: "1.125rem",
          }}
        >
          <b>ClubBox System</b>
        </h5>

        <h5
          style={{
            textAlign: "center",
            width: 19.53 + "vw",
            marginBottom: 0.625 + "rem",
            color: "white",
            fontSize: "1.563rem",
          }}
        >
          <b>"Unboxing The Clubs In UTM"</b>
        </h5>

        <img
          src={clubgroup}
          style={{
            marginTop: "15.72vh",
            height: 24.87 + "vh",
            width: 23.43 + "vw",
          }}
        ></img>
      </LeftBoxLogin>
      <RightBoxLogin>
        <img
          src={utm}
          style={{
            height: 16.58 + "vh",
            width: 7.81 + "vw",
            marginBottom: 2 + "vh",
          }}
          alt="UTM Logo"
        ></img>
        <h5
          style={{
            textAlign: "center",
            width: 19.53 + "vw",
            marginBottom: 3.31 + "vh",
            fontSize: "1.125rem",
          }}
        >
          <b>University Technology of Malaysia</b>
        </h5>
        <InputTextLogin
          heading1={heading1}
          heading2={heading2}
        ></InputTextLogin>
      </RightBoxLogin>
    </BackgroundLogin>
  );
};

export default LoginPage;
