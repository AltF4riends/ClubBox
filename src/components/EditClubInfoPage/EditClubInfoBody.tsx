import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

function EditInfoBody() {
  const smallInfoBlockFormat = {
    display: "flex",
    height: "21vh",
    width: "25vw",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid light-grey",
  };

  const editBlockFormat = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "11vh",
    width: "52vw",
    borderBottom: "1px solid light-grey",
  };

  const smallTitleBox = {
    height: "4vh",
    width: "38vw",
  };

  const smallEditBox = {
    height: "4vh",
    width: "10vw",
  };

  const smallDefaultBox = {
    height: "6vh",
    width: "48vw",
  };

  const buttonFormatEdit = {
    border: "none",
    backgroundColor: "rgba(255,255,255,0.0)",
  };

  const [isInputEnabled, setIsInputEnabled] = useState(true);

  const toggleInputEnabled = () => {
    setIsInputEnabled((prevEnabled) => !prevEnabled);
  };

  // const [isInputEnabled1, setIsInputEnabled1] = useState(true);

  // const toggleInputEnabled1 = () => {
  //   setIsInputEnabled1((prevEnabled1) => !prevEnabled1);
  // };

  // const [isInputEnabled2, setIsInputEnabled2] = useState(true);

  // const toggleInputEnabled2 = () => {
  //   setIsInputEnabled2((prevEnabled2) => !prevEnabled2);
  // };

  // const [isInputEnabled3, setIsInputEnabled3] = useState(true);

  // const toggleInputEnabled3 = () => {
  //   setIsInputEnabled3((prevEnabled3) => !prevEnabled3);
  // };

  // const [isInputEnabled4, setIsInputEnabled4] = useState(true);

  // const toggleInputEnabled4 = () => {
  //   setIsInputEnabled4((prevEnabled4) => !prevEnabled4);
  // };

  // const [isInputEnabled5, setIsInputEnabled5] = useState(true);

  // const toggleInputEnabled5 = () => {
  //   setIsInputEnabled5((prevEnabled5) => !prevEnabled5);
  // };

  // State for Club Info information and database
  const [clubInfo, setClubInfo] = useState({
    clubName: "",
    clubStatus: "",
    clubLinkedIn: "",
    clubTelegram: "",
    clubFacebook: "",
    clubAppReq: "",
    clubDesc: "",
    clubType: "",
    clubLogo: ""
  });

  useEffect(() => {
  async function handleOnLoad() {

    const docRef = doc(db, "Club", "cl001");
    const docSnap = await getDoc(docRef);
    console.log("Change Handling");

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      console.log(data.clubName);
      setClubInfo({
        clubName: data.clubName,
        clubStatus: data.clubStatus,
        clubLinkedIn: data.clubLinkedIn,
        clubTelegram: data.clubTelegram,
        clubFacebook: data.clubFacebook,
        clubAppReq: data.clubAppReq,
        clubDesc: data.clubDesc,
        clubType: data.clubType,
        clubLogo: data.clubLogo,
      });
      setIsInputEnabled(true);
    } else {
      // docSnap.data() will be undefined in this case
      console.log(clubInfo.clubName);
      console.log("No such document!");
      setIsInputEnabled(true);
    }
  };

  handleOnLoad();
}, [userID]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
  };

  async function handleDBUpdate(e: any)
  {

    //await updateDoc(docRef, clubInfo);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "89vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <div
            style={{
              display: "flex",
              height: "85vh",
              width: "90vw",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "45px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "78vh",
                width: "57vw",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "8vh",
                  width: "52vw",
                }}
              >
                <h5>Edit</h5>
                <h1>Club Info</h1>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>Club Name</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    name="clubName"
                    readOnly={isInputEnabled}
                    value={clubInfo.clubName}
                    onChange={handleChange}
                    disabled={isInputEnabled}//
                  />
                </div>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>LinkedIn Link</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}//1
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//1
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="LinkedIn Account Link"
                    value={clubInfo.clubLinkedIn}
                    onChange={handleChange}
                    disabled={isInputEnabled}//1
                  />
                </div>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>Telegram Link</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}//2
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//2
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Telegram Link"
                    value={clubInfo.clubTelegram}
                    onChange={handleChange}
                    disabled={isInputEnabled}//2
                  />
                </div>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>Facebook Link</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//3
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Facebook Link"
                    value={clubInfo.clubLinkedIn}
                    onChange={handleChange}
                    disabled={isInputEnabled}//3
                  />
                </div>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>Application Requirements</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}//4
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//4
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Not Provided"
                    value={clubInfo.clubAppReq}
                    onChange={handleChange}
                    disabled={isInputEnabled}//4
                  />
                </div>
              </div>

              <div style={editBlockFormat}>
                <div style={smallTitleBox}>
                  <h2>Club Description</h2>
                </div>

                <div style={smallEditBox}>
                  <button
                    type="button"
                    onClick={toggleInputEnabled}//5
                    style={buttonFormatEdit}
                  >
                    <h6
                      style={{
                        fontStyle: "bold",
                        textDecoration: "underline",
                        fontSize: "24px",
                      }}
                    >
                      {isInputEnabled ? "" : "Save "}//5
                      Edit
                    </h6>
                  </button>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Not Provided"
                    value={clubInfo.clubDesc}
                    onChange={handleChange}
                    disabled={isInputEnabled}//5
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "75vh",
                width: "28vw",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={smallInfoBlockFormat}>
                <div>
                  <h1>Can I update the info ?</h1>
                  <h4>Definitely, Info can be updated whenever you want !</h4>
                </div>
              </div>

              <div style={smallInfoBlockFormat}>
                <div>
                  <h1>What do mean by requirements ?</h1>
                  <h4>
                    Special requirements that are not as common as name and
                    matric number. for example, CV.
                  </h4>
                </div>
              </div>

              <div style={smallInfoBlockFormat}>
                <div>
                  <h1>Why do we add description ?</h1>
                  <h4>
                    So Students can get an idea about what is this club all
                    about
                  </h4>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  height: "12vh",
                  width: "28vw",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <Link to={"/manage_club"}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{
                        width: "300px",
                      }}
                    >
                      Save Information
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditInfoBody;
