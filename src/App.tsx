import BackgroundLogin from "./components/LoginPage/BackgroundLogin";
import InputTextLogin from "./components/LoginPage/InputTextLogin";
import LeftBoxLogin from "./components/LoginPage/LeftBoxLogin";
import RightBoxLogin from "./components/LoginPage/RightBoxLogin";
import utm from "./Images/UTM-LOGO.png";
import clubbox from "./Images/4bd4b1b0-975c-4d88-9755-b6e3f16be011.jpg";
import clubgroup from "./Images/pngtree-group-people-back-view-png-image_5092405.png";
function App() {
  let heading1 = "Email Address";
  let heading2 = "Password";
  return (
    <BackgroundLogin>
      <LeftBoxLogin>
        <img
          src={clubbox}
          style={{
            height: 70 + "px",
            width: 220 + "px",
            marginBottom: 20 + "px",
            objectFit: "cover",
            objectPosition: "30% 49%",
          }}
          alt="ClubBox Logo"
        ></img>
        <h5
          style={{
            textAlign: "center",
            width: 250 + "px",
            marginBottom: 50 + "px",
            color: "white",
          }}
        >
          <b>ClubBox System</b>
        </h5>

        <h5
          style={{
            textAlign: "center",
            width: 250 + "px",
            marginBottom: 10 + "px",
            color: "white",
            fontSize: "25px",
          }}
        >
          <b>"Unboxing The Clubs In UTM"</b>
        </h5>

        <img
          src={clubgroup}
          style={{ marginTop: "125px", height: 150 + "px", width: 300 + "px" }}
        ></img>
      </LeftBoxLogin>
      <RightBoxLogin>
        <img
          src={utm}
          style={{
            height: 100 + "px",
            width: 100 + "px",
            marginBottom: 15 + "px",
          }}
          alt="UTM Logo"
        ></img>
        <h5
          style={{
            textAlign: "center",
            width: 250 + "px",
            marginBottom: 20 + "px",
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
}

export default App;
