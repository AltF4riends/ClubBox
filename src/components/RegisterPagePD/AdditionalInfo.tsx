import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import { Link } from "react-router-dom";

function AdditionalInfo() {
  let heading1 = "Fill In Your Additional Details Now";
  const buttonFormat = {
    border: "2px solid maroon",
    color: "maroon",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "50px",
    width: "300px",
  };

  return (
    <BackgroundLogin>
      <LeftBoxRegP1 children={undefined}></LeftBoxRegP1>
      <RightBoxRegP1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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

          <h6
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            You May Perform This Later In the Settings {"->"} Profile{" "}
          </h6>

          <Link to={"/about_me"}>
            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
                justifyContent: "space-around",
              }}
            >
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
              >
                About Me
              </button>
            </div>
          </Link>

          <Link to={"/upload_photo"}>
            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
              }}
            >
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
              >
                Upload Profile Picture
              </button>
            </div>
          </Link>

          <Link to={"/upload_video"}>
            <div
              style={{
                marginTop: 25 + "px",
                width: "300px",
                height: "100px",
              }}
            >
              <button
                type="button"
                className="btn btn-light"
                style={buttonFormat}
              >
                Upload Video of Introduction
              </button>
            </div>
          </Link>

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
            <Link to={"/"}>
              <button
                type="button"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Submit
              </button>
            </Link>
          </div>
        </div>
      </RightBoxRegP1>
    </BackgroundLogin>
  );
}

export default AdditionalInfo;
