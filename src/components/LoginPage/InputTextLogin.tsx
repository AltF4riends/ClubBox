interface Props {
  heading1: string;
  heading2: string;
}

const InputTextLogin = ({ heading1, heading2 }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 5 + "px",
        borderRadius: 20 + "px",
        margin: 0,
      }}
    >
      <form>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading1}</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@graduate.utm.my"
            style={{ height: "38px" }}
          ></input>
        </div>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading2}</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            style={{ height: "38px" }}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            color: "maroon",
            marginTop: 15 + "px",
            width: 270 + "px",
            backgroundColor: "white",
            borderColor: "maroon",
            borderWidth: 4 + "px",
            borderRadius: 50 + "px",
          }}
        >
          <b>Login</b>
        </button>
        <p
          style={{
            color: "maroon",
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "13px",
            margin: "10px",
          }}
        >
          <b>Forgot Password?</b>
        </p>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginTop: "40px",
            marginBottom: "5px",
          }}
        >
          <b>Do Not Have An Account?</b>
        </p>

        <p
          style={{
            color: "maroon",
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "13px",
            marginTop: "5px",
          }}
        >
          <b>Click Here To Register Yourself Now</b>
        </p>
      </form>
    </div>
  );
};

export default InputTextLogin;
