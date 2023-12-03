import React from "react";

interface Props {
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  heading5: string;
}

const InputTextEditPersonalDetails = ({
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
}: Props) => {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        margin: "0 auto",
        width: "400px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Edit Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">{heading3}</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">{heading4}</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="25"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{heading1}</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@graduate.utm.my"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">{heading5}</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="(+60)123-456-789"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{heading2}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            backgroundColor: "maroon",
            borderColor: "maroon",
          }}
        >
          <b>Save Changes</b>
        </button>
      </form>
    </div>
  );
};

export default InputTextEditPersonalDetails;
