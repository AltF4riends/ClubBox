import clubbox from "./ClubBox.jpg";

const InputAnswer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={clubbox}
        style={{
          height: 11.6 + "vh",
          width: 17.18 + "vw",
          marginBottom: 2 + "vh",
          objectFit: "cover",
          objectPosition: "50% 49%",
        }}
        alt="ClubBox Logo"
      ></img>
      <h5
        style={{
          textAlign: "center",
          width: 15 + "vw",
          marginBottom: 3.125 + "em",
          color: "black",
          fontSize: "1.7em",
        }}
      >
        <b>ClubBox System</b>
      </h5>

      <p
        style={{
          textAlign: "justify",
          fontSize: "0.875em",
          width: 29 + "vw",
          marginTop: "4vh",
          marginBottom: "0.829vh",
        }}
      >
        <b>
          Please Answer The Following Questions Correctly To Verify If It Is You
        </b>
      </p>
      <form action="/home">
        <label
          htmlFor="exampleInputEmail1"
          style={{
            color: "maroon",
            marginTop: " 10px",
          }}
        >
          <b>What Is Your Favourite Number? *</b>
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="eg. 1"
          style={{ height: "6.30vh", width: "20vw", marginTop: " 10px" }}
        ></input>

        <label
          htmlFor="exampleInputEmail1"
          style={{
            color: "maroon",
            marginTop: " 10px",
          }}
        >
          <b>What is the Occupation of your Uncle? * </b>
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="eg. Teacher"
          style={{ height: "6.30vh", width: "20vw", marginTop: " 10px" }}
        ></input>

        <label
          htmlFor="exampleInputEmail1"
          style={{
            color: "maroon",
            marginTop: " 10px",
          }}
        >
          <b>What is the name of your best Friend? *</b>
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="eg. Eric"
          style={{
            height: "6.30vh",
            width: "20vw",
            marginTop: " 10px",
            marginBottom: "20px",
          }}
        ></input>
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              color: "maroon",
              marginTop: 15 + "px",
              width: 11.09 + "vw",
              backgroundColor: "white",
              borderColor: "maroon",
              borderWidth: 0.31 + "vw",
              borderRadius: 50 + "px",
            }}
          >
            <b>Submit</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputAnswer;
