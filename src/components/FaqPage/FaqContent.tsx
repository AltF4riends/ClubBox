import { Dropdown } from "react-bootstrap";
import thinking from "./illustration _Party_.png";

const FaqContent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: "rgba(208,61,86)",
          height: "60vh",
          width: "98.75vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            color: "white",
            height: "30vh",
            width: "30vw",
            marginRight: "60px",
          }}
        >
          <b style={{ fontSize: "40px" }}>FAQs</b>
          <p style={{ textAlign: "justify" }}>
            Below you will find all the answers to common questions asked about
            the ClubBox System. If you still cannot find the answers you are
            looking for, feel free to Contact Us
          </p>
        </div>
        <div>
          <img src={thinking} height={"400vh"} width={"500vw"}></img>
        </div>
      </div>
      <div
        style={{
          background: "rgba(255,255,255)",
          height: "83vh",
          width: "98.75vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-autoclose-true"
            style={{ fontSize: "25px", position: "relative" }}
          >
            1. Is it possible for me to register myself without having a
            @graduate.utm.my email?
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ fontSize: "20px", position: "relative" }}>
            <Dropdown.Item>Action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-autoclose-true"
            style={{ fontSize: "25px", position: "relative" }}
          >
            1. Is it possible for me to register myself without having a
            @graduate.utm.my email?
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              fontSize: "20px",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            <Dropdown.Item>Action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FaqContent;
