import React from 'react'
import { Link } from 'react-router-dom'

const EditInfoBody = () => {

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

  return (
    <div
    style={{
      display: "flex",
      height: "89vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
    }}>
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
      }}>
        
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
              <h5>Edit</h5>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Club Name" disabled/>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>LinkedIn</h2>
            </div>

            <div
            style={smallEditBox}>
              <h5>Edit</h5>
            </div>

            <div
            style={smallDefaultBox}>
              <h4>https://www.linkedin.com/in/david-buergel-959b6a166/</h4>
            </div>
          </div>
          
          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Twitter</h2>
            </div>

            <div
            style={smallEditBox}>
              <h5>Edit</h5>
            </div>

            <div
            style={smallDefaultBox}>
              <h4>Not Provided</h4>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Facebook</h2>
            </div>

            <div
            style={smallEditBox}>
              <h5>Edit</h5>
            </div>

            <div
            style={smallDefaultBox}>
              <h4>Not Provided</h4>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Application Requirements</h2>
            </div>

            <div
            style={smallEditBox}>
              <h5>Edit</h5>
            </div>

            <div
            style={smallDefaultBox}>
              <h4>Not Provided</h4>
            </div>
          </div>

          <div
          style={editBlockFormat}>
            <div
            style={smallTitleBox}><h2>Club Description</h2>
            </div>

            <div
            style={smallEditBox}>
              <h5>Edit</h5>
            </div>

            <div
            style={smallDefaultBox}>
              <h4>Not Provided</h4>
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