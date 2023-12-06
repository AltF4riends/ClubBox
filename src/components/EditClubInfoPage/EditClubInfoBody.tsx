import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase';

function EditInfoBody() {

  const smallInfoBlockFormat =
  {
    display:"flex",
    height: "21vh",
    width: "25vw",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid light-grey",
  }

  const editBlockFormat = 
  {
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    height: "11vh",
    width: "52vw",
    borderBottom: "1px solid light-grey",
  }

  const smallTitleBox = 
  {
    height: "4vh",
    width: "38vw",
  }

  const smallEditBox = 
  {
    height: "4vh",
    width: "10vw",
  }

  const smallDefaultBox =
  {
    height: "6vh",
    width: "48vw",
  }

  const buttonFormatEdit = 
  {
    border:"none",
    backgroundColor: "rgba(255,255,255,0.0)",
  }

  const [isInputEnabled, setIsInputEnabled] = useState(true);

  const toggleInputEnabled = () => {
    setIsInputEnabled((prevEnabled) => !prevEnabled);
  };

  const [isInputEnabled1, setIsInputEnabled1] = useState(true);

  const toggleInputEnabled1 = () => {
    setIsInputEnabled1((prevEnabled1) => !prevEnabled1);
  };

  const [isInputEnabled2, setIsInputEnabled2] = useState(true);

  const toggleInputEnabled2 = () => {
    setIsInputEnabled2((prevEnabled2) => !prevEnabled2);
  };

  const [isInputEnabled3, setIsInputEnabled3] = useState(true);

  const toggleInputEnabled3 = () => {
    setIsInputEnabled3((prevEnabled3) => !prevEnabled3);
  };

  const [isInputEnabled4, setIsInputEnabled4] = useState(true);

  const toggleInputEnabled4 = () => {
    setIsInputEnabled4((prevEnabled4) => !prevEnabled4);
  };

  const [isInputEnabled5, setIsInputEnabled5] = useState(true);

  const toggleInputEnabled5 = () => {
    setIsInputEnabled5((prevEnabled5) => !prevEnabled5);
  };

  const [clubInfo, setClubInfo] = useState({
    clubName: "",
    clubLI: "",
    clubTwitter: "",
    clubFB: "",
    clubAppReq: "",
    clubDesc: "",
  });

  async function handleOnLoad(e: any) {
    e.preventDefault();
    const docRef = doc(db, "Club", "cl001");
    const docSnap = await getDoc(docRef);
    console.log("why");

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().clubName);
      setClubInfo({
        ...clubInfo,
        clubName: docSnap.data().clubName,
        clubLI: docSnap.data().clubLinkedIn,
        clubTwitter: docSnap.data().clubTwitter,
        clubFB: docSnap.data().clubFacebook,
        clubAppReq: docSnap.data().address,
        clubDesc: docSnap.data().clubDesc,
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log(clubInfo.clubName);
      console.log("No such document!");
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
  };

/*
  await updateDoc(clubRef, {
    capital: true
  });
*/

  return (
    <div
    style={{
      display: "flex",
      height: "89vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
    }}
    onLoad={handleOnLoad}>
      <form>
      <div
      style={{
        display: "flex",
        height: "85vh",
        width: "90vw",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "45px",
        justifyContent: "center",
        alignItems: "center", }}>
        
        <div      
        style={{
        display: "flex",
        height: "78vh",
        width: "57vw",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        }}>
          <div
          style={{
            height:"8vh",
            width: "52vw",
          }}>
            <h5>Edit</h5>
            <h1>Club Info</h1>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Club Name</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="clubName" name = "clubName" placeholder="Club Name" disabled={isInputEnabled} 
              value={clubInfo.clubName}
              onChange={handleChange}/>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>LinkedIn</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled1} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled1 ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="" placeholder="LinkedIn Account Link" disabled={isInputEnabled1} />
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Twitter</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled2} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled2 ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="" placeholder="Twitter Link" disabled={isInputEnabled2} />
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Facebook</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled3} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled3 ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="" placeholder="Facebook Link" disabled={isInputEnabled3}/>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Application Requirements</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled4} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled4 ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="" placeholder="Not Provided" disabled={isInputEnabled4}/>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Club Description</h2>
            </div>

            <div
            style={smallEditBox}>
              <button type="button" onClick={toggleInputEnabled5} style={buttonFormatEdit}>
                <h6 style={{
                  fontStyle: "bold",
                  textDecoration: "underline",
                  fontSize: "24px"
                }}>
                {isInputEnabled5 ? '' : 'Save '} 
                  Edit
                </h6>
              </button>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="" placeholder="Not Provided" disabled={isInputEnabled5}/>
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
        }}>
          <div      
          style={smallInfoBlockFormat}>
            <div>
            <h1>Can I update the info ?</h1>
            <h4>Definitely, Info can be updated whenever you want !</h4>
            </div>
          </div>

          <div      
          style={smallInfoBlockFormat}>
            <div>
            <h1>What do mean by requirements ?</h1>
            <h4>Special requirements that are not as common as name and matric number. for example, CV.</h4>
            </div>
          </div>

          <div      
          style={smallInfoBlockFormat}>
            <div>
            <h1>Why do we add description ?</h1>
            <h4>So Students can get an idea about what is this club all about</h4>
            </div>
          </div>

          <div      
          style={{
            display: "flex",
            height: "12vh",
            width: "28vw",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div>
            <Link to={"/manage_club"}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  width: "300px"
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
  )
}

export default EditInfoBody