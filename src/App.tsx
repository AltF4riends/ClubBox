import BackgroundLogin from "./components/LoginPage/BackgroundLogin";
import InputTextLogin from "./components/LoginPage/InputTextLogin";
import utm from "./Images/UTM-LOGO.png";

function App() {
  let heading1 = "Email Address";
  let heading2 = "Password";
  return (
    <BackgroundLogin>
      <div
        className="container-sm"
        style={{
          width: 250 + "px",
          height: 200 + "px",
          position: "relative",

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={utm} style={{ height: 100 + "px", width: 100 + "px" }}></img>
        <h5 style={{ textAlign: "center", width: 250 + "px" }}>
          University Technology of Malaysia
        </h5>
        <InputTextLogin
          heading1={heading1}
          heading2={heading2}
        ></InputTextLogin>
      </div>
    </BackgroundLogin>
  );
}

export default App;
