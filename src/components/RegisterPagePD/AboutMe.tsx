import { ReactNode } from "react";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";
import { Link } from "react-router-dom";

const AboutMe = () => {
  let heading1 = "About Me";

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
    <div>
      <BackgroundLogin>
        <LeftBoxRegP1 children={undefined}></LeftBoxRegP1>
        <RightBoxRegP1>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            {heading1}
          </h1>
          <h6
            style={{
              textAlign: "center",
            }}
          >
            Write a Maximum of 300 Words About Yourself For Others To See (This
            Will Help For Club Admissions)
          </h6>
          <br />
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={10}
              cols={100}
              placeholder="Start Typing..."
            ></textarea>
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
            <Link to={"/additional_info"}>
              <button
                type="button"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Save
              </button>
            </Link>
          </div>
        </RightBoxRegP1>
      </BackgroundLogin>
    </div>
  );
};

export default AboutMe;
