import { useContext } from "react";
import { FormPageContext } from "../../contexts/FormPageContext";

const AboutMe = ({ formData, setFormData }: any) => {
  const { regPage, setRegPage }: any = useContext(FormPageContext);
  return (
    <div>
      <h6
        style={{
          textAlign: "center",
        }}
      >
        Write a Maximum of 300 Words About Yourself For Others To See (This Will
        Help For Club Admissions)
      </h6>
      <br />
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={10}
          placeholder="Start Typing..."
        ></textarea>
      </div>
    </div>
  );
};

export default AboutMe;
