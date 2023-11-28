import { Link } from "react-router-dom";
import BackgroundFPassword from "../ForgottenPasswordPage/BackgroundFPassword";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";

function EditQuestion() {
  let heading1 = "Forgot Password QNA";
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

          <h6>
            Provide Answers For These Simple Questions For Additional Options
            When The Password Is Inaccessible{" "}
          </h6>
          <br />
          <label htmlFor="FfvNum" className="form-label">
            What Is Your Favourite Number?
          </label>
          <input
            type="text"
            className="form-control"
            id="FfvNum"
            placeholder=""
            aria-label="Favourite Number"
          />
          <br />
          <label htmlFor="occUncle" className="form-label">
            What is the Occupation of your Uncle?
          </label>
          <input
            type="text"
            className="form-control"
            id="occUncle"
            placeholder=""
            aria-label="Occupation of Uncle"
          />
          <br />
          <label htmlFor="bstF" className="form-label">
            What is the name of your best Friend?
          </label>
          <input
            type="text"
            className="form-control"
            id="bstF"
            placeholder=""
            aria-label="Best Friend"
          />

          <div
            style={{
              display: "flex",
              width: 665 + "px",
              height: 275 + "px",
              alignItems: "flex-end",
              justifyContent: "right",
            }}
          >
            <Link to={"/home"}>
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
}

export default EditQuestion;
