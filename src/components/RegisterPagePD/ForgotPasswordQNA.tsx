import { Link } from "react-router-dom";
import BackgroundFPassword from "../ForgottenPasswordPage/BackgroundFPassword";
import BackgroundLogin from "./BackgroundLogin";
import LeftBoxRegP1 from "./LeftBoxRegP1";
import RightBoxRegP1 from "./RightBoxRegP1";

type FPQData = {
  ans1: String,
  ans2: String,
  ans3: String,
}

type FPQProps = FPQData & {
  updateFields:(fields: Partial<FPQData>) => void
}

function ForgotPasswordQNA({ans1, ans2, ans3, updateFields}:FPQProps) {
  return (
    <div>
          <h6>
            Provide Answers For These Simple Questions For Additional Options When
            The Password Is Inaccessible{" "}
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
            onChange={(e) => updateFields({ans1: e.target.value})}
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
            onChange={(e) => updateFields({ans2: e.target.value})}
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
            onChange={(e) => updateFields({ans3: e.target.value})}
          />
    </div>
  );
}

export default ForgotPasswordQNA;
