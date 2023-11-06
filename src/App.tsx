import InputTextLogin from "./components/LoginPage/InputTextLogin";

function App() {
  let heading1 = "Email Address";
  let heading2 = "Password";
  return (
    <div>
      <div
        className="container-sm"
        style={{ width: 250 + "px", height: 200 + "px" }}
      >
        <InputTextLogin
          heading1={heading1}
          heading2={heading2}
        ></InputTextLogin>
      </div>
    </div>
  );
}

export default App;
