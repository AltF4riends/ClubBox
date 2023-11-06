interface Props {
  heading1: string;
  heading2: string;
}

const InputTextLogin = ({ heading1, heading2 }: Props) => {
  return (
    <div>
      <form>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading1}</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@graduate.utm.my"
          ></input>
        </div>
        <div className="form-group" style={{ marginTop: 10 + "px" }}>
          <label htmlFor="exampleInputEmail1">{heading2}</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 20 + "px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default InputTextLogin;
